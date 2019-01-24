const { GraphQLServer } = require('graphql-yoga');
const _ = require('lodash');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the GraphQL API for HackerNews`,
    feed: () => links,
    link: (parents, { id }) => {
      return _.find(links, { id });
    }
  },
  Mutation: {
    post: (parent, { description, url }) => {
      const link = {
        id: `link-${idCount++}`,
        description,
        url
      };
      links.push(link);
      return link;
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
  resolvers
});

server.start(() =>
  console.log(`HackerNews GraphQL server has started at port 4000`)
);
