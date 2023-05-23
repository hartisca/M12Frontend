import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'authslice',
    initialState: { 
        token: null,
        usuari: {
            nom: "",
            file: { filepath: ""},
            email: "",
        }
    }, 
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        clearToken: (state) => {
            state.token = null
        },
        setUsuari: (state, action) => {
            state.usuari.email = action.payload
        }
    }, 
})

// Action creators are generated for each case reducer function
export const { setToken, clearToken, setUsuari } = authSlice.actions

export default authSlice.reducer