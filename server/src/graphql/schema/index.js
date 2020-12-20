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

    type Message {
        _id: ID
        conversation: String
        sender: String
        body: String
    }

    type Conversation {
        _id: ID
        name: String
        conversation_type: String
        participants: [Friend]
    }

    type List {
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
        fetchMessage(conversation_id: String!): [Message]
        fetchConversationLists(offset: Int, limit: Int): [Conversation]

        fetchFriendLists(offset: Int, limit: Int): List
        fetchPendingRequests(offset: Int, limit: Int): List
        fetchSentRequests(offset: Int, limit: Int): List

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