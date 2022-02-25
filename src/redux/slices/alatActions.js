import Axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const alatAction = createAsyncThunk('alat/alatList', async (args, thunkApi) => {
    const { data } = await Axios.get('/api/alat', {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
    return data
})

export const alatDelete = createAsyncThunk('alat/alatDelete', async (id, thunkApi) => {
    await Axios.delete(`/api/alat/${id}`, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})

export const alatCreate = createAsyncThunk('alat/alatCreate', async (alat, thunkApi) => {
    await Axios.post(`/api/alat`, alat, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})
export const alatUpdate = createAsyncThunk('alat/alatUpdate', async (alat, thunkApi) => {
    await Axios.put(`/api/alat/${alat.idAlat}`, { namaAlat: alat.namaAlat }, {
        headers: {
            Authorization: `Bearer ${thunkApi.getState().user.user.token}`
        }
    })
})