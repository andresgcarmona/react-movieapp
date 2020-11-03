import React, { useEffect, useState } from 'react'
import { fetchGenre, fetchMovies } from '../../services'
import { Carousel, CarouselItem } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([])
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies())
      setGenres(await fetchGenre())
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
    </div>
  )
}