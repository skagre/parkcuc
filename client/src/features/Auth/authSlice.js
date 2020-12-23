import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from 'api/authApi'


export const loginAPI = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    return await authApi.login({ params })
})

export const registerAPI = createAsyncThunk('auth/register', async (params, thunkAPI) => {
    return await authApi.register({ params })
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: {}
})

const { reducer: authReducer } = authSlice
export default authReducer