import React, { useEffect, useState } from 'react'
import { fetchMovies } from '../../services'
import { Carousel, CarouselItem } from 'react-bootstrap'

export function Home() {
  const [nowPlaying, setNowPlaying] = useState([])

  useEffect(() => {
    const fetchAPI = async () => {
      setNowPlaying(await fetchMovies())
    }

    fetchAPI()
  }, [])

  const movies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <CarouselItem key={index}>
          <img style={{height: 600}} src={item.backPoster} alt={item.title} />
      </CarouselItem>
    )
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Carousel
            pause="hover"
            interval={5000}
            indicators={false}>
              {movies}
          </Carousel>
        </div>
      </div>
    </div>
  )
}