import { createSlice } from '@reduxjs/toolkit'

export const jugadorSlice = createSlice({
 name: 'jugador',
 initialState: { 
  jugador: {
    soldadets: "",
    equip_id: "",
  },
    isLoading: true,
    missatge: "",    
    errors: "",
 }, 
 reducers: {
    setJugador: (state, action) => {
        state.jugador = action.payload;
        state.isLoading = false;
    },
 },
})

// Action creators are generated for each case reducer function
export const { setJugador, errors } = jugadorSlice.actions

export const jugadorReducer = jugadorSlice.reducer