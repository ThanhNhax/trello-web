export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// Hàm tạo ra card rỗng
export const generatePlaceholderCard = (column) => {
  return {
    // _id = column._Id + -planceholder-card
    _id: `${column._id}-planceholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlanceholderCard: true
  }
}
