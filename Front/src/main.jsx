import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import store from './store.js'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Menu } from './componentsLayout/menu'
import {Partida} from './components/partida'

ReactDOM.createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/*<Menu />
      <Partida />*/}
    </BrowserRouter>
  </Provider>

)
