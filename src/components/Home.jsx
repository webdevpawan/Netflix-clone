import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { BiPlay } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'


const apiKey = '3112dd012706e7bc1e4351cdc28ada84'
const url = 'https://api.themoviedb.org/3'
const upcoming = "upcoming"
const imgUrl = 'https://image.tmdb.org/t/p/original'
const nowPlaying = 'now_playing'
const popular = 'popular'
const topRated = 'top_rated'

const Card = ({ img }) => {
  return (
    <img src={img} alt="img1" className='card' />
  )
}
const Row = ({ title, arr }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item, index) => (
            <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
          ))
        }
      </div>
    </div>
  )
}


function Home() {
  const [upcomingMovies, setupcomingMovies] = useState([])
  const [nowPlayingMovies, setnowPlayingMovies] = useState([])
  const [popularMovies, setpopularMovies] = useState([])
  const [topRatedMovies, settopRatedMovies] = useState([])
  const [genres, setgenres] = useState([])


  useEffect(() => {
    const fetchUpcoming = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      setupcomingMovies(results);
    }
    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setnowPlayingMovies(results);
    }
    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setpopularMovies(results);
    }
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      settopRatedMovies(results);
    }
    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setgenres(genres);
    }
    
    fetchUpcoming()
    fetchNowPlaying()
    fetchPopular()
    fetchTopRated()
    getAllGenre()
  }, [])

  return (
    <section className='home'>
      <div className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}>
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>Play <BiPlay /></button>
          <button>My List <AiOutlinePlus /></button>
        </div>
      </div>
      <Row title={'Upcoming'} arr={upcomingMovies} />
      <Row title={'Now Playing'} arr={nowPlayingMovies} />
      <Row title={'Popular'} arr={popularMovies} />
      <Row title={'Top Rated'} arr={topRatedMovies} />

      <div className='genreBox'>
        {
          genres.map((item, index) => (
            <Link key={index} to={`/genre/${item.id}`}>{item.name}</Link>
          ))
        }
      </div>

    </section>
  )
}

export default Home