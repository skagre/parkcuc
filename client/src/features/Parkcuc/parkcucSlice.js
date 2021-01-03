import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import conversationApi from 'api/conversationApi'
import userApi from 'api/userApi'
import messageApi from 'api/messageApi'


export const fetchConversationListsAPI = createAsyncThunk('conversation/fetchConversationLists', async (params, thunkAPI) => {
    return await conversationApi.fetchConversationLists({ params })
})
export const changeEmojiAPI = createAsyncThunk('conversation/changeEmoji', async (params, thunkAPI) => {
    return await conversationApi.changeEmoji({ params })
})


export const fetchMessagesAPI = createAsyncThunk('message/fetchMessages', async (params, thunkAPI) => {
    return await messageApi.fetchMessages({ params })
})
export const sendMessageAPI = createAsyncThunk('message/sendMessage', async (params, thunkAPI) => {
    return await messageApi.sendMessage({ params })
})
export const uploadAttachmentsAPI = createAsyncThunk('message/uploadAttachmentsAPI', async (params, thunkAPI) => {
    return await messageApi.uploadAttachments({ params })
})
export const fetchAttachmentsAPI = createAsyncThunk('message/fetchAttachments', async (params, thunkAPI) => {
    return await messageApi.fetchAttachments({ params })
})
export const unsendMessageAPI = createAsyncThunk('message/unsendMessage', async (params, thunkAPI) => {
    return await messageApi.unsendMessage({ params })
})


export const findFriendAPI = createAsyncThunk('user/findFriendAPI', async (params, thunkAPI) => {
    return await userApi.findFriend({ params })
})
export const uploadAvatarAPI = createAsyncThunk('user/uploadAvatarAPI', async (params, thunkAPI) => {
    return await userApi.uploadAvatar({ params })
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
        },
        activeConversationID: (state, action) => {
            state.activeConversationID = action.payload
        },
        rerenderAttachments: (state, action) => {
            state.rerenderAttachments = action.payload
        }
    },
    extraReducers: {
        [fetchConversationListsAPI.pending]: (state, action) => {
            state.loadingFetchConversationLists = true
        },
        [fetchConversationListsAPI.fulfilled]: (state, action) => {
            state.conversationLists = action.payload
            state.loadingFetchConversationLists = false
        },

        [changeEmojiAPI.fulfilled]: (state, action) => {
            state.changeEmoji = action.payload
        },

        [fetchMessagesAPI.pending]: (state, action) => {
            state.loadingFetchMessages = true
        },
        [fetchMessagesAPI.fulfilled]: (state, action) => {
            state.messageLists = action.payload
            state.loadingFetchMessages = false
        },

        [sendMessageAPI.fulfilled]: (state, action) => {
            state.newMessage = action.payload
        },

        [fetchAttachmentsAPI.pending]: (state, action) => {
            state.loadingFetchAttachments = true
        },
        [fetchAttachmentsAPI.fulfilled]: (state, action) => {
            state.attachmentLists = action.payload
            state.loadingFetchAttachments = false
        },

        [uploadAttachmentsAPI.pending]: (state, action) => {
            state.loadingUploadAttachments = true
        },
        [uploadAttachmentsAPI.fulfilled]: (state, action) => {
            state.attachments = action.payload
            state.loadingUploadAttachments = false
        },

        [findFriendAPI.pending]: (state, action) => {
            state.loadingFindFriend = true
        },
        [findFriendAPI.fulfilled]: (state, action) => {
            state.findFriend = action.payload
            state.loadingFindFriend = false
        },

        [uploadAvatarAPI.pending]: (state, action) => {
            state.loadingUploadAvatar = true
        },
        [uploadAvatarAPI.fulfilled]: (state, action) => {
            state.imgUrl = action.payload.file.filename
            state.loadingUploadAvatar = false
        },

        [fetchFriendListsAPI.pending]: (state, action) => {
            state.loadingFetchFriendLists = true
        },
        [fetchFriendListsAPI.fulfilled]: (state, action) => {
            state.friendLists = action.payload
            state.loadingFetchFriendLists = false
        },

        [fetchSentRequestsAPI.pending]: (state, action) => {
            state.loadingFetchSentRequests = true
        },
        [fetchSentRequestsAPI.fulfilled]: (state, action) => {
            state.sentRequests = action.payload
            state.loadingFetchSentRequests = false
        },

        [fetchPendingRequestsAPI.pending]: (state, action) => {
            state.loadingFetchPendingRequests = true
        },
        [fetchPendingRequestsAPI.fulfilled]: (state, action) => {
            state.pendingRequests = action.payload
            state.loadingFetchPendingRequests = false
        }
    }
})

const { reducer: parkcucReducer, actions } = parkcucSlice
export const { activeConversationInfo, activeConversationID, rerenderAttachments } = actions
export default parkcucReducer