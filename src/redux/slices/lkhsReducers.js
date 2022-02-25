import { createSlice } from '@reduxjs/toolkit'
import { lkhsCreate, lkhsList } from './lkhsActions'

const initialState = {
    lkhs: [],
    successCreate: false,

}

const lkhsSlice = createSlice({
    name: 'lkhs',
    initialState,
    reducers: {
        resetLkhsSuccess(state, action) {
            state.successCreate = false
        },

    },
    extraReducers: {
        [lkhsList.fulfilled]: (state, action) => {
            state.lkhs = action.payload
        },
        [lkhsCreate.fulfilled]: (state, action) => {
            state.successCreate = true
        },
    }
})

export const { resetLkhsSuccess, resetLkhsList } = lkhsSlice.actions
const { reducer } = lkhsSlice
export default reducer