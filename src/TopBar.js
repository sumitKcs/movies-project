import React, { memo } from 'react'

import { useGlobalContext } from './Context';
const TopBar = () => {
  let movieData = useGlobalContext()
  let firstMovieArr = ''
  //console.log(movieData)
  if (movieData.topMovie) {
    firstMovieArr = movieData.topMovie[0]
  }
  return (
    <>
      {
        (movieData.topMovie && firstMovieArr) ?
          movieData.topMovie.map((movieObj, index) => {
            const firstMovie = movieObj.mydata
            //console.log("map:", movieObj.mydata.original_title)
            return (
              <div className='top-trending' key={index}>
                <div className='top-trending-image-conatiner'>

                  <img style={{ width: "100%", height: "100%" }} src={`https://image.tmdb.org/t/p/original${firstMovie.backdrop_path}`} className="topbar-movie-image" alt="..." />
                  {/* <div className='topbar-trending-title'>
                    {firstMovie.original_title}
                  </div>
                  <div className='topbar-trending-rank'>
                    Trending #1
                  </div> */}
                </div>


              </div>
            )
          }) : <div> I am topbar </div>
      }
    </>


  )
}

export default memo(TopBar)