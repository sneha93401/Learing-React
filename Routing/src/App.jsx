
import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Meme from './components/meme'
import Navbar from './components/Navbar'
import Courses from './components/Courses'
import User from './components/User'
import NotFound from './components/NotFound'

const router = createBrowserRouter(
  [
    {path:'/',
      element: <div>
        <Navbar/>
        <Home/>
      </div>
    },
    {path:'/about',
      element: <div>
        <Navbar/>
        <About/>
      </div>
    },
    {path:'/meme',
      element: <div>
        <Navbar/>
        <Meme/>
      </div>,
      children:[
        {
          path:'courses',
          element:<Courses/>
        },
        { 
          path:'users',
          element:<User/>
        }
      ]
    },
    {
      path:'*',
      element:<NotFound/>
    }
  ]
)

function App() {
  return (
    <div>
     <RouterProvider router={router} />,
    </div>
  )
}

export default App
