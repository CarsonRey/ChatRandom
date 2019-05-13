export const updateUserRoom = (data) => {
  console.log(
    "hitting action"
  )
  return {
    type: 'UPDATE_USER_ROOM',
    payload: data
  }
}
