import { createSlice } from '@reduxjs/toolkit'
import { alatAction, alatCreate, alatDelete, alatUpdate } from './alatActions'

const initialState = {
    alats: [],
    successDelete: false,
    successCreate: false,
    successUpdate: false
}

const alatSlice = createSlice({
    name: 'alat',
    initialState,
    reducers: {
        resetAlatSuccess(state, action) {
            state.successCreate = false
            state.successDelete = false
            state.successUpdate = false
        }
    },
    extraReducers: {
        [alatAction.fulfilled]: (state, action) => {
            state.alats = [...action.payload]
        },
        [alatCreate.fulfilled]: (state, action) => {
            state.successCreate = true
        },
        [alatDelete.fulfilled]: (state, action) => {
            state.successDelete = true
        },
        [alatUpdate.fulfilled]: (state, action) => {
            state.successUpdate = true
        }
    }
})

export const { resetAlatSuccess } = alatSlice.actions

const { reducer } = alatSlice
export default reducer