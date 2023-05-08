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
    page: 0,
    errors: "",
 }, 
 reducers: {
    setPartides: (state, action) => {
        state.partides = action.payload;
        state.isLoading = false;
    },
    startLoadingPartides: (state) => {
        state.isLoading = true;
    }
 }
})

// Action creators are generated for each case reducer function
export const { setPartides, startLoadingPartides, errors, missatge } = partidaSlice.actions

export const partidaReducer = partidaSlice.reducer