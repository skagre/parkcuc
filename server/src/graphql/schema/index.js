const { buildSchema } = require('graphql')


module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
        username: String
    }

    type Auth {
        user_id: ID!
        token: String!
    }

    input UserInput {
        name: String!
        email: String!
        password: String
    }

    type RootQuery {
        users: [User]!
    }

    type RootMutation {
        register(input: UserInput): User
        login(emailOrSomething: String!, password: String!): Auth
        logout: String
        logoutAll: String
        addFriend(id: String!): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)