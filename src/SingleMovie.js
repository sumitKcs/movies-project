import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { setLocalStorageData, useGlobalContext } from './Context'

const SingleMovie = () => {
    const { id } = useParams()
    const { page } = useGlobalContext()
    const [isLoading, setIsLoading] = useState(false)
    const [SingleMoviedata, setSingleMovieData] = useState({})
    
    const [favArr, setFavArray] = useState([])
    const [favAdded, setFavAdded] = useState(false)
    
    const checkFav =  () => {
        
            //console.log('iddd:', id)
            const getFavdData =  JSON.parse(localStorage.getItem("fav_movie_id"))
           // console.log("getfavdata", getFavdData)
            if (getFavdData) {
                for(let i in getFavdData) {
                    //console.log(getFavdData[i])
                    if(getFavdData[i] == id) {
                        //console.log("already fav")
                        return true
                        
                    }
                }
            } else {
                return false
            } 
       
             
    }
    const [isFav, setIsFav] = useState(checkFav())
    useEffect(() => {
        const getSingleMovieData = async () => {

            try {

                setIsLoading(true)
                const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=${page}`)
                const data = await res.data.results
                const singleData = await data.filter((SingleMovie) => {
                    return SingleMovie.id == id
                })
                setSingleMovieData(singleData)
                checkFav()
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }

        
        getSingleMovieData()
        
    }, [])

    const favButtonHandler = async (id) => {
        await setIsFav((!isFav))
        if (!isFav) {
            addToFav(id)
        } else {
            removeFromFav(id)
        }

    }
    //console.log("isfav",  isFav)
    const addToFav = async (dataID) => {
        const { id } = dataID
        //console.log("id", id)
        const movieId = id
        let isExist = false
        const getFavdData = await JSON.parse(localStorage.getItem("fav_movie_id"))
        //console.log("favarr", getFavdData)
        if (getFavdData) {
            const tempArr = [...getFavdData, movieId]
            for (let i = 0; i < getFavdData.length; i++) {
                if (getFavdData[i] === id) {
                    //console.log("duplicate id", id)
                    isExist = true
                    break;
                }
               // console.log("allId", id)
            }
            if (isExist) {

            } else {
                localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                setFavArray([...tempArr])
            }

        }else{
            localStorage.setItem("fav_movie_id", JSON.stringify([movieId]))
            setFavArray([...favArr, movieId])
        }


    }
    const removeFromFav = async (dataID) => {
        const { id } = dataID
       
        const getFavdData = await JSON.parse(localStorage.getItem("fav_movie_id"))
        console.log("id to remove", getFavdData)
        for(let i in getFavdData) {
            if(getFavdData[i] == id) {
                const tempArr = [...getFavdData]
                tempArr.splice(i, i)
                console.log("removed array", tempArr)
                localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                setFavArray([...tempArr])
            }
        }



    }


    return (
        <>
            {
                (Object.keys(SingleMoviedata).length === 0 && SingleMoviedata.constructor === Object) ? "Loading...." : SingleMoviedata.map((movieObj, index) => {

                    // console.log(movieObj)
                    const { id, original_title, original_name, first_air_date, media_type, release_date, poster_path, popularity, vote_average, vote_count, overview, genre_ids, backdrop_path } = movieObj
                    const releaseDate = new Date(release_date).toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })
                    const airedDate = new Date(first_air_date).toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })
                    if (media_type == "movie") {
                        return (
                            <>
                                <div key={index} className="single-movie-card-container">
                                    <div className='single-movie-card'>
                                        <div className='single-movie-image-container'>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} className="single-movie-image" alt="..." />
                                        </div>
                                        <div className='single-movie-details'>
                                            <div className='single-movie-title'>{original_title}<small> ({media_type})</small>
                                                <div className='single-movie-release-date'>({releaseDate})</div>
                                            </div>
                                            <div className='single-movie-overview'>{overview}</div>
                                            <div className='single-movie-popularity'><strong>Popularity: </strong><span className='popularity-number'>{popularity}</span></div>
                                            <div className='single-movie-rating'><strong>Rating:  </strong> <span className='rating-detail'>{vote_average}/10 from {vote_count} users</span> </div>
                                            <div className='fav-button'>
                                                {
                                                    
                                                    isFav ?
                                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler({ id })}>Added to Favourite ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler({ id })}>Add  to Favourite</button>
                                                }

                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </>

                        )
                    }
                    else {
                        return (
                            <>
                                <div key={index} className="single-movie-card-container">
                                    <div className='single-movie-card'>
                                        <div className='single-movie-image-container'>
                                            <img src={`https://image.tmdb.org/t/p/original${movieObj.poster_path}`} className="single-movie-image" alt="..." />
                                        </div>
                                        <div className='single-movie-details'>
                                            <div className='single-movie-title'>{original_name}<small> ({media_type})</small>
                                                <div className='single-movie-release-date'>({airedDate})</div>
                                            </div>
                                            <div className='single-movie-overview'>{overview}</div>
                                            <div className='single-movie-popularity'><strong>Popularity: </strong><span className='popularity-number'>{popularity}</span></div>
                                            <div className='single-movie-rating'><strong>Rating:  </strong> <span className='rating-detail'>{vote_average}/10 from {vote_count} users</span> </div>
                                            <div className='fav-button'>
                                                {
                                                    isFav ? <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler({ id })}>Added to Favourite ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler({ id })}>Add  to Favourite</button>
                                                }

                                            </div>


                                        </div>
                                    </div>
                                </div>

                            </>
                        )
                    }


                })


            }
        </>
    )
}

export default SingleMovie
