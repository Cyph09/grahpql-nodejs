const { GraphQLServer } = require ('graphql-yoga')
const { PrismaClient }  = require('@prisma/client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

const prisma = new PrismaClient();

const server = new GraphQLServer ({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return{
            ...request,
            prisma
        }
    }
})
server.start(() => console.log(`Server is running on port 4000`))