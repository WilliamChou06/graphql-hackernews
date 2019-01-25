const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const _ = require('lodash');

const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const Query = require('./resolvers/Query');
const User = require('./resolvers/User');

// yarn global add prisma
// Remember to install prisma

// let links = [
//   {
//     id: 'link-0',
//     url: 'www.howtographql.com',
//     description: 'Fullstack tutorial for GraphQL'
//   }
// ];

// let idCount = links.length;

const resolvers = {
  Query,
  Mutation,
  User,
  Link
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
})

server.start(() =>
  console.log(`HackerNews GraphQL server has started at port 4000`)
);
