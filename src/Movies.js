import React, { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from './Context';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';

const Movies = () => {
    const {movieList,  totalPage , dynamicText} = useGlobalContext()
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const navigate = useNavigate()
    

    const pageClickHandler = async (selectedPage) => {
        let currPage = selectedPage.selected + 1
        setPage(currPage)
        await movieClickHandler()
    }

    const movieClickHandler = async (id, media_type) => {
        setIsLoading(true)
        //console.log("movie click hanleer id", id)
        navigate(`/id/${media_type}/${id}`)
      
    }



    return (

        <>
            <div className='trending-text'> {dynamicText}</div>



            <div className='movie-container'>
                {
                    movieList.map((movieObj, index) => {

                        return (

                            <div className="movie-card" key={index} onClick={() => movieClickHandler(movieObj.id,  movieObj.media_type)}>
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
