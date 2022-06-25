import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import axios from "axios";

// const API_URl = `https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=`
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [topMovie, setTopMovie] = useState([])
    const [movieList, setMovieList] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    const [movieGenre, setMovieGenre] = useState();
    const [tvGenre, setTvGenre] = useState();
    const [genrePage, setGenrePage] = useState();
    const [dynamicText, setDynamicText] = useState("Trending");
    const [searchValue, setSearchValue] = useState("");
    const [fetchGenre, setFetchGenre] = useState(true)
    const [toShow, setToShow] = useState("default")
    const Tv_Genre_List_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=e229afd722b6ee38525d46e0b317f72b`

    const Movie_Genre_List_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=e229afd722b6ee38525d46e0b317f72b`
    let URL = "";
    useEffect(() => {
        if (toShow === "genre") {
            console.log("hii I am genre page of ", genrePage)
            
        try {
            setDynamicText("Loading.....")
            console.log("home:", genrePage.genre_id)
            const Movie_Genre_Search_URL = `https://api.themoviedb.org/3/discover/${genrePage.media_type}?api_key=e229afd722b6ee38525d46e0b317f72b&with_genres=${genrePage.genre_id}&page=${page}`
            const genreClickHandler = async () => {
              const res = await axios.get(Movie_Genre_Search_URL)
              //console.log(res.data)
              const data = res.data.results
              console.log(res)
              setMovieList(data)
              const totalPages = res.data.total_pages
              setTotalPage(totalPages)
              
              //console.log("total  pages:", res.data.total_pages)
            }
      
            genreClickHandler()
      
          } catch (error) {
            console.log(error)
          }finally{
            setDynamicText(genrePage.genre_name)
          }
        }else if(toShow === "search") {
                console.log("i i am search data")
        }
        else if(toShow === "default"){
            console.log("hii i am default")
            URL = `https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=${page}`

            try {
                const getMoviesdata = async () => {
                    setIsLoading(true)
                    setDynamicText("Loading.....")
                    const res = await axios.get(URL)
                    //console.log(res.data)
                    const data = res.data.results
                    setIsLoading(false)
                    setTotalPage(res.data.total_pages)
                    setMovieList([...data])
                    if (page === 1) {

                        setTopMovie([{ mydata: data[0] }])
                    }
                }

                getMoviesdata()

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
                setDynamicText("Trending")
            }
        }
        
        if(fetchGenre) {
            try {
                const getTvGenreData = async () => {
                    const res = await axios.get(Tv_Genre_List_URL)
                    //console.log(res.data)
                    const data = res.data.genres
                    setTvGenre(data)
                    // console.log(data)
                }
    
                getTvGenreData()
    
            } catch (error) {
                console.log(error)
            }

            try {
                const getMovieGenreData = async () => {
                    const res = await axios.get(Movie_Genre_List_URL)
                    //console.log(res.data)
                    const data = res.data.genres
                    // console.log(data)
                    setMovieGenre(data)
                }
    
                getMovieGenreData()
    
            } catch (error) {
                console.log(error)
            }

            setFetchGenre(false)
        }

        

       



    }, [page,genrePage, searchValue]);


    return <AppContext.Provider value={{ movieList, topMovie, totalPage, isLoading, page, setPage, movieGenre, tvGenre, setMovieList, setTotalPage, setGenrePage, dynamicText, setSearchValue, setToShow}}>{children}</AppContext.Provider>
};

//global custom hook
const useGlobalContext = () => {
    return useContext(AppContext)
}

const setLocalStorageData = (obj) => {
    localStorage.setItem(JSON.stringify(obj))
}
const getLocalStorageData = (key) => {
    localStorage.getItem(key)
}
const removeLocalStorageData = (key) => {
    localStorage.removeItem(key)
}




export { AppContext, AppProvider, useGlobalContext, setLocalStorageData, getLocalStorageData, removeLocalStorageData }