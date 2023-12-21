import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  // PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board }) => {
  // https://docs.dndkit.com/api-documentation/sensors
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 }
  // })
  // Yêu cầu chuột di chuyển 10px thì mới chạy hàm handleDragEnd tránh trường hợp user Click column
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 }
  })
  // const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderColumnsState, setOrderColumnsState] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)

  const [activeDragItemType, setActiveDragItemType] = useState(null)

  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null)

  useEffect(() => {
    const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderColumnsState(orderColumns)
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderColumnsState.find((column) =>
      column?.cards?.map((card) => card._id)?.includes(cardId)
    )
  }

  // Trigger khi bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu là kéo card thì mới thức hiện set state lại vị trí ban đầu khi kéo card ỏa column nào
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Trigger quá trình kéo 1 phần tử
  const handleDragOver = (event) => {
    // không làm gi nếu kéo Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Nếu kéo  card thì xử lý để có thể kéo card qua lại giữa các column
    console.log('handleDragOver', event)
    const { active, over } = event

    // Kiểm tra nếu không tồn tại over (Kéo linh tinh ra ngoài thi return )
    if (!active || !over) return

    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại thì return
    if (!activeColumn || !overColumn) return

    // Xử lý logic ở đây chỉ khi nào card 2 column khác nhau, còn nếu kéo card trong chính column ban đầu của thì không làm gì
    if (activeColumn._id !== overCardId._id) {
      setOrderColumnsState((pre) => {
        // Tìm vị trí (index) của cái overCard trong column đích (nơi mà activeCard Sắp được thả)
        const overCardIndex = overColumn?.cards.findIndex(
          (card) => card._id === overCardId
        )

        let newCardIndex
        const isBelowOverItem =
          active.rect.current.trangslated &&
          active.rect.current.trangslated.top > over.rect.top + over.rect.height
        const modfier = isBelowOverItem ? 1 : 0
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modfier
            : overColumn?.cards?.length + 1

        // close deep data
        const nextColumns = cloneDeep(pre)
        const nextActiveColumn = nextColumns.find(
          (column) => column._id === activeColumn._id
        )
        const nextOverColumn = nextColumns.find(
          (column) => column._id === overColumn._id
        )
        if (nextActiveColumn) {
          //Xóa card ở cái column active (cũng có thể hiểu là olumn củ, cái lúc mà kéo card ra khỏi để sang column khác)
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          )

          // Cập nhật lại mảng cardOrderIds cho chuẩn data
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card) => card._id
          )
        }
        if (nextOverColumn) {
          // Kiểm tra xem card đang kéo nó có tồn tại ở overColumn chưa, nếu có thì cần xóa nó trước
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card) => card._id !== activeDraggingCardId
          )
          // Tiếp theo là thêm cái card đang kéo vào overColumn theo vị trsi index mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          )
          // Cập nhật lại mảng cardOrderIds cho chuẩn data
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card) => card._id
          )
        }
        return nextColumns
      })
    }
  }

  // Trigger khi kết thúc hành động kéo(drag) một phần tử => hành động thả (drop)
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    // Kiểm tra nếu không tồn tại over (Kéo ra ngoài )
    if (!active || !over) return

    //Xử lý kéo thả card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // Kiểm tra nếu không tồn tại over (Kéo linh tinh ra ngoài thi return )

      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // Nếu không tồn tại thì return
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        console.log('2 column khac nhau')
      } else {
        // Hàm động trong cùng 1 column
        console.log('trong column ')
        //Lấy vị cũ từ (oldColumnWhenDraggingCard)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        )
        //Lấy vị mới từ (oldColumnWhenDraggingCard)
        const newCardIndex = overColumn?.cars?.findIndex(
          (c) => c._id === overCardId
        )

        // Dùng arrayMove vì kéo card trong một column thì tương tư nhu vơi logic kéo column trong board
        const dndOrderCard = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        )

        //Cập nhật lại state
        setOrderColumnsState((pre) => {
          const nextColumns = cloneDeep(pre)

          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderCard
          targetColumn.cardOrderIds = dndOrderCard.map((c) => c._id)
          return nextColumns
        })
      }
    }

    // Xử lý kéo thả column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
      if (active.id !== over.id) {
        //Lấy vị cũ từ (active)
        const oldColumnIndex = orderColumnsState.findIndex(
          (c) => c._id === active.id
        )
        //Lấy vị mới từ (active)
        const newColumnIndex = orderColumnsState.findIndex(
          (c) => c._id === over.id
        )

        //Dúng arrayMove của thằng dnd-kit để sắp xép lại mảng Columns ban đầu
        // Code của arayMove ở đây: DOC nha (dnd--kit/packages/sorttable/src/utilities/arrayMove.ts)
        const dndOrderColumns = arrayMove(
          orderColumnsState,
          oldColumnIndex,
          newColumnIndex
        )
        // tạo ra arr để sort column theo mảng này. rồi updata trên DB
        // const dndOrderColumnsIds = dndOrderColumns.map((c) => c._id)

        // Cập nhật lại state để re-render
        setOrderColumnsState(dndOrderColumns)
      }
    }

    // Những state sau khi kéo thả thì trả về null như ban đầu
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }
  const CustomDropAnimation = {
    sideEffectts: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: 0.5
        }
      }
    })
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      sensors={sensors}
      // thuật toán va cham của Dnd kit
      collisionDetection={closestCorners}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0'
        }}
      >
        {/* set scrol */}
        <ListColumns columns={orderColumnsState} />
        <DragOverlay dropAnimation={CustomDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
              <Column column={activeDragItemData} />
            )}
          {activeDragItemId &&
            activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
              <Card card={activeDragItemData} />
            )}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
