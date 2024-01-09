const localhost = 'http://localhost:3000'

export async function apiFetchMovieById(id) {
  const response = await fetch(`${localhost}/movie/${id}`, {
    method: 'GET'
  })

  const payload = await response.json()
  return payload
}

export async function apiFetchMovies() {
  const response = await fetch(`${localhost}/all-movies`, {
    method: 'GET'
  })

  const payload = await response.json()
  return payload
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

export async function apiDeleteMovie(id) {
  const response = await fetch(`${localhost}/del-movie/${id}`, {
    method: 'GET'
  })
  const payload = await response.json()
  console.log(payload)
  return payload
}
