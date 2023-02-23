import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import {ImSearch} from 'react-icons/im'
function Header() {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
        <div>
            <Link to='/tvshows'>Tv Shows</Link>
            <Link to='/movies'>Movies</Link>
            <Link to='/recently'>Recently Added</Link>
            <Link to='/mylist'>My List</Link>
        </div>
        <ImSearch />
    </nav>
  )
}

export default Header