import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ModeComment from '@mui/icons-material/ModeComment'
import AtmOutlined from '@mui/icons-material/AtmOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Card = ({ card }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition
  } = useSortable({ id: card._id, data: { ...card } })

  const dndKitCardStyle = {
    touchActive: 'none',
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined
  }

  const shouldShowCardAction = () => {
    return (
      !!card?.comments?.length ||
      !!card?.memberIds?.length ||
      !!card?.attachments?.length
    )
  }
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        '& .css-19joarl-MuiCardContent-root:last-child': {
          pb: '12px'
        },
        display: card?.FE_PlanceholderCard ? 'none' : 'block'
      }}
    >
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

      <CardContent
        sx={{
          p: 1.5
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardAction() && (
        <CardActions sx={{ p: '0 4px 8px' }}>
          {!!card?.memberIds.length && (
            <Button size='small' startIcon={<GroupIcon />}>
              {card?.memberIds.length}
            </Button>
          )}

          {!!card?.comments.length && (
            <Button size='small' startIcon={<ModeComment />}>
              {card?.comments.length}
            </Button>
          )}
          {!!card?.attachments.length && (
            <Button size='small' startIcon={<AtmOutlined />}>
              {card?.attachments.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
