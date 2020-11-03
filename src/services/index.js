import axios from 'axios'

const apiKey = '28fe6b2160b19f268e24dde889951cf2'
const url = 'https://api.themoviedb.org/3'
const nowPlayingUrl = `${url}/movie/now_playing`
const topRatedUrl = `${url}/movie/top_rated`
const movieUrl = `${url}/movie`
const genreUrl = `${url}/genre/movie/list`
const moviesUrl = `${url}/discover/movie`
const personUrl = `${url}/trending/person/week`

export const fetchMovies = async() => {
  try {
    const { data } = await axios.get(nowPlayingUrl, {
      params: {
        api_key: apiKey,
        language: 'en_US',
        page: 1,
      }
    })

    const posterUrl = 'https://image.tmdb.org/t/p/original'
    const movies = data['results'].map(m => ({
      id: m['id'],
      backPoster: `${posterUrl}/${m['backdrop_path']}`,
      popularity: m['popularity'],
      title: m['title'],
      poster: `${posterUrl}/${m['poster_path']}`,
      overview: m['overview'],
      rating: m['vote_average'],
    }))

    return movies
  }
  catch(e) {

  }
}

export const fetchGenre = async() => {
  try {
    const { data } = await axios.get(genreUrl, {
      params: {
        api_key: apiKey,
        language: 'en_US',
        page: 1,
      }
    })

    const genres = data['genres'].map(g => ({
      id: g['id'],
      name: g['name'],
    }))

    return genres
  }
  catch(error) {}
}

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const { data } = await axios.get(moviesUrl, {
      params: {
        api_key: apiKey,
        language: 'en_US',
        page: 1,
        with_genres: genreId
      }
    })

    const posterUrl = 'https://image.tmdb.org/t/p/original'
    const movies = data['results'].map(m => ({
      id: m['id'],
      backPoster: `${posterUrl}/${m['backdrop_path']}`,
      popularity: m['popularity'],
      title: m['title'],
      poster: `${posterUrl}/${m['poster_path']}`,
      overview: m['overview'],
      rating: m['vote_average'],
    }))

    return movies
  }
  catch(error) {}
}

export const fetchPersons = async () => {
  try {
    const { data } = await axios.get(personUrl, {
      params: {
        api_key: apiKey,
        language: 'en_US',
      }
    })

    const persons = data['results'].map(p => ({
      id: p['id'],
      popularity: p['popularity'],
      name: p['name'],
      profileImage: `https://image.tmdb.org/t/p/w200/${p['profile_path']}`,
      known: p['known_for_department']
    }))

    return persons
  }
  catch(error) {}
}

export const fetchTopRatedMovies = () => {
  
}

export const fetchMovieDetails = () => {
  
}

export const fetchMovieVideos = () => {
  
}

export const fetchCasts = () => {
  
}

export const fetchSimilarMovies = () => {
  
}