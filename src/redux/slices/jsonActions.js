import Axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const jsonGet = createAsyncThunk('json/jsonGet', async (args, thunkApi) => {
    const { data } = await Axios.get('/api/json/get')
    // console.log(data);
    return data
})
export const jsonAdd = createAsyncThunk('json/jsonAdd', async (args, thunkApi) => {
    const { json } = thunkApi.getState()
    // console.log(json.cartItems);
    const existId = json.cartItems.find(item => item.id === args.id)
    // console.log(existId);
    if (
        existId
    ) {
        const existItem = existId.name.find(item => item.pid === args.name.pid)
        // console.log(existItem);
        if (existItem) {
            const cartItems = existId.name.map(item => item.pid === args.name.pid ? { ...item, jumlah: parseInt(item.jumlah) + args.name.jumlah } : item)
            console.log(cartItems);
            const { data } = await Axios.put(`/api/json`, { id: args.id, name: cartItems })
            return data
        }
        else {
            console.log('test');
            const cartItems = [...existId.name, args.name]
            console.log(cartItems);
            const { data } = await Axios.put(`/api/json`, { id: args.id, name: cartItems })
            return data
        }
    } else {
        const { data } = await Axios.put(`/api/json`, { name: args.name })
        return data
    }
})
export const jsonMin = createAsyncThunk('json/jsonmin', async (args, thunkApi) => {
    const { json } = thunkApi.getState()
    // console.log(json.cartItems);
    const existId = json.cartItems.find(item => item.id === args.id)
    // console.log("existId", existId);
    if (existId) {
        const existItem = existId.name.find(x => x.pid === args.name.pid)
        console.log(existItem);
        if (existItem) {
            const cartItems = existId.name.map(item => item.pid === args.name.pid ? { ...item, jumlah: item.jumlah - args.name.jumlah } : item)
            console.log(cartItems);
            const { data } = await Axios.put(`/api/json/minjson`, { id: args.id, name: cartItems })
            return data

        } else {
            const data = "Data Tidak Tersedia"
            return data
        }

    } else {
        const data = "Data Tidak Tersedia"
        return data
    }
})

export const jsonDel = createAsyncThunk('json/jsonDel', async (args, thunkApi) => {
    const { json } = thunkApi.getState()
    const existId = json.cartItems.find(item => item.id === args.id)
    console.log(existId);

    if (existId) {
        const cartItems = existId.name.filter(item => item.pid !== args.name.pid)
        const { data } = await Axios.put(`/api/json/minjson`, { id: args.id, name: cartItems })
        console.log(data);
        // return data
    } else {
        const data = "data Tidak tersedia"
        console.log(data);
    }
})