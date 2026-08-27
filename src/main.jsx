import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // <-- BrowserRouter-ის ნაცვლად ვიყენებთ HashRouter-ს
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter> {/* <-- აქაც BrowserRouter-ის ნაცვლად ჩასვით HashRouter */}
      <App />
    </HashRouter>
  </React.StrictMode>,
)