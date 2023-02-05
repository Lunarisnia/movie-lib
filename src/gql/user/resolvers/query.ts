import fetchAllUsers from "../../../services/user/fetchAllUsers";
import { GraphQLFieldResolver } from "graphql";
import fetchUser from "../../../services/user/fetchUser";

const users: GraphQLFieldResolver<any, any, any, any> = async (
  source,
  args,
  context,
  info
) => {
  return await fetchAllUsers();
};
const user: GraphQLFieldResolver<any, any, any, any> = async (_, { id }) => {
  return await fetchUser(id);
};

export default {
  Query: {
    users,
    user,
  },
};
