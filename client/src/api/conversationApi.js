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
    },
    changeEmoji: ({ params }) => {
        const data = {
            query: 
            `mutation changeEmoji($conversation_id: String!, $emoji: String!) {
                changeEmoji(conversation_id: $conversation_id, emoji: $emoji) {
                    _id
                    name
                    conversation_type
                    emoji
                    blocker
                }
            }`,
            variables: {
                conversation_id: params.conversation_id,
                emoji: params.emoji
            }
        }
        return axiosClient.post(url, data)
    },
    blockMessages: ({ params }) => {
        const data = {
            query: 
            `mutation blockMessages($conversation_id: String!) {
                blockMessages(conversation_id: $conversation_id) {
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
            }`,
            variables: {
                conversation_id: params.conversation_id
            }
        }
        return axiosClient.post(url, data)
    },
    unblockMessages: ({ params }) => {
        const data = {
            query: 
            `mutation unblockMessages($conversation_id: String!) {
                unblockMessages(conversation_id: $conversation_id) {
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
            }`,
            variables: {
                conversation_id: params.conversation_id
            }
        }
        return axiosClient.post(url, data)
    },
    fetchConversationInfo: ({ params }) => {
        const data = {
            query: 
            `query fetchConversationInfo($user_id: String!) {
                fetchConversationInfo(user_id: $user_id) {
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
            }`,
            variables: {
                user_id: params.user_id
            }
        }
        return axiosClient.post(url, data)
    },
    createConversation: ({ params }) => {
        const data = {
            query: 
            `mutation createConversation($participant_id: [String!]) {
                createConversation(participant_id: $participant_id) {
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
            }`,
            variables: {
                participant_id: params.participant_id
            }
        }
        return axiosClient.post(url, data)
    }
}

export default conversationApi