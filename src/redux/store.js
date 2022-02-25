import { configureStore } from '@reduxjs/toolkit'
import alatReducer from './slices/alatReducers'
import lkhsReducer from './slices/lkhsReducers'
import regisReducer from './slices/regisReducers'
import userReducer from './slices/userReducers'
import jsonReducer from './slices/jsonReducers'
import { localStorageMiddleware, reHydrateStore } from './slices/middleware'

// const initialState = {

//     userInfo: localStorage.getItem('userInfo')
//         ? JSON.parse(localStorage.getItem('userInfo'))
//         : null,

// };


const store = configureStore({
    reducer: {
        alat: alatReducer,
        lkhs: lkhsReducer,
        regis: regisReducer,
        user: userReducer,
        json: jsonReducer,
    },
    // preloadedState: reHydrateStore(),
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    devTools: true
})



export default store