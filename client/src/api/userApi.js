import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const userApi = {
    fetchUserInfo: () => {
        const data = {
            query: 
            `query { 
                fetchUserInfo {
                    _id
                    name
                    email
                    username
                    avatar
                }
            }`,
            variables: {}
        }
        return axiosClient.post(url, data)
    },
    uploadAvatar: ({ params }) => {
        const data = params
        return axiosClient.post(process.env.REACT_APP_UPLOAD_URL, data)
    },
    fetchFriendLists: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchFriendLists($limit: Int, $offset: Int) {
                fetchFriendLists(limit: $limit, offset: $offset) {
                    _id
                    name
                    email
                }
            }`,
            variables: {
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    },
    fetchSentRequests: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchSentRequests($limit: Int, $offset: Int) {
                fetchSentRequests(limit: $limit, offset: $offset) {
                    _id
                    name
                    email
                }
            }`,
            variables: {
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    },
    fetchPendingRequests: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchPendingRequests($limit: Int, $offset: Int) {
                fetchPendingRequests(limit: $limit, offset: $offset) {
                    _id
                    name
                    email
                }
            }`,
            variables: {
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    },
    unfriend: ({ params }) => {
        const data = {
            query: 
            `mutation unfriend($user_id: String!) {
                unfriend(user_id: $user_id)
            }`,
            variables: {
                user_id: params.user_id
            }
        }
        return axiosClient.post(url, data)
    },
}

export default userApi