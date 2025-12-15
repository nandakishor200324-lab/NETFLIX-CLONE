import { useMovies } from '../context/MoviesContext'
import { IMAGE_BASE_URL, BACKDROP_SIZE } from '../services/api'

const MovieModal = () => {
  const { selectedMovie, isModalOpen, closeModal } = useMovies()

  if (!isModalOpen || !selectedMovie) return null

  const title = selectedMovie.title || selectedMovie.name
  const year =
    (selectedMovie.release_date || selectedMovie.first_air_date || '').slice(0, 4)
  const overview =
    selectedMovie.overview || 'No description available.'
  const backdropUrl = selectedMovie.backdrop_path
    ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${selectedMovie.backdrop_path}`
    : null

  return (
    <div
      onClick={closeModal}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '70%',
          maxWidth: '900px',
          maxHeight: '80vh',
          backgroundColor: '#181818',
          borderRadius: '8px',
          overflow: 'hidden',
          color: '#fff',
          boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
        }}
      >
        {backdropUrl && (
          <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
            <img
              src={backdropUrl}
              alt={title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div style={{ padding: '24px 32px 28px' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>{title}</h2>

          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              fontSize: '13px',
            }}
          >
            {year && (
              <span
                style={{
                  padding: '2px 8px',
                  borderRadius: '999px',
                  backgroundColor: '#333',
                }}
              >
                {year}
              </span>
            )}
          </div>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.5,
              color: '#e5e5e5',
              maxWidth: '650px',
              marginBottom: '20px',
            }}
          >
            {overview}
          </p>

          <button
            style={{
              padding: '10px 22px',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: '#e50914',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
