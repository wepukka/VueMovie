const localhost = 'http://localhost:3000'

export async function apiFetchMovies() {
  const response = await fetch(`${localhost}/all-movies`, {
    method: 'GET'
  })

  const movies = await response.json()

  return movies
}

export async function apiAddMovie(movie) {
  const response = await fetch(`${localhost}/add-movie`, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

  const res = await response.json()
  if (res.payload.success === true) {
    console.log('Movie added!')
    console.log(res.payload.data)
  }

  if (res.payload.success === false) {
    console.log('Something went wrong')
  }

  return res
}
