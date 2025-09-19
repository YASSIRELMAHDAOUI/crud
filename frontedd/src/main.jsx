import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import Appclient from './componants/Appclient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Appclient />
  </StrictMode>,
)
