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
    equipId: null,
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
    saveResponseEquipId: (state, action) => {
      state.equipId = action.payload;
    }

 },
})

export const selectResponseEquipId = state => state.equip.equipId;

// Action creators are generated for each case reducer function
export const { setEquips, setEquip, errors, startLoadingEquips, saveResponseEquipId } = equipSlice.actions

export const equipReducer = equipSlice.reducer