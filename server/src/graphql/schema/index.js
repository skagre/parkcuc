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
        userID: ID!
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
        login(email: String!, password: String!): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)