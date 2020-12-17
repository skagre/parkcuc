import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from 'features/Auth/authSlice'
import parkcucReducer from 'features/Parkcuc/parkcucSlice'
import authMiddleware from 'middlewares/auth'

const rootReducer = {
    auth: authReducer,
    parkcuc: parkcucReducer
}

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]
})

export default store