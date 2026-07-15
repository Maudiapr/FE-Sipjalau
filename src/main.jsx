import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import './index.css'

import { Login } from './pages/login'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { MainLayout } from './layout/mainLayout'
import { Dashboard } from './pages/dashboard'
import { Order } from './pages/order'
import { Faktur } from './pages/faktur';
import { AuthProvider } from './context/authContext.jsx'
import ProtectedRoute from './routes/protectedRoutes.jsx'
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login/>}/>

          <Route path='/' element={<ProtectedRoute><MainLayout/></ProtectedRoute>}>
            <Route index element={<Dashboard/>}/>
            <Route path='order' element={<Order/>}/>
            <Route path='faktur' element={<Faktur/>}/>
          </Route>
        </Routes>
        <Toaster richColors position="top-center" duration={3000} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
