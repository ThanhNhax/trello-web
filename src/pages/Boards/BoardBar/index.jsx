import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const MENU_STYPE = {
  color: 'white',
  bgColor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root': {
    color: 'white'
  },
  '&:hover': {
    bgColor: 'primary.50'
  }
}

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boarBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
        borderBottom: '1px solid white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYPE}
          clickable
          icon={<DashboardIcon />}
          label='ThanhNhax'
        />
        <Chip
          sx={MENU_STYPE}
          clickable
          icon={<VpnLockIcon />}
          label='Public/Private Workspace'
        />
        <Chip
          sx={MENU_STYPE}
          clickable
          icon={<AddToDriveIcon />}
          label='Add to Google Drive'
        />
        <Chip
          sx={MENU_STYPE}
          clickable
          icon={<BoltIcon />}
          label='Automation'
        />
        <Chip
          sx={MENU_STYPE}
          clickable
          icon={<FilterListIcon />}
          label='Filters'
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': { borderColor: 'white' }
          }}
          variant='outlined'
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>

        <AvatarGroup
          max={4}
          sx={{
            gap: '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: '16px',
              border: 'none'
            }
          }}
        >
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://th.bing.com/th/id/R.d5f98ebaed5fbb7f1787fd3d8b171ab3?rik=cBW2uKcShBQNEQ&pid=ImgRaw&r=0'
            />
          </Tooltip>
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://th.bing.com/th/id/OIP.VHCNMVOUAp6r2MYVqBfzrwAAAA?rs=1&pid=ImgDetMain'
            />
          </Tooltip>
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://tiermaker.com/images/templates/blox-furit-sword-xxx-15817751/158177511685636653.png'
            />
          </Tooltip>
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.redd.it/ahipst3tq4j91.jpg'
            />
          </Tooltip>
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.redd.it/ahipst3tq4j91.jpg'
            />
          </Tooltip>
          <Tooltip title='ThanhNhax'>
            <Avatar
              alt='Remy Sharp'
              src='https://i.redd.it/ahipst3tq4j91.jpg'
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
