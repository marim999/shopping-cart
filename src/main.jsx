import { StrictMode } from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <CartProvider>
          <App/>
    </CartProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
