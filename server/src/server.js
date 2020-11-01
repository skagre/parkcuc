const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')

const Event = require('./models/Event')

const app = express()

app.use(express.json())


app.use('/api', graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find()
                .then(events => {
                    return events
                }).catch(err => {
                    throw err
                })
        },
        createEvent: (args) => {
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price
            })
            return event
                .save()
                .then(result => {
                    return result
                })  
                .catch(err => {
                    throw err
                })
        }
    },
    graphiql: true
}))


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = app