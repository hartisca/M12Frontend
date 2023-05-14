import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import PartidasList from './components/Partides/PartidasList'

import PartidaMap from './components/Maps/partidaMap'


ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/*<PartidaMap />*/}     
    </BrowserRouter>
  </Provider>

)
