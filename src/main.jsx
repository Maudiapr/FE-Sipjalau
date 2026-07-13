import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import './index.css'

import { Login } from './components/pages/login'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { MainLayout } from './components/layout/mainLayout'
import { Dashboard } from './components/pages/dashboard'
import { Order } from './components/pages/order'
import { Faktur } from './components/pages/faktur';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>

        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='order' element={<Order/>}/>
          <Route path='faktur' element={<Faktur/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
