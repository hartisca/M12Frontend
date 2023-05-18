import { createSlice } from '@reduxjs/toolkit'

export const mapaSlice = createSlice({
 name: 'mapa',
 initialState: { 
    mapa: {        
        nom:"",
        lat1: 0,
        lat2: 0,
        long1: 0,
        long2: 0,
    },
    isLoading: true,
    missatge: "",
    errors: "",
    mapaId: null,
 }, 
 reducers: {
    setMapa: (state, action) => {
        state.mapa = action.payload.data.data;
        state.isLoading = false;
    },    
    
 }
 
})

// Action creators are generated for each case reducer function
export const { setMapa } = mapaSlice.actions

export const mapaReducer = mapaSlice.reducer