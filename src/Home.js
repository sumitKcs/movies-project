import React from 'react'
import Movies from './Movies'
import Pagination from './Pagination'
import Search from './Search'
import TopBar from './TopBar'

const Home = () => {
    return (
        <>
            <TopBar />
            <Search />
            <Movies />
            <Pagination />
        </>
    )
}

export default Home