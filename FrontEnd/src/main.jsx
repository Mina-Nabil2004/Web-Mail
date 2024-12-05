import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./Header.css";
import Header from './Header.jsx';
import Footer from './Footer'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <Footer/>
  </StrictMode>,
)
