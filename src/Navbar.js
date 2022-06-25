import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from './Context'

const Navbar = () => {
    const { movieGenre, tvGenre, setDynamicText} = useGlobalContext();
    const navigate = useNavigate();

    const allClickHandler = () => {
        setDynamicText("All")
        navigate('/all')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light app-navbar">
                <a className="navbar-brand " href="#" style={{ color: "grey" }} >Bigscreen</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item ">
                            <a className="nav-link menu-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="/favourites" >Favourites</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle menu-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Movies
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {/* <a className="dropdown-item" onClick={() => allClickHandler()}>All</a> */}
                                {(movieGenre) ?

                                    movieGenre.map((genre, index) => {
                                        return (
                                            <a className="dropdown-item" key={index} onClick={() => navigate(`/movie/${genre.id}/${genre.name}`)}>{genre.name}</a>
                                        )

                                    }) : "loading.."
                                }

                            </div>

                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle menu-link" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Tv Shows
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {/* <a className="dropdown-item" onClick={() => allClickHandler()}>All</a> */}
                                {(tvGenre) ?

                                    tvGenre.map((genre, index) => {
                                        return (
                                            <a className="dropdown-item" key={index} onClick={() => navigate(`/tv/${genre.id}/${genre.name}`)}>{genre.name}</a>
                                        )

                                    }) : "loading.."
                                }
                            </div>

                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar