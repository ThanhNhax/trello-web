import { Card as MuiCard } from '@mui/material'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import ModeComment from '@mui/icons-material/ModeComment'
import AtmOutlined from '@mui/icons-material/AtmOutlined'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Card = ({ temporaryHideMedia }) => {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
          overflow: 'unset'
        }}
      >
        <CardContent
          sx={{
            p: 1.5
          }}
        >
          <Typography>Card Test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset'
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://th.bing.com/th/id/OIP.jCzbVfRsaPRNshaO2Pf0-AHaF9?w=227&h=181&c=7&r=0&o=5&dpr=1.3&pid=1.7'
        title='green iguana'
      />
      <CardContent
        sx={{
          p: 1.5
        }}
      >
        <Typography>ThanhNhax</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px' }}>
        <Button size='small' startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size='small' startIcon={<ModeComment />}>
          10
        </Button>
        <Button size='small' startIcon={<AtmOutlined />}>
          15
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
