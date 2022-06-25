import React from 'react'
import { useState } from 'react'
import { useGlobalContext } from './Context'


const Search = () => {
    const {setSearchValue,setToShow} = useGlobalContext()
    const [inputValue, setInputValue] = useState("")
    const onChangehandler = (e)=> {
        let val = e.target.value
        setInputValue(val)
        if(val.length === 3) {
            setToShow("search")
            setSearchValue(val)
            
        }
    }
    return (
        <> <div className='search-container'>
            <input className='searchBox' value={inputValue}  type="text" placeholder="Search....." onChange={(e) => onChangehandler(e)}/>
        </div>
        </>
    )
}

export default Search