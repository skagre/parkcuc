const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type User {
        _id: ID
        name: String
        email: String
        avatar: String
        password: String
        username: String
    }

    type Auth {
        user_id: ID
        avatar: String
        token: String
    }

    type MessageLists {
        conversation: String
        data: [Message]
    }

    type Message {
        _id: ID
        sender: String
        body: String
        unsend: String
        attachments: [Attachment]
        createdAt: String
    }

    type Attachment {
        _id: ID
        name: String
        size: Int
        type: String
    }

    type Conversation {
        _id: ID
        name: String
        conversation_type: String
        participants: [Friend]
    }

    type FriendLists {
        count: Int,
        data: [Friend]
    }

    type Friend {
        _id: ID
        name: String
        email: String
        avatar: String
        status: String
    }

    type RootQuery {
        fetchUserInfo: User
        fetchMessages(user_id: String!, offset: Int, limit: Int): MessageLists
        fetchConversationLists(offset: Int, limit: Int): [Conversation]

        fetchFriendLists(offset: Int, limit: Int): FriendLists
        fetchPendingRequests(offset: Int, limit: Int): FriendLists
        fetchSentRequests(offset: Int, limit: Int): FriendLists

        findFriend(search: String!, offset: Int, limit: Int): [Friend]

        init: String
    }

    type RootMutation {
        register(name: String!, email: String!, password: String!): User
        login(emailOrSomething: String!, password: String!): Auth
        logout: String
        logoutAll: String
        imStatus: Boolean!
        sendFriendRequest(user_id: String!): String
        acceptFriendRequest(user_id: String!): String
        deleteFriendRequest(user_id: String!): String
        unfriend(user_id: String!): String

        

        createConversation(participant_id: [String!]): Conversation


        sendMessage(conversation_id: String!, body: String!): Message
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)