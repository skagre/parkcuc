import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from 'api/authApi'


const login = createAsyncThunk('auth/login', async (params, thunkAPI) => {
    return await authApi.login(params)
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: {},
        error: ''
    },
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        },
        [login.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})

const { reducers: authReducer } = authSlice
export default authReducer