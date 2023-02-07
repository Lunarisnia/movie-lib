import { FindAndCountOptions } from "sequelize";
import Genre from "../../db/models/genre.model";

// TODO: refact all to find and count all
export default async (
  query: FindAndCountOptions = {}
): Promise<{
  rows: Genre[];
  count: number;
}> => {
  return Genre.findAndCountAll(query);
};
