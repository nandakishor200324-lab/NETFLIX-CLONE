import { createContext, useContext, useEffect, useState } from 'react'
import {
  getTrending,
  getNetflixOriginals,
  getActionMovies,
} from '../services/api'

const MoviesContext = createContext(null)

export const MoviesProvider = ({ children }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [lists, setLists] = useState({
    originals: [],
    trending: [],
    action: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const [origRes, trendRes, actionRes] = await Promise.all([
          getNetflixOriginals(),
          getTrending(),
          getActionMovies(),
        ])

        const originals = origRes.data.results || []
        const trending = trendRes.data.results || []
        const action = actionRes.data.results || []

        setLists({
          originals,
          trending,
          action,
        })

        if (originals.length > 0) {
          const random = originals[Math.floor(Math.random() * originals.length)]
          setFeaturedMovie(random)
        } else if (trending.length > 0) {
          setFeaturedMovie(trending[0])
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const openModal = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  return (
    <MoviesContext.Provider
      value={{
        featuredMovie,
        lists,
        loading,
        error,
        selectedMovie,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </MoviesContext.Provider>
  )
}

export const useMovies = () => {
  const ctx = useContext(MoviesContext)
  if (!ctx) throw new Error('useMovies must be used inside MoviesProvider')
  return ctx
}
