import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {

    const navigate = useNavigate();
    function handleClick(){
        navigate('/')
    }
  return (
    <div>
      <h1>About page</h1>
      <button onClick={handleClick}>explore More</button>
    </div>
  )
}

export default About
