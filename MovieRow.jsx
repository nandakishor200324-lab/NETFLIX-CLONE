import MovieCard from './MovieCard'

const MovieRow = ({ title, movies, showRank = false }) => {
  return (
    <section style={{ padding: '40px 60px 20px', backgroundColor: '#000' }}>
      <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '16px' }}>
        {title}
      </h2>

      <div
        style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '10px',
        }}
      >
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            index={showRank ? index + 1 : undefined}
          />
        ))}
      </div>
    </section>
  )
}

export default MovieRow
