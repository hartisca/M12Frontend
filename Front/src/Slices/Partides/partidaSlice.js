import { createSlice } from '@reduxjs/toolkit'

export const partidaSlice = createSlice({
 name: 'partida',
 initialState: { 
    partides: [],    
    partida: {
        nom: "",
        puntsvictoria: "",
        dataInici: "",
        duracio: "",
    },
    isLoading: true,
    missatge: "",
    filter: { poblacio: "" },
    errors: "",
    partidaId: null,
    mapaId: null,
    
 }, 
 reducers: {
    setPartides: (state, action) => {
        state.partides = action.payload;
        state.isLoading = false;
    },
    startLoadingPartides: (state) => {
        state.isLoading = true;
    },
    setPartida: (state, action) => {
        state.partida = action.payload;
        state.isLoading = false;
    },
    setPartidaId: (state, action) => {
        state.partidaId = action.payload;
    },
    setMapaId: (state, action) => {
        state.mapaId = action.payload;
    },
    setFilter: (state,action) => {
        state.filter = action.payload
    },
       
 }
})

export const selectResponseIdPartida = state => state.partida.partidaId;

export const selectMapaIdPartida = state => state.partida.mapaId;

// Action creators are generated for each case reducer function
export const { setPartides, setPartida, startLoadingPartides, errors, missatge, setPartidaId, setMapaId, setFilter } = partidaSlice.actions

export const partidaReducer = partidaSlice.reducer