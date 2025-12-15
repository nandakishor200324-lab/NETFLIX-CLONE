console.log('TMDB KEY FROM ENV:', import.meta.env.VITE_TMDB_API_KEY)

import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
export const BACKDROP_SIZE = 'w1280'
export const POSTER_SIZE = 'w500'

const api = axios.create({
  baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  if (!config.params) config.params = {}
  config.params['api_key'] = API_KEY
  return config
})

export const getTrending = () => api.get('/trending/all/week')
export const getNetflixOriginals = () =>
  api.get('/discover/tv', { params: { with_networks: 213 } })
export const getTopRated = () => api.get('/movie/top_rated')
export const getActionMovies = () =>
  api.get('/discover/movie', { params: { with_genres: 28 } })
export const getComedyMovies = () =>
  api.get('/discover/movie', { params: { with_genres: 35 } })
export const getHorrorMovies = () =>
  api.get('/discover/movie', { params: { with_genres: 27 } })
export const getDocumentaries = () =>
  api.get('/discover/movie', { params: { with_genres: 99 } })
export const getMovieDetails = (id) =>
  api.get(`/movie/${id}`, { params: { append_to_response: 'videos,credits' } })
export const searchMovies = (query) =>
  api.get('/search/movie', { params: { query } })
