import React from 'react'
import Movies from './Movies'
import Navbar from './Navbar'
import Pagination from './Pagination'
import Search from './Search'
import TopBar from './TopBar'

const Home = () => {
    return (
        <>
            <Navbar/>
            <TopBar />
            <Search />
            <Movies />
            <Pagination />
        </>
    )
}

export default Home