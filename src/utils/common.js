export function getDate() {
  const date = new Date()
  let day = date.getDay()
  let month = date.getMonth() + 1 // starts at 0
  let year = date.getFullYear()

  return { day, month, year }
}
