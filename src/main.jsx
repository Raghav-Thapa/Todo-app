import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Routing from './config/Routing.jsx'
import './pages/sidebar.css'
import "@fortawesome/fontawesome-free/css/all.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <Routing/>
  </React.StrictMode>,
)
