import { useState } from 'react'
import Box from '@mui/material/Box'

import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Cloud from '@mui/icons-material/Cloud'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AddCard from '@mui/icons-material/AddCard'
import Button from '@mui/material/Button'
import DragHandle from '@mui/icons-material/DragHandle'

import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Column = ({ column }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column._id, data: { ...column } })

  const dndKitColumnStyle = {
    touchActive: 'none',
    transform: CSS.Translate.toString(transform),
    transition
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const orderCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
  return (
    <Box
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}
      {...listeners}
      sx={{
        minWidth: '300px',
        maxWidth: '300px',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
        borderRadius: '6px',
        ml: 2,
        height: 'fit-content',
        maxHeight: (theme) =>
          ` calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}
    >
      {/* header */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontsize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {column?.title}
        </Typography>
        <Box>
          <Tooltip title='More options'>
            <KeyboardArrowDownIcon
              sx={{
                color: 'text.primary',
                cursor: 'pointer'
              }}
              id='basic-cloumn-dropdown'
              aria-controls={open ? 'basic-menu-cloumn-dropdown' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            />
          </Tooltip>

          <Menu
            id='basic-menu-cloumn-dropdown'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-cloumn-dropdown'
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <AddCard fontSize='small' />
              </ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <Divider />

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DeleteForeverIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Remove this cloumn</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Cloud fontSize='small' />
              </ListItemIcon>
              <ListItemText>Archive this column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
      {/* List card  */}
      <ListCards cards={orderCards} />
      {/* footer */}
      <Box
        sx={{
          height: (theme) => theme.trello.columnFooterHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button startIcon={<AddCard />}>Add new card</Button>
        <Tooltip title='Drag to move'>
          <DragHandle sx={{ cursor: 'pointer' }} />
        </Tooltip>
      </Box>
    </Box>
  )
}

export default Column
