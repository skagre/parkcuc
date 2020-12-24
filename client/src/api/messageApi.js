import axiosClient from './axiosClient'


const url = process.env.REACT_APP_API_URL
const messageApi = {
    fetchMessages: ({ params }) => {
        const { limit = 20, offset = 0, user_id } = params
        const data = {
            query: 
            `query fetchMessages($user_id: String!, $limit: Int, $offset: Int) {
                fetchMessages(user_id: $user_id, limit: $limit, offset: $offset) {
                    conversation
                    data {
                        _id
                        sender
                        body
                        unsend
                        attachment
                        mimetype_attachment
                        createdAt
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
    sendMessage: ({ params }) => {
        const data = {
            query: 
            `mutation sendMessage($conversation_id: String!, $body: String, $attachment: String, $mimetype_attachment: String) {
                sendMessage(conversation_id: $conversation_id, body: $body, attachment: $attachment, mimetype_attachment: $mimetype_attachment) {
                    _id
                    sender
                    body
                    unsend
                    attachment
                    mimetype_attachment
                    createdAt
                }
            }`,
            variables: {
                conversation_id: params.conversation_id,
                body: params.body,
                attachment: params.attachment,
                mimetype_attachment: params.mimetype_attachment
            }
        }
        return axiosClient.post(url, data)
    },
    uploadAttachment: ({ params }) => {
        const data = params
        return axiosClient.post(process.env.REACT_APP_UPLOAD_URL + '/attachment', data)
    },
}

export default messageApi