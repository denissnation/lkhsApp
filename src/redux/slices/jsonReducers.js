import { createSlice } from '@reduxjs/toolkit'
import { jsonAdd, jsonGet, jsonMin } from './jsonActions'

const initialState = {
    cartItems: [],
    success: false,
}

const jsonSlice = createSlice({
    name: 'json',
    initialState,
    reducers: {
        resetJson(state, action) {
            state.success = false
        },
        addJson(state, action) {
            const existItem = state.cartItems.find(x => x.pid === action.payload.pid)
            if (existItem) {
                state.cartItems = state.cartItems.map(item => item.pid === action.payload.pid ? { ...item, jumlah: action.payload.jumlah + item.jumlah } : item)
                state.totalItem = state.cartItems.reduce((a, b) => a + b.jumlah, 0)
            } else {
                state.cartItems = [...state.cartItems, action.payload]
                state.totalItem = state.cartItems.reduce((a, b) => a + b.jumlah, 0)
            }
        },
        minJson(state, action) {
            const existItem = state.cartItems.find(x => x.pid === action.payload.pid)
            if (existItem) {
                state.cartItems = state.cartItems.map(item => item.pid === action.payload.pid ? { ...item, jumlah: item.jumlah - action.payload.jumlah } : item)
                state.totalItem = state.cartItems.reduce((a, b) => a + b.jumlah, 0)
            }
        },
    },
    extraReducers: {
        [jsonGet.fulfilled]: (state, action) => {
            state.cartItems = action.payload
        },
        [jsonAdd.fulfilled]: (state, action) => {
            state.success = true
            state.message = action.payload.message
        },
        [jsonMin.fulfilled]: (state, action) => {
            state.success = true
            state.message = action.payload.message
        }
    }
})

export const { addJson, minJson, resetJson } = jsonSlice.actions

const { reducer } = jsonSlice
export default reducer