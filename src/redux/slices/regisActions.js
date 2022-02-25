import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const regisList = createAsyncThunk('regis/regisList', async (args, thunkApi) => {

    const { data } = await Axios.get('https://kalibrasi.okeythen.my.id/api/registrasi', {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
    return data
})

export const regisCreate = createAsyncThunk('regis/regisCreate', async (args, thunkApi) => {
    await Axios.post('https://kalibrasi.okeythen.my.id/api/registrasi', args, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})