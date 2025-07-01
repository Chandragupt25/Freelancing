import React from 'react'
import videoBg from '../assets/bgvideo.mp4'
const Video = () => {
  return (
      <video className="home-video" autoPlay loop muted>
        <source src={videoBg} type="video/mp4" />
      </video>
  )
}

export default Video