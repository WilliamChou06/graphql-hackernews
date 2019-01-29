const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const _ = require('lodash');

const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const Link = require('./resolvers/Link');
const Query = require('./resolvers/Query');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');


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
  Subscription,
  User,
  Link,
  Vote
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
