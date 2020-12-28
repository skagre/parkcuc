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
                        createdAt
                        attachments {
                            fieldname
                            originalname
                            encoding
                            mimetype
                            id
                            filename
                            metadata
                            bucketName
                            chunkSize
                            size
                            md5
                            uploadDate
                            contentType
                        }
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
            `mutation sendMessage($conversation_id: String!, $body: String) {
                sendMessage(conversation_id: $conversation_id, body: $body) {
                    _id
                    sender
                    body
                    unsend
                    createdAt
                }
            }`,
            variables: {
                conversation_id: params.conversation_id,
                body: params.body
            }
        }
        return axiosClient.post(url, data)
    },
    uploadAttachments: ({ params }) => {
        const data = params
        return axiosClient.post(process.env.REACT_APP_UPLOAD_URL + '/attachments', data)
    },
    fetchAttachments: ({ params }) => {
        const { limit = 20, offset = 0, user_id } = params
        const data = {
            query: 
            `query fetchAttachments($user_id: String!, $limit: Int, $offset: Int) {
                fetchAttachments(user_id: $user_id, limit: $limit, offset: $offset) {
                    fieldname
                    originalname
                    encoding
                    mimetype
                    id
                    filename
                    metadata
                    bucketName
                    chunkSize
                    size
                    md5
                    uploadDate
                    contentType
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
    unsendMessage: ({ params }) => {
        const data = {
            query: 
            `mutation unsendMessage($message_id: String!, $type: String!) {
                unsendMessage(message_id: $message_id, type: $type) {
                    _id
                    sender
                    body
                    unsend
                    createdAt 
                    attachments {
                        fieldname
                        originalname
                        encoding
                        mimetype
                        id
                        filename
                        metadata
                        bucketName
                        chunkSize
                        size
                        md5
                        uploadDate
                        contentType
                    }
                }
            }`,
            variables: {
                message_id: params.message_id,
                type: params.type
            }
        }
        return axiosClient.post(url, data)
    },
}

export default messageApi