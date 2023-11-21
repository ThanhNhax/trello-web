import Box from '@mui/material/Box'
const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        height: (theme) =>
          `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boarBarHeight} )`
      }}
    >
      Boad Content
    </Box>
  )
}

export default BoardContent
