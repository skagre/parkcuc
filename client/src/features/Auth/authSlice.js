import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from 'api/authApi'


export const authLogin = createAsyncThunk('authLogin', async (params, thunkAPI) => {
    return await authApi.login({ params })
})

export const authRegister = createAsyncThunk('authRegister', async (params, thunkAPI) => {
    return await authApi.register({ params })
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
        error: ''
    },
    reducers: {},
    extraReducers: {
        [authLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        },
        [authLogin.rejected]: (state, action) => {
            state.error = action.error
        },
        [authRegister.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        },
        [authRegister.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})

const { reducer: authReducer } = authSlice
export default authReducer