import { useState } from 'react'

import './App.css'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import Home from './Pages/Home'
import Gallary from './Pages/Gallary'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AddWallpaper from './Pages/AddWallpaper'

function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
      <Route path='/'  element={<Home/>}/>
      <Route path="/gallary" element={<Gallary/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/add-post" element={<AddWallpaper/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
