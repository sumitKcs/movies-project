import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light app-navbar">
                <a className="navbar-brand " href="#" >Bigscreen</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/favourites" >Favourites</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               Genre
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                                <a className="dropdown-item" href="#">Action</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar