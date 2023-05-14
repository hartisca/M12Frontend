import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import { equipReducer } from './Slices/Equips/equipSlice'
import { jugadorReducer } from './Slices/Jugador/jugadorSlice'
import { partidaReducer } from './Slices/Partides/partidaSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    partida: partidaReducer,
    equip: equipReducer,
    jugador: jugadorReducer
  },
})

export default store