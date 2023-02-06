import { GraphQLFieldResolver } from "graphql";

interface WelcomeMessage {
  message: string;
}

const welcome: GraphQLFieldResolver<
  any,
  any,
  any,
  any
> = (): WelcomeMessage => {
  return { message: "Hello!, Welcome to the GraphQL API." };
};

export default {
  Query: {
    welcome,
  },
};
