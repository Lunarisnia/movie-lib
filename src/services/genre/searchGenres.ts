import { Op } from "sequelize";
import Genre from "../../db/models/genre.model";
import fetchAllGenres from "./fetchAllGenres";

// TODO: add includeRelations
export default async (
  ids: string[]
): Promise<{
  rows: Genre[];
  count: number;
}> => {
  return await fetchAllGenres({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};
