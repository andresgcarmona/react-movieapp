import React, { useEffect, useState } from 'react'
import { fetchGenre, fetchMovies, fetchMoviesByGenre } from '../../services'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([])
  const [genres, setGenres] = useState([])
  const [moviesByGenre, setMoviesByGenre] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies())
      setGenres(await fetchGenre())
      setMoviesByGenre(await fetchMoviesByGenre())
    }

    fetchAPI()
  }, [])

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <CarouselItem key={index} style={{ height: 500, width: '100%' }}>
          <img style={{height: 600}} src={item.backPoster} alt={item.title} />
          
          <div className="" style={{
            width: '100%',
            height: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0
            }}>
            <div className="">
              <FontAwesomeIcon icon={faPlayCircle} style={{fontSize: 95, color: '#f4c10f' }} />
            </div>
          </div>

          <Carousel.Caption>
            <h3>{ item.title }</h3>
          </Carousel.Caption>
      </CarouselItem>
    )
  })

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button className="btn btn-outline-info">{ item.name }</button>
      </li>
    )
  })

  const movieList = moviesByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title} />
          </Link>
        </div>
        <div className="mt-3">
            <p style={{fontWeight: 'bolder'}}>{item.title}</p>
            <p>Rated: {item.rating}</p>
            <ReactStars count={item.rating} size={20} color1={'#f4c10f'}></ReactStars>
          </div>
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Carousel
            pause="hover"
            interval={50000}
            indicators={false}>
              {movies}
          </Carousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">
            {genreList}
          </ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="row">{movieList}</div>
        </div>
      </div>
    </div>
  )
}