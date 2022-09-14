import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Error.scss'
const Error = () => {
  const navigate = useNavigate()



  return (
    <>
      <div className='error-page-container-box'>
        <div className='error-page-container'>
          <aside className='error-page-image-container'><img className='error-page-image' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" />
          </aside>
          <main className='error-page-msg-container'>
            <h1 className='error-page-heading'>Sorry!</h1>
            <p className='error-page-text'>
              Either you aren't cool enough to visit this page or it doesn't exist <em className='error-page-empahsis-text'>. . . like your social life.</em>
            </p>
            <button className='error-button' onClick={() => navigate(-1)}>You can go back now!</button>
          </main>
        </div>
      </div>
    </>
  )
}

export default Error