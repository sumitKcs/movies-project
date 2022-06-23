import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from './Context';
import { useNavigate } from "react-router-dom";

const Movies = () => {
    const contextData = useGlobalContext()
    const movieList = contextData.movieList
    const totalPage = contextData.totalPage
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()

    const pageClickHandler = async (selectedPage) => {
        let currPage = selectedPage.selected + 1
        setPage(currPage)
        await movieClickHandler()
    }

    const movieClickHandler = async (id) => {
        setIsLoading(true)
        console.log("movie click hanleer id", id)
        navigate(`/id/${id}`)
      
    }



    return (

        <>
            <div className='trending-text'> Trending </div>



            <div className='movie-container'>
                {
                    movieList.map((movieObj, index) => {

                        return (

                            <div className="movie-card" key={index} onClick={() => movieClickHandler(movieObj.id)}>
                                {/* <FontAwesomeIcon  onClick={ favClickhandler} className= {favIconStyle} icon={solid('heart')}  /> */}

                                <div className='movie-image'>
                                    {isLoading ? <div className='loading' style={{ width: "14vw", height: "45vh" }}>Loading..</div> :
                                        <img style={{ width: "100%", height: "100%" }} src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} className="card-img-top" alt="..." />}
                                </div>

                                <div className="movie-title" >
                                    {/* <p className='card-text movie-title'>{movieObj.original_title}</p> */}
                                </div>
                            </div>

                        )

                    })
                }
            </div>




        </>
    )
}

export default Movies
