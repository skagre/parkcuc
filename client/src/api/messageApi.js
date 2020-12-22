import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const messageApi = {
    fetchMessages: ({ params }) => {
        const { limit = 20, offset = 0, user_id } = params
        const data = {
            query: 
            `query fetchMessages($user_id: String!, $limit: Int, $offset: Int) {
                fetchMessages(user_id: $user_id, limit: $limit, offset: $offset) {
                    _id
                    conversation
                    sender
                    body
                    createdAt
                    attachments {
                        _id
                        name
                        size
                        type
                    }
                }
            }`,
            variables: {
                user_id: user_id,
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    },
    
}

export default messageApi