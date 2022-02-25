import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const regisList = createAsyncThunk('regis/regisList', async (args, thunkApi) => {

    const { data } = await Axios.get('/api/registrasi', {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
    return data
})

export const regisCreate = createAsyncThunk('regis/regisCreate', async (args, thunkApi) => {
    await Axios.post('/api/registrasi', args, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})