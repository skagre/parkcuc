import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from 'api/authApi'


export const authLogin = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    return await authApi.login({ params })
})

export const authRegister = createAsyncThunk('auth/register', async (params, thunkAPI) => {
    return await authApi.register({ params })
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
    extraReducers: {
        [authLogin.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [authLogin.rejected]: (state, action) => {
            state.error = action.error
        },
        [authRegister.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [authRegister.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})

const { reducer: authReducer } = authSlice
export default authReducer