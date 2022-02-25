import { createSlice } from '@reduxjs/toolkit'
import { login, signup, verify } from './userActions'

const initialState = {
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser(state, action) {
            state.user = null
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.user = action.payload
            // console.log(action);
        },
        [signup.fulfilled]: (state, action) => {
            state.user = action.payload
            // console.log(action);
        },
        [verify.fulfilled]: (state, action) => {
            state.user = action.payload
            // console.log(action);
        },
    }
})

export const { resetUser } = userSlice.actions

const { reducer } = userSlice
export default reducer