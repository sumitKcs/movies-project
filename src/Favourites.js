import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Favourites.css'
import Navbar from './Navbar'
import { AiOutlineBackward } from 'react-icons/ai';

const Favourites = () => {
    const getFavData = JSON.parse(localStorage.getItem("fav_movie_id"))
    console.log("favourite ", getFavData)
    const navigate = useNavigate()
    // const FIND_BY_ID_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=e229afd722b6ee38525d46e0b317f72b&language=en-US`

    const removeFromFav = async (id) => {
        console.log("idfav:", id)
        const getFavdData = await JSON.parse(localStorage.getItem("fav_movie_id"))
        console.log("fav data length", getFavdData.length)
        //if only one item then remove the stored key
        if (getFavdData.length < 2) {
            localStorage.removeItem("fav_movie_id")
        } else {
            for (let i in getFavdData) {
                if (getFavdData[i]['id'] == id) {
                    if (i == 0) {
                        const tempArr = [...getFavdData]
                        tempArr.shift()
                        console.log("removed array from index 0", tempArr)
                        localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                    } else {
                        const tempArr = [...getFavdData]
                        tempArr.splice(i, i)
                        console.log("removed array", tempArr)
                        localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                    }

                }
            }
        }
        navigate("/favourites")


    }

    return (

        <>
            <Navbar />


            <div className='fav-text'>Favourites</div>
            
            <div className='fav-conatiner-box'>
            <div className='fav-back-button-container'>
                <AiOutlineBackward className='fav-back-button' onClick={() => navigate(-1)} />

            </div>
                {
                    (getFavData === null) ?
                        <>
                            <div className='fav-no-data'><span className='no-fav-msg'>No Favourites Found</span>
                                <div className='no-fav-button'><button onClick={() => navigate("/explore")} type="button" class="btn btn-secondary ">Find Gems to Add</button></div>
                            </div>

                        </>

                        :
                        getFavData.map((media, index) => {
                            return (

                                <div className='fav-card'>
                                    <div className='fav-image-container' onClick={() => navigate(`/id/${media.media_type}/${media.id}`)}>
                                        <img className="fav-image" src={`https://image.tmdb.org/t/p/original${media.poster_image}`} alt="..." />
                                    </div>
                                    <div className='fav-media-details'>
                                        <div className='fav-title'>{media.title} ({media.media_type})</div>
                                        <div className='fav-release-date'><strong>Released: </strong>{media.release_date}</div>
                                        <div className='fav-rating'><strong>Rating:</strong> {media.rating}/10</div>
                                        <div className='fav-genre'></div>
                                        <div className='fav-genre-container'>
                                            <strong>Genre: </strong>
                                            {

                                                media.genres.map((genres, idx) => {
                                                    for (let genre in genres) {
                                                        return (
                                                            <span className='fav-genre' key={idx}>{genres.name} </span>
                                                        )
                                                    }

                                                })
                                            }
                                        </div>
                                        <button type="button" className="btn btn-secondary btn-lg btn-block fav-delete-button" onClick={() => removeFromFav(media.id)} >Delete from Favourites ❌</button>
                                    </div>


                                </div>


                            )
                        })
                }
            </div>
            



        </>
    )
}

export default Favourites