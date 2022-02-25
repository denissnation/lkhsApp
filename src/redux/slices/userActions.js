import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const login = createAsyncThunk('user/login', async (args, thunkApi) => {

    const data = await Axios.post('https://kalibrasi.okeythen.my.id/api/pegawai', args)
    return data.data
    // console.log(data);
})
export const signup = createAsyncThunk('user/signup', async (args, thunkApi) => {

    const data = await Axios.post('https://kalibrasi.okeythen.my.id/api/pegawai/register', args)
    return data.data
    // console.log(data);
})

export const verify = createAsyncThunk('user/verify', async (args, thunkApi) => {

    const data = await Axios.get(`https://kalibrasi.okeythen.my.id/api/pegawai/verify/${args.id}/${args.uniquestring}`)
    return data.data
    // console.log(data);
})