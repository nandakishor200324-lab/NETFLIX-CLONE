import { useMovies } from '../context/MoviesContext'
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../services/api'

const Hero = () => {
  const { featuredMovie, loading } = useMovies()

  if (loading || !featuredMovie) {
    return <section>Loading hero...</section>
  }

  const title = featuredMovie.title || featuredMovie.name
  const overview = featuredMovie.overview
    ? featuredMovie.overview.slice(0, 150) + '...'
    : 'No description.'
  const backdropUrl = featuredMovie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${featuredMovie.backdrop_path}`
    : ''

  return (
    <section
      style={{
        minHeight: '60vh',
        backgroundImage: backdropUrl
          ? `url(${backdropUrl})`
          : 'linear-gradient(#141414, #000)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1>{title}</h1>
      <p>{overview}</p>
      <button>Play</button>
      <button>More Info</button>
    </section>
  )
}

export default Hero
