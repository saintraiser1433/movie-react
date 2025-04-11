import { useEffect, useState } from 'react'

import './App.css'
import Search from './components/search'
const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY

const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

type Movie = {
  page: number,
  total_pages: number,
  total_results: number,
  results: MovieResult[]
}

type MovieResult = {
  id: number,
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}
const App =() => {
  const [searchTerm, setSearchTerm] = useState('Iam pogi')
  const [movies, setMovies] = useState<MovieResult[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async() => {
    setErrorMessage('')
    try{
      const endpoint = `${API_BASE_URL}?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
      const response = await fetch(endpoint, API_OPTIONS)
      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMovies(data.results || [])
      if(data.Response === 'False'){
        setErrorMessage(data.Error)
        setMovies([])
        return;
      }

      setMovies(data.results || [])
      console.log(data.results)
    }catch(err){
      console.error(`Error fetch ${err}`)
      setErrorMessage('Failed to fetch movies')
      setMovies([])
      return
    }finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchMovies();
  },[])
  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Bannet" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <p className="text-white">Loading....</p> 
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p> 
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p>{movie.overview}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <p>Release Date: {movie.release_date}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) }


        </section>
      </div>
    </main>
  )
}
 
export default App
