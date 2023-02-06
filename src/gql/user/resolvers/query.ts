import fetchAllUsers from "../../../services/user/fetchAllUsers";
import { GraphQLFieldResolver } from "graphql";
import fetchUser from "../../../services/user/fetchUser";
import User from "../../../db/models/user.model";

const users: GraphQLFieldResolver<any, any, any, any> = async (
  source,
  args,
  context,
  info
): Promise<User[]> => {
  return await fetchAllUsers();
};
const user: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<User | null> => {
  return await fetchUser(id);
};

export default {
  Query: {
    users,
    user,
  },
};
