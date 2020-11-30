import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import authMiddleware from 'middlewares/auth'

const rootReducer = {
    auth: authReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware(), authMiddleware]
})

export default store