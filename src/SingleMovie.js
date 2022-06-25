import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useGlobalContext } from './Context'


const SingleMovie = () => {
    const params = useParams()
   
    const { id, media_type, movieObj } = params
    //console.log(id, media_type, movieObj)
    let videoType = ""
   
    const FIND_BY_ID_URL = `https://api.themoviedb.org/3/${media_type}/${id}?api_key=e229afd722b6ee38525d46e0b317f72b&language=en-US`


    const [isLoading, setIsLoading] = useState(false)
    const [SingleMoviedata, setSingleMovieData] = useState({})
    const [favArr, setFavArray] = useState([])
    let releaseDate = '';
    let airedDate = '';

    const checkFav = () => {

        //console.log('iddd:', id)
        const getFavdData = JSON.parse(localStorage.getItem("fav_movie_id"))
        // console.log("getfavdata", getFavdData)
        if (getFavdData) {
            for (let i in getFavdData) {
                //console.log(getFavdData[i])
                if (getFavdData[i]['id'] == id) {
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
                const res = await axios.get(FIND_BY_ID_URL)
                //console.log(res.data.original_title)
                const singleData = await res.data
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

    if (SingleMoviedata) {
        releaseDate = new Date(SingleMoviedata.release_date).toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })
        airedDate = new Date(SingleMoviedata.first_air_date).toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const favButtonHandler = (id) => {
        setIsFav((!isFav))
        if (!isFav) {
            addToFav(id)
        } else {
            removeFromFav(id)
        }

    }
    
    //console.log("isfav",  isFav)
    const addToFav = async () => {
        const movieId = id
        const mediaType = media_type
        let title = ''
        let release_date =''
        if( media_type && media_type == "movie") {
            title =  SingleMoviedata.original_title
            release_date = releaseDate
        }else if(media_type) {
            title =  SingleMoviedata.original_name
            release_date = airedDate
        }
        const genres = SingleMoviedata.genres
        const rating = SingleMoviedata.vote_average
        const image = SingleMoviedata.poster_path
        
        console.log("releaseDate:", release_date)
        
        let isExist = false
        const getFavdData = await JSON.parse(localStorage.getItem("fav_movie_id"))
        let tempObj ={"id": movieId, "media_type": mediaType, "title": title, "genres": genres, "rating": rating, "poster_image":image, "release_date":release_date}
        //console.log("favarr", getFavdData)
        if (getFavdData) {
            let tempArr = [...getFavdData, tempObj]
            console.log("temparr:", tempArr)
            for (let i = 0; i < getFavdData.length; i++) {
                if (getFavdData[i]['id'] == id) {
                    console.log("duplicate id", id)
                    isExist = true
                    break;
                }
                // console.log("allId", id)
            }
            if (isExist) {

            } else {
                localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                setFavArray(tempArr)
            }

        } else {
            let tempArr2 = []
            tempArr2.push(tempObj)
            localStorage.setItem("fav_movie_id", JSON.stringify(tempArr2))
            setFavArray(...favArr, tempArr2)
        }


    }
    const removeFromFav = async () => {

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
                        setFavArray(...tempArr)
                    } else {
                        const tempArr = [...getFavdData]
                        tempArr.splice(i, i)
                        console.log("removed array", tempArr)
                        localStorage.setItem("fav_movie_id", JSON.stringify(tempArr))
                        setFavArray(...tempArr)
                    }

                }
            }
        }

    }
   




    return (
        <>
            {
                (Object.keys(SingleMoviedata).length === 0 && SingleMoviedata.constructor === Object) ? "Loading...." :




                    (media_type == "movie") ?

                        <>
                            <div className="single-movie-card-container">
                                <div className='single-movie-card'>
                                    <div className='single-movie-image-container'>
                                        <img src={`https://image.tmdb.org/t/p/original${SingleMoviedata.poster_path}`} className="single-movie-image" alt="..." />
                                    </div>
                                    <div className='single-movie-details'>
                                        <div className='single-movie-title'>{SingleMoviedata.original_title}<small> ({media_type})</small>
                                            <div className='single-movie-release-date'>({releaseDate})</div>
                                            <div className='single-movie-runtime'>({SingleMoviedata.runtime} min)</div>
                                        </div>
                                        <div className='single-movie-genre-container'>
                                            <strong>Genre: </strong>
                                            {

                                                SingleMoviedata.genres.map((genres, index) => {
                                                    for (let genre in genres) {
                                                        return (
                                                            <span className='single-movie-genre' key={index}>{genres.name} </span>
                                                        )
                                                    }

                                                })
                                            }


                                        </div>
                                        <div className='single-movie-overview'>{(SingleMoviedata.overview)>600?SingleMoviedata.overview.slice(0, 600)+"...": SingleMoviedata.overview}</div>
                                        <div className='single-movie-popularity'><strong>Popularity: </strong><span className='popularity-number'>{SingleMoviedata.popularity}</span></div>
                                        <div className='single-movie-rating'><strong>Rating:  </strong> <span className='rating-detail'>{SingleMoviedata.vote_average}/10 from {SingleMoviedata.vote_count} users</span> </div>
                                        <div className='fav-button'>
                                            {

                                                isFav ?
                                                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler()}>Added to Favourites ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler()}>Add  to Favourite</button>
                                            }

                                        </div>


                                    </div>
                                </div>
                            </div>

                        </>



                        :

                        <>
                            <div className="single-movie-card-container">
                                <div className='single-movie-card'>
                                    <div className='single-movie-image-container'>
                                        <img src={`https://image.tmdb.org/t/p/original${SingleMoviedata.poster_path}`} className="single-movie-image" alt="..." />
                                    </div>
                                    <div className='single-movie-details'>
                                        <div className='single-movie-title'>{SingleMoviedata.original_name}<small> ({media_type})</small>
                                            <div className='single-movie-release-date'>({airedDate})</div>
                                        </div>
                                        <div className='single-movie-overview'>{(SingleMoviedata.overview).length>600?SingleMoviedata.overview.slice(0, 500)+"...": SingleMoviedata.overview}</div>
                                        <div className='single-movie-popularity'><strong>Popularity: </strong><span className='popularity-number'>{SingleMoviedata.popularity}</span></div>
                                        <div className='single-movie-rating'><strong>Rating:  </strong> <span className='rating-detail'>{SingleMoviedata.vote_average}/10 from {SingleMoviedata.vote_count} users</span> </div>
                                        <div className='fav-button'>
                                            {
                                                isFav ? <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler()}>Added to Favourites ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler()}>Add  to Favourite</button>
                                            }

                                        </div>


                                    </div>
                                </div>
                            </div>

                        </>







            }
        </>
    )
}

export default SingleMovie
