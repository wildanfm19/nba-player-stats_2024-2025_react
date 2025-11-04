import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import { PlayersProvider } from './context/PlayersContext'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PlayersProvider>
        <App/>
      </PlayersProvider>
    </BrowserRouter>
  </StrictMode>,
)
