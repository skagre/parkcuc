import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const conversationApi = {
    fetchConversationLists: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchConversationLists($limit: Int, $offset: Int) {
                fetchConversationLists(limit: $limit, offset: $offset) {
                    _id
                    name
                    conversation_type
                    participants {
                        _id
                        name
                        email
                    }
                }
            }`,
            variables: {
                limit: limit,
                offset: offset
            }
        }
        return axiosClient.post(url, data)
    }
}

export default conversationApi