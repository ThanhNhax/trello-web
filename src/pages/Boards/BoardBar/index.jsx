import Box from '@mui/material/Box'
const BoardBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.dark',
        width: '100%',
        height: (theme) => theme.trello.boarBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Borad Bar
    </Box>
  )
}

export default BoardBar
