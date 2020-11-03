import React, { useEffect, useState } from 'react'
import { fetchGenre, fetchMovies, fetchMoviesByGenre, fetchPersons, fetchTopRatedMovies } from '../../services'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight, faEnvelope, faMapMarker, faPhone, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([])
  const [genres, setGenres] = useState([])
  const [moviesByGenre, setMoviesByGenre] = useState([])
  const [persons, setPersons] = useState([])
  const [topRated, setTopRated] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies())
      setGenres(await fetchGenre())
      setMoviesByGenre(await fetchMoviesByGenre(28))
      setPersons(await fetchPersons())
      setTopRated(await fetchTopRatedMovies())
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

  const handleGenreClick = async(genreId) => {
    setMoviesByGenre(await fetchMoviesByGenre(genreId))
  }

  const genreList = genres.map((item, index) => {
    return (
      <li className="list-inline-item" key={index}>
        <button className="btn btn-outline-info" onClick={() => {
          handleGenreClick(item.id)
        }}>{ item.name }</button>
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

  const trendingPersons = persons.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <img className="img-fluid rounded-lg mx-auto d-block" src={item.profileImage} alt={item.name} />
        <p className="font-weight-bold text-center mt-3 mb-0">{item.name}</p>
        <p className="font-weight-light text-center text-muted">Trending for {item.known}</p>
      </div>
    )
  })

  const topRatedList = topRated.slice(0, 4).map((item, index) => {
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
    <div className="container pb-5">
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
          <div className="float-right">
            <FontAwesomeIcon icon={faArrowAltCircleRight} className="nextArrow" />
          </div>
        </div>
      </div>

      <div className="row mt-3">{movieList}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold"  style={{color: '#5a606b'}}>
            TRENDING PERSONS THIS WEEK
          </p>
        </div>
      </div>

      <div className="row mt-3">{trendingPersons}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold"  style={{color: '#5a606b'}}>
            TOP RATED MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{topRatedList}</div>

      <hr className="mt-5" style={{borderTop: '1px solid #5a606b'}}/>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{color: '#5a606b'}}>
          <h3>ABOUT</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis quam, animi enim eligendi soluta blanditiis nesciunt debitis, vitae, temporibus sequi beatae! Quas, error mollitia autem enim blanditiis modi quidem molestias?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste magni explicabo atque sit et quas dolor labore, iusto similique ipsum consequuntur vitae odit autem facere. Ipsa eos dolorem excepturi facere?</p>

          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="#" style={{color: '#f4c10f'}}>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>

            <li className="list-inline-item">
              <a href="#" style={{color: '#f4c10f'}}>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>

            <li className="list-inline-item">
              <a href="#" style={{color: '#f4c10f'}}>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>

            <li className="list-inline-item">
              <a href="#" style={{color: '#f4c10f'}}>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{color: '#5a606b'}}>
          <h3>KEEP IN TOUCH</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong><FontAwesomeIcon icon={faMapMarker} /> Address: City, state, country</strong>
              </p>
            </li>

            <li>
              <p>
                <strong><FontAwesomeIcon icon={faEnvelope} /> Email: example@email.com</strong>
              </p>
            </li>

            <li>
              <p>
                <strong><FontAwesomeIcon icon={faPhone} /> Phone number: 555-7778899</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}