const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client')
const _ = require('lodash');

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
  Query: {
    info: () => `This is the GraphQL API for HackerNews`,
    feed: (root, args, context, info) => context.prisma.links(),
    link: (parents, { id }) => {
      return _.find(links, { id });
    }
  },
  Mutation: {
    post: (root, { description, url }, context) => {
      // const link = {
      //   id: `link-${idCount++}`,
      //   description,
      //   url
      // };
      // links.push(link);
      // return link;
      return context.prisma.createLink({
        url,
        description
      })
    },
    updateLink: (parent, { id, description, url }) => {
      const link = {
        id,
        description,
        url
      };
      let index = _.findIndex(links, { id });
      links.splice(index, 1, link);
      return link;
    },
    deleteLink: (parent, { id }) => {
      let link = _.find(links, { id });
      let index = _.findIndex(links, { id });
      links.splice(index, 1);
      return link;
    }
  }

  // Link: {
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma
    }
  }
});

server.start(() =>
  console.log(`HackerNews GraphQL server has started at port 4000`)
);
