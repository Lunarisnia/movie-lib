import Actor from "../../db/models/actor.model";
import generateQuery from "../utils/generateQuery";
import { actorRelationOptions } from "./fetchAllActors";

export default async (
  actorId: string | number,
  includeRelations?: boolean
): Promise<Actor | null> => {
  const finalQuery = generateQuery({}, actorRelationOptions, includeRelations);
  return await Actor.findByPk(actorId, finalQuery);
};
