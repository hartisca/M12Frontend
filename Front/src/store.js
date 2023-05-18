import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import { equipReducer } from './Slices/Equips/equipSlice'
import { fitesReducer } from './Slices/Fites/fitesSlice'
import { jugadorReducer } from './Slices/Jugador/jugadorSlice'
import { mapaReducer } from './Slices/Maps/mapaSlice'
import { partidaReducer } from './Slices/Partides/partidaSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    partida: partidaReducer,
    equip: equipReducer,
    jugador: jugadorReducer,
    fites: fitesReducer,
    mapa: mapaReducer
  },
  
})

export default store