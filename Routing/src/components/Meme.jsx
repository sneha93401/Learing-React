import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Meme() {
  return (
    <div>
      <h1>Meme page</h1>
      <Link to={'courses'}>Courses</Link>
      <br />
      <Link to={'users'}>Users</Link>
      <Outlet />
    </div>
  )
}

export default Meme
