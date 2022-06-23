import React from "react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import axios from "axios";

// const API_URl = `https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=`
const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)
    const [topMovie, setTopMovie] = useState([])
    const [movieList, setMovieList] = useState([])
    const [totalPage, setTotalPage] = useState(1)
    useEffect(()=> {
        try{
            const getMoviesdata = async () => {
                setIsLoading(true)
                const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=e229afd722b6ee38525d46e0b317f72b&page=${page}`)
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
           
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false)
        }

        
       


    }, [page]);


    return <AppContext.Provider value={{movieList, topMovie, totalPage, isLoading, page, setPage}}>{children}</AppContext.Provider>
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




export {AppContext, AppProvider , useGlobalContext, setLocalStorageData, getLocalStorageData, removeLocalStorageData}