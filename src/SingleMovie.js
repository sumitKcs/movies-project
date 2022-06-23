import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useGlobalContext } from './Context'

const SingleMovie = () => {
    const { id } = useParams()
    const { page } = useGlobalContext()
    const [isLoading, setIsLoading] = useState(false)
    const [SingleMoviedata, setSingleMovieData] = useState({})
    const [isFav, setIsFav] = useState(false)
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

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getSingleMovieData()

    }, [])

    const favButtonHandler = () => {
        setIsFav(!isFav)

    }
    console.log(isFav)

    return (
        <>
            {
                (Object.keys(SingleMoviedata).length === 0 && SingleMoviedata.constructor === Object) ? "Loading...." : SingleMoviedata.map((movieObj, index) => {

                    console.log(movieObj)
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
                                                    isFav ? <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler()}>Added to Favourite ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler()}>Add to Favourite</button>
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
                                                    isFav ? <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => favButtonHandler()}>Added to Favourite ✅</button> : <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => favButtonHandler()}>Add to Favourite</button>
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
