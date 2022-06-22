import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import axios from 'axios'
const Movies = () => {
    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currPage, setCurrPage] = useState(1)
    const [pageArr, setPageArr] = useState([1])
    const [topMovie, setTopMovie] = useState([])
    useEffect(() => {
        getMoviesdata()
    }, [currPage])
    const getMoviesdata = async () => {
        setIsLoading(true)
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=${currPage}`)
        //console.log(res.data.results)
        const data = res.data.results
        setMovieList([...data])
        setIsLoading(false)
        if (currPage === 1) {

            setTopMovie([{ mydata: data[0] }])
        }
    }
    const nextHandler = () => {
        let tempArr=[]
        for(let i=1; i<=currPage+1; i++ ){
            tempArr.push(i)
        }
        setPageArr([...tempArr])
        setCurrPage(currPage+1)
        
    }
    const prevHandler = () => {
        if(currPage >1) {
            pageArr.pop()
            setCurrPage(currPage-1)
            getMoviesdata()
        }else {
            setCurrPage(1)
            setPageArr([1])
        }
        
        
    }


    return (

        <>
        

            {
                topMovie.map((topMovieObj, index) => {
                    const topBarMovie = topMovieObj.mydata
                    return (
                        <div className='top-trending' key={index}>
                            <div className='top-trending-image-conatiner'>

                                <img style={{ width: "100%", height: "100%" }} src={`https://image.tmdb.org/t/p/original${topBarMovie.backdrop_path}`} className="topbar-movie-image" alt="..." />
                                <div className='topbar-trending-title'>
                                    {topBarMovie.original_title}
                                </div>
                                <div className='topbar-trending-rank'>
                                    Trending #1
                                </div>
                            </div>


                        </div>
                    )
                })
            }

            <div className='trending-text'> Trending </div>



            <div className='movie-container'>
                {
                    movieList.map((movieObj, index) => {

                        return (

                            <div className="movie-card" key={index}>
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
            <div className='pagination-container'>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" onClick={()=> prevHandler()}>Prev</a></li>
                       { pageArr.map((value, idx) => {
                        
                        return(
                         
                            <li className="page-item" key={idx}><a className="page-link" >{value}</a></li>
                            
                            
                        )
                                
                           
                        })}
                            
                       
                        
                        <li className="page-item"><a className="page-link"  onClick={()=> nextHandler()}>Next</a></li>
                    </ul>
                </nav>
            </div>


        </>
    )
}

export default Movies
