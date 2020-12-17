import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import conversationApi from 'api/conversationApi'
import userApi from 'api/userApi'

export const fetchConversationListsAPI = createAsyncThunk('conversation/fetchConversationLists', async (params, thunkAPI) => {
    return await conversationApi.fetchConversationLists({ params })
})

export const fetchFriendListsAPI = createAsyncThunk('user/fetchFriendLists', async (params, thunkAPI) => {
    return await userApi.fetchFriendLists({ params })
})

export const unfriendAPI = createAsyncThunk('user/unfriend', async (params, thunkAPI) => {
    return await userApi.unfriend({ params })
})

const parkcucSlice = createSlice({
    name: 'parkcuc',
    initialState: {},
    reducers: {},
    extraReducers: {
        [fetchConversationListsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchConversationListsAPI.fulfilled]: (state, action) => {
            state.conversationLists = action.payload
            state.loading = false
        },

        [fetchFriendListsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchFriendListsAPI.fulfilled]: (state, action) => {
            state.friendLists = action.payload
            state.loading = false
        },

        [unfriendAPI.pending]: (state, action) => {
            state.loading = true
        },
        [unfriendAPI.fulfilled]: (state, action) => {
            state.loading = false
        }
    }
})

const { reducer: parkcucReducer } = parkcucSlice
export default parkcucReducer