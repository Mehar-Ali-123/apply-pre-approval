import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Redirect from './Routes/Redirect'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App;
