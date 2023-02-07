import Actor from "../../db/models/actor.model";
import { FindAndCountOptions } from "sequelize";

export default async (
  query: FindAndCountOptions = {}
): Promise<{
  rows: Actor[];
  count: number;
}> => {
  return await Actor.findAndCountAll(query);
};
