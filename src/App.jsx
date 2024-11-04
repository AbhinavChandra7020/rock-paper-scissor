import { useState } from 'react'
import RPS from './components/RPS'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "/game",
      element: <RPS />
    },
    {
      path: "/home",
      element: <Homepage />
    }
  ])

  return(
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}

export default App
