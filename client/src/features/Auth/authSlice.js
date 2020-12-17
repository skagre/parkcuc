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
    extraReducers: {
        [loginAPI.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [loginAPI.rejected]: (state, action) => {
            state.error = action.error
        },
        [registerAPI.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [registerAPI.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})

const { reducer: authReducer } = authSlice
export default authReducer