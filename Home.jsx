import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MovieRow from '../components/MovieRow'
import Footer from '../components/Footer'
import { useMovies } from '../context/MoviesContext'
import MovieModal from '../components/MovieModal'

const Home = () => {
  const { lists, loading, error } = useMovies()

  return (
    <div style={{ paddingTop: '68px' }}>
      <Navbar />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Hero />

      {loading ? (
        <div>Loading rows...</div>
      ) : (
        <>

<MovieRow
  title="Trending Now"
  movies={lists.trending || []}
  showRank={true}
/>
<MovieRow title="Netflix Originals" movies={lists.originals || []} />
<MovieRow title="Action Movies" movies={lists.action || []} />

        </>
      )}

      <Footer />
      <MovieModal />
    </div>
  )
}

export default Home
