import { getDate } from '@/utils/common'

export function movieDataIsValid({ title, year, genre }) {
  if (
    title === '' ||
    (genre === '') |
      (year === '') |
      !(parseInt(year) >= 1888) |
      !(parseInt(year) <= getDate().year + 1)
  )
    return {
      success: false,
      errorMsg: `* Title, Year and Genre is required, Year must be between 1888 and ${
        getDate().year + 1
      } `
    }

  return { success: true }
}
