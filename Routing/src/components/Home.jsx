import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {

    const navigate = useNavigate();
    function handleClick(){
        navigate('/about')
    }
  return (
    <div>
      <h1>I am Home page</h1>

      <button onClick={handleClick}>About More</button>
    </div>
  )
}

export default Home
