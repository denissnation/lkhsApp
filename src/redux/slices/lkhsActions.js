import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const lkhsList = createAsyncThunk('lkhs/lkhsList', async (args, thunkApi) => {
    const { data } = await Axios.get('https://kalibrasi.okeythen.my.id/api/lkhs', {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
    return data
})
export const lkhsCreate = createAsyncThunk('lkhs/lkhsCreate', async (args, thunkApi) => {
    await Axios.post('https://kalibrasi.okeythen.my.id/api/lkhs', args, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})