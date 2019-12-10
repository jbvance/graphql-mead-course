import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import User from './resolvers/User';
import Post from './resolvers/Post';
import Comment from './resolvers/Comment';
import prisma from './prisma';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
};

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
    pubsub,
    prisma
  }
});

server.start((deets) => {
  console.log('The server is up', deets);
});
