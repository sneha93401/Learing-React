import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Meme from './meme'   

function Navbar() {
  return (
    <div>   
      <ul>
        <li>
            <NavLink to="/" className={({isActive})=>isActive ? "active-class" : ""}>
            Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/about" className={({isActive})=> isActive? "active-class" : ""}>
            About
            </NavLink>
        </li>
        <li>
            <NavLink to="/meme" className={({isActive})=> isActive? "active-class" : ""}>Dashboard</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
