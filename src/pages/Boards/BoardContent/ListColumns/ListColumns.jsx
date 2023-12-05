import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Column from './Column/Column'
import { NoteAdd } from '@mui/icons-material'
import {
  SortableContext,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable'

const ListColumns = ({ columns }) => {
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: 'inherit',
          width: ' 100%',
          height: '100%',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          '&::-webkit-scrollbar-track': {
            m: 2
          }
        }}
      >
        {/* Board column 1 */}
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
            mx: 2,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d'
          }}
        >
          <Button
            sx={{
              color: 'white',
              width: '100%',
              justifyContent: 'flex-start',
              pl: 2.5,
              py: 1
            }}
            startIcon={<NoteAdd />}
          >
            Add new column
          </Button>
        </Box>
      </Box>
    </SortableContext>
  )
}

export default ListColumns
