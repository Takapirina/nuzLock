import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage/homepage.tsx'
import InterfacciaPartita from './pages/interfacciaPartita/interfacciaPartita.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/partita' element={<InterfacciaPartita/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
