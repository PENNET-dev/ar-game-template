import React from 'react'
import ReactDOM from 'react-dom/client'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'
import './index.css'

ReactDOM.createRoot(document.getElementById('GameHeader')).render(
  <React.StrictMode>
    <GameHeader />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('GameFooter')).render(
  <React.StrictMode>
    <GameFooter />
  </React.StrictMode>,
)
