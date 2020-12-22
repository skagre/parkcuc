import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import conversationApi from 'api/conversationApi'
import userApi from 'api/userApi'
import messageApi from 'api/messageApi'


export const fetchConversationListsAPI = createAsyncThunk('conversation/fetchConversationLists', async (params, thunkAPI) => {
    return await conversationApi.fetchConversationLists({ params })
})


export const fetchMessagesAPI = createAsyncThunk('message/fetchMessages', async (params, thunkAPI) => {
    return await messageApi.fetchMessages({ params })
})


export const findFriendAPI = createAsyncThunk('user/findFriendAPI', async (params, thunkAPI) => {
    return await userApi.findFriend({ params })
})
export const uploadAvatarAPI = createAsyncThunk('user/uploadAvatarAPI', async (params, thunkAPI) => {
    return await userApi.uploadAvatar({ params })
})
export const fetchUserInfoAPI = createAsyncThunk('user/fetchUserInfoAPI', async (params, thunkAPI) => {
    return await userApi.fetchUserInfo()
})
export const fetchFriendListsAPI = createAsyncThunk('user/fetchFriendLists', async (params, thunkAPI) => {
    return await userApi.fetchFriendLists({ params })
})
export const fetchSentRequestsAPI = createAsyncThunk('user/fetchSentRequests', async (params, thunkAPI) => {
    return await userApi.fetchSentRequests({ params })
})
export const fetchPendingRequestsAPI = createAsyncThunk('user/fetchPendingRequests', async (params, thunkAPI) => {
    return await userApi.fetchPendingRequests({ params })
})
export const unfriendAPI = createAsyncThunk('user/unfriend', async (params, thunkAPI) => {
    return await userApi.unfriend({ params })
})
export const deleteFriendRequestAPI = createAsyncThunk('user/deleteFriendRequest', async (params, thunkAPI) => {
    return await userApi.deleteFriendRequest({ params })
})
export const sendFriendRequestAPI = createAsyncThunk('user/sendFriendRequest', async (params, thunkAPI) => {
    return await userApi.sendFriendRequest({ params })
})
export const acceptFriendRequestAPI = createAsyncThunk('user/acceptFriendRequest', async (params, thunkAPI) => {
    return await userApi.acceptFriendRequest({ params })
})


const parkcucSlice = createSlice({
    name: 'parkcuc',
    initialState: {},
    reducers: {
        activeConversationInfo: (state, action) => {
            state.activeConversationInfo = action.payload
        }
    },
    extraReducers: {
        [fetchConversationListsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchConversationListsAPI.fulfilled]: (state, action) => {
            state.conversationLists = action.payload
            state.loading = false
        },

        [fetchMessagesAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchMessagesAPI.fulfilled]: (state, action) => {
            state.messageLists = action.payload
            state.loading = false
        },

        [findFriendAPI.pending]: (state, action) => {
            state.loading = true
        },
        [findFriendAPI.fulfilled]: (state, action) => {
            state.findFriend = action.payload
            state.loading = false
        },

        [uploadAvatarAPI.pending]: (state, action) => {
            state.loading = true
        },
        [uploadAvatarAPI.fulfilled]: (state, action) => {
            state.imgUrl = action.payload
            state.loading = false
        },

        [fetchUserInfoAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchUserInfoAPI.fulfilled]: (state, action) => {
            state.UserInfo = action.payload
            state.loading = false
        },

        [fetchFriendListsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchFriendListsAPI.fulfilled]: (state, action) => {
            state.friendLists = action.payload
            state.loading = false
        },

        [fetchSentRequestsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchSentRequestsAPI.fulfilled]: (state, action) => {
            state.sentRequests = action.payload
            state.loading = false
        },

        [fetchPendingRequestsAPI.pending]: (state, action) => {
            state.loading = true
        },
        [fetchPendingRequestsAPI.fulfilled]: (state, action) => {
            state.pendingRequests = action.payload
            state.loading = false
        },

        [unfriendAPI.pending]: (state, action) => {
            state.loading = true
        },
        [unfriendAPI.fulfilled]: (state, action) => {
            state.loading = false
        },

        [deleteFriendRequestAPI.pending]: (state, action) => {
            state.loading = true
        },
        [deleteFriendRequestAPI.fulfilled]: (state, action) => {
            state.loading = false
        },

        [sendFriendRequestAPI.pending]: (state, action) => {
            state.loading = true
        },
        [sendFriendRequestAPI.fulfilled]: (state, action) => {
            state.loading = false
        },

        [acceptFriendRequestAPI.pending]: (state, action) => {
            state.loading = true
        },
        [acceptFriendRequestAPI.fulfilled]: (state, action) => {
            state.loading = false
        }
    }
})

const { reducer: parkcucReducer, actions } = parkcucSlice
export const { activeConversationInfo } = actions
export default parkcucReducer