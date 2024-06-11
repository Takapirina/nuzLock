import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import TrainerCard from './componentCustom/trainerCard/trainerCard.tsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage/homepage.tsx'
import InterfacciaPartita from './pages/interfacciaPartita/interfacciaPartita.tsx'
import ProvaPagina from './componentCustom/trainerCard/pagina.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/partita' element={<InterfacciaPartita/>}/>
      <Route path='/componetProva' element={<ProvaPagina/>}/>
      <Route path='/app' element={<App/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
