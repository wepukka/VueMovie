const baseURl = 'https://vuemoviedb.onrender.com'

// Fetch by id
export async function apiFetchMovieById(id) {
  const response = await fetch(`${baseURl}/movie/${id}`, {
    method: 'GET'
  })

  const payload = await response.json()
  return payload
}

// Fetch all
export async function apiFetchMovies() {
  const response = await fetch(`${baseURl}/all-movies`, {
    method: 'GET'
  })

  const payload = await response.json()
  return payload
}

// Fetch using filters
export async function apiFetchWithFilters(data) {
  const response = await fetch(
    `${baseURl}/filter/?title=${data.title}&year=${data.year}&genre=${data.genre}`,
    {
      method: 'GET'
    }
  )

  const payload = await response.json()
  return payload
}

// Add movie
export async function apiAddMovie(movie) {
  const response = await fetch(`${baseURl}/add-movie`, {
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

// Delete by id
export async function apiDeleteMovie(id) {
  const response = await fetch(`${baseURl}/del-movie`, {
    method: 'POST',
    body: JSON.stringify({ id: id }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  const payload = await response.json()
  console.log(payload)
  return payload
}

// Update movie
export async function apiUpdateMovie(movie) {
  console.log('updatedmovie', movie)
  const response = await fetch(`${baseURl}/update/${movie._id}`, {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })
  const payload = await response.json()
  return payload
}
