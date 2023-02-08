import { GraphQLFieldResolver, GraphQLError } from "graphql";
import createActor from "../../../services/actor/createActor";
import Actor from "../../../db/models/actor.model";
import modifyActor from "../../../services/actor/modifyActor";
import removeActor from "../../../services/actor/removeActor";

const addActor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { params: newMovieParams }
): Promise<Actor | null> => {
  try {
    const newActor = await createActor(newMovieParams);
    return newActor;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const updateActor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  param
): Promise<Actor | null> => {
  try {
    return await modifyActor(param.id, param.update);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const deleteActor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<string> => {
  try {
    return await removeActor(id);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Mutation: {
    addActor,
    updateActor,
    deleteActor,
  },
};
