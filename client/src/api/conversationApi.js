import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const conversationApi = {
    fetchConversationLists: ({ params }) => {
        const { limit = 20, offset = 0 } = params
        const data = {
            query: 
            `query fetchConversationLists($limit: Int, $offset: Int) {
                fetchConversationLists(limit: $limit, offset: $offset) {
                    conversation {
                        _id
                        name
                        conversation_type
                        emoji
                        blocker
                        contact {
                            _id
                            name
                            email
                            avatar
                            status
                        }
                    }
                    lastMessage {
                        _id
                        sender
                        body
                        unsend
                        attachments {
                            id
                        }
                        createdAt
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