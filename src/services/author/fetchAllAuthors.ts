import Author from "../../db/models/author.model";
import { FindAndCountOptions } from "sequelize";

export default async (
  query: FindAndCountOptions
): Promise<{
  rows: Author[];
  count: number;
}> => {
  return await Author.findAndCountAll(query);
};
