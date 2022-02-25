import { createSlice } from '@reduxjs/toolkit'
import { regisCreate, regisList } from './regisActions'

const initialState = {
    regis: [],
    successCreate: false
}

const regisSlices = createSlice({
    name: 'regis',
    initialState,
    reducers: {
        resetRegisSuccess(state, action) {
            state.successCreate = false
        }
    },
    extraReducers: {
        [regisList.fulfilled]: (state, action) => {
            state.regis = action.payload
        },
        [regisCreate.fulfilled]: (state, action) => {
            state.successCreate = true
        },
    }
})
export const { resetRegisSuccess } = regisSlices.actions
const { reducer } = regisSlices
export default reducer