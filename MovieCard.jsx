import { memo } from 'react'
import { useMovies } from '../context/MoviesContext'
import { IMAGE_BASE_URL, POSTER_SIZE } from '../services/api'

const MovieCardComponent = ({ movie, index }) => {
  const { openModal } = useMovies()

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
    : null

  const title = movie.title || movie.name

  return (
    <div
      onClick={() => openModal(movie)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        flex: '0 0 180px',
      }}
    >
      {/* Big white number behind poster */}
      {typeof index === 'number' && (
  <div
    style={{
      position: 'absolute',
      left: -10,
      bottom: -10,
      fontSize: '80px',
      fontWeight: '900',
      color: '#000',
      WebkitTextStroke: '2px #fff',
      zIndex: 3,          // make sure this is higher
      pointerEvents: 'none',
    }}
  >
    {index}
  </div>
)}


      <div
  style={{
    position: 'relative',
    width: 150,
    height: 225,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#222',
    zIndex: 2,            // lower than number
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.8)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <span style={{ color: '#fff', fontSize: 12, padding: 8 }}>
            No image
          </span>
        )}
      </div>
    </div>
  )
}

const MovieCard = memo(MovieCardComponent)
export default MovieCard
