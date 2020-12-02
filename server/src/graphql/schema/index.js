const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type User {
        _id: ID
        name: String
        email: String
        password: String
        username: String
    }

    type Auth {
        user_id: ID
        token: String
    }

    type Message {
        _id: ID
        conversation: String
        sender: String
        body: String
    }

    type RootQuery {
        fetchMessage(conversation_id: String!): [Message]
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
        fetchFriendList: String

        createConversation(user_id: String!): String


        sendMessage(conversation_id: String!, body: String!): Message

        
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)