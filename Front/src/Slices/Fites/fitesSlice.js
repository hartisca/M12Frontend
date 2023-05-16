import { createSlice } from '@reduxjs/toolkit'

export const fitesSlice = createSlice({
 name: 'fites',
 initialState: { 
    fetes: [],
    noFetes: [],
    fita: {
        lat: 0,
        long: 0,
    },
    isLoading: true,
    missatge: "",
 }, 
 reducers: {
    startLoadingFites: (state) => {
        state.isLoading = true;
    },
    setMissatge: (state, action) => {
        state.missatge = action.payload
    },
    setFetes: (state, action) => {
        state.fetes = action.payload;
    },
    setNoFetes: (state, action) => {
        state.noFetes = action.payload;
    }
    
 },
})

// Action creators are generated for each case reducer function
export const { startLoadingFites, setMissatge, setFetes, setNoFetes } = fitesSlice.actions

export const fitesReducer = fitesSlice.reducer