import { GraphQLError, GraphQLFieldResolver } from "graphql";
import fetchAllActors from "../../../services/actor/fetchAllActors";
import Actor from "../../../db/models/actor.model";
import fetchActor from "../../../services/actor/fetchActor";

const actors: GraphQLFieldResolver<any, any, any, any> = async (
  _
): Promise<Actor[]> => {
  try {
    const actors = await fetchAllActors({}, true);
    return actors.rows;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
const actor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<Actor | null> => {
  try {
    const actor = await fetchActor(id, true);
    return actor;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Query: {
    actors,
    actor,
  },
};
