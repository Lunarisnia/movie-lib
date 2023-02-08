import Author from "../../db/models/author.model";
import { Op } from "sequelize";
import fetchAllAuthors from "./fetchAllAuthors";

// TODO: add includeRelations
export default async (
  ids: string[]
): Promise<{
  rows: Author[];
  count: number;
}> => {
  return await fetchAllAuthors({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};
