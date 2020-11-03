import React, { useState, useEffect } from 'react'
import { fetchMovieDetails, fetchMovieVideos } from '../../services'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faEnvelope, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Modal } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import ReactStars from 'react-rating-stars-component'
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

export function MovieDetail({ match }) {
  let params = match.params
  const [detail, setDetail] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [video, setVideo] = useState([])

  let genres = []

  useEffect(() => {
    const fetchAPI = async() => {
      setDetail(await fetchMovieDetails(params.id))
      setVideo(await fetchMovieVideos(params.id))
    }

    fetchAPI()
  }, [])

  genres = detail.genres

  const MoviePlayerModal = (props) => {
    const youtubeURL = 'https://www.youtube.com/watch?v='

    return (
      <Modal {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title
          id="contained-modal-title-vcenter"
          style={{color: '#000', fontWeight: 'bolder'}}>
            {detail.title}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{backgroundColor: '#000'}}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeURL+video.key}
            playing
            width="100%">

            </ReactPlayer>
        </Modal.Body>
      </Modal>
    )
  }

  return (
    <div className="container">
      <div className="row mt-2">
        
        <MoviePlayerModal show={isOpen}
          onHide={() => setIsOpen(false)}></MoviePlayerModal>

        <div className="col text-center position-relative" style={{width: '100%'}}>
          <img className="img-fluid"
            src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
            />

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
            <div className="" style={{cursor: 'pointer'}} onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faPlayCircle} style={{fontSize: 95, color: '#f4c10f' }} />
            </div>
          </div>

          <h3 className="position-absolute text-center w-100" style={{bottom: '1rem'}}>{ detail.title }</h3>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{color: '#5a606b', fontWeight: 'bold'}}>GENRE</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">
            {genres && genres.map((g, i) => {
              return (
                <li className="list-inline-item" key={i}>
                  <button className="btn btn-outline-info">{g.name}</button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars count={detail.vote_average} size={20} color1={'#f4c10f'}></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{color: '#5a606b', fontWeight: 'bold'}}>OVERVIEW</p>
            <p>{detail.overview}</p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{color: '#5a606b', fontWeight: 'bold'}}>CAST</p>
        </div>
      </div>

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