import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import { partidaReducer } from './Slices/Partides/partidaSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    partida: partidaReducer
  },
})

export default store