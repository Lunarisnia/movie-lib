import createUser from "../../../services/user/createUser";
import modifyUser from "../../../services/user/modifyUser";
import removeUser from "../../../services/user/removeUser";
import { GraphQLFieldResolver } from "graphql";

const addUser: GraphQLFieldResolver<any, any, any, any> = async (
  source,
  { params: { name } },
  context,
  info
) => {
  return await createUser(name);
};
const updateUser: GraphQLFieldResolver<any, any, any, any> = async (
  source,
  { params: { id, name } },
  context,
  info
) => {
  return await modifyUser(id, name);
};
const deleteUser: GraphQLFieldResolver<any, any, any, any> = async (
  source,
  { params: { id } },
  context,
  info
) => {
  return await removeUser(id);
};

export default {
  Mutation: {
    addUser,
    updateUser,
    deleteUser,
  },
};
