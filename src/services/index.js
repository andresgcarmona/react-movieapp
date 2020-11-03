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

export const fetchGenre = () => {
  
}

export const fetchMoviesByGenre = () => {
  
}

export const fetchPersons = () => {
  
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