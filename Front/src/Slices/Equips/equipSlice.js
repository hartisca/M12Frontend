import { createSlice } from '@reduxjs/toolkit'

export const equipSlice = createSlice({
 name: 'equip',
 initialState: { 
  equips: [],
  equip: {
      nom: "",
      punts: "",
  },
    isLoading: true,
    missatge: "",    
    errors: "",
 }, 
 reducers: {
    setEquips: (state, action) => {
        state.equips = action.payload;
        state.isLoading = false;
    },
    
    setEquip: (state, action) => {
        state.equip = action.payload;
        state.isLoading = false;
    },
    startLoadingEquips: (state) => {
        state.isLoading = true;
    },

 },
})

// Action creators are generated for each case reducer function
export const { setEquips, setEquip, errors, startLoadingEquips } = equipSlice.actions

export const equipReducer = equipSlice.reducer