import { createSlice } from '@reduxjs/toolkit'

export const jugadorSlice = createSlice({
 name: 'jugador',
 initialState: { 
  jugadors: [],
  jugador: {
    nom: "",
    soldadets: "",
    equip_id: "",
    img: {filepath: ""},    
  },
    isLoading: true,
    missatge: "",    
    errors: "",
    responseId: null,
    info: "",
 }, 
 reducers: {
    setJugador: (state, action) => {
      state.jugador = action.payload;
      state.isLoading = false;
    },
    saveResponseId: (state, action) => {
      state.responseId = action.payload;
    },
    setJugadors: (state, action) => {
      state.jugadors = action.payload;
    },   
    setInfo: (state, action) => {
      state.info = action.payload;      
    }, 
 },
})

export const selectResponseId = state => state.jugador.responseId;

// Action creators are generated for each case reducer function
export const { setJugador, errors, saveResponseId, setJugadors, setInfo } = jugadorSlice.actions

export const jugadorReducer = jugadorSlice.reducer