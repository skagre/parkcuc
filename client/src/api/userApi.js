import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const userApi = {
    uploadAvatar: ({ params }) => {
        const data = params
        return axiosClient.post(process.env.REACT_APP_UPLOAD_URL + '/avatar', data)
    },
    fetchFriendLists: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchFriendLists($limit: Int, $offset: Int) {
                fetchFriendLists(limit: $limit, offset: $offset) {
                    count
                    data {
                        _id
                        name
                        email
                        avatar
                    }
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
                    count
                    data {
                        _id
                        name
                        email
                        avatar
                    }
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
                    count
                    data {
                        _id
                        name
                        email
                        avatar
                    }
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
    deleteFriendRequest: ({ params }) => {
        const data = {
            query: 
            `mutation deleteFriendRequest($user_id: String!) {
                deleteFriendRequest(user_id: $user_id)
            }`,
            variables: {
                user_id: params.user_id
            }
        }
        return axiosClient.post(url, data)
    },
    findFriend: ({ params }) => {
        const { limit = 20, offset = 0, search } = params
        const data = {
            query: 
            `query findFriend($search: String!, $limit: Int, $offset: Int) {
                findFriend(search: $search, limit: $limit, offset: $offset) {
                    _id
                    name
                    email
                    avatar
                    status
                }
            }`,
            variables: {
                search: search,
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    },
    sendFriendRequest: ({ params }) => {
        const data = {
            query: 
            `mutation sendFriendRequest($user_id: String!) {
                sendFriendRequest(user_id: $user_id)
            }`,
            variables: {
                user_id: params.user_id
            }
        }
        return axiosClient.post(url, data)
    },
    acceptFriendRequest: ({ params }) => {
        const data = {
            query: 
            `mutation acceptFriendRequest($user_id: String!) {
                acceptFriendRequest(user_id: $user_id)
            }`,
            variables: {
                user_id: params.user_id
            }
        }
        return axiosClient.post(url, data)
    },
    logout: () => {
        const data = {
            query: 
            `mutation logout {
                logout
            }`,
            variables: {}
        }
        return axiosClient.post(url, data)
    },
}

export default userApi