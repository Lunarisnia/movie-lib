import { Op } from "sequelize";
import Actor from "../../db/models/actor.model";
import fetchAllActors from "./fetchAllActors";

export default async (
  ids: string[]
): Promise<{
  rows: Actor[];
  count: number;
}> => {
  return await fetchAllActors({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};
