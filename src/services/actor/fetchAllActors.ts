import Actor from "../../db/models/actor.model";
import { FindAndCountOptions, IncludeOptions } from "sequelize";
import generateQuery from "../utils/generateQuery";
import Gender from "../../db/models/gender.model";
import Movie from "../../db/models/movie.model";
import Genre from "../../db/models/genre.model";
import Author from "../../db/models/author.model";

export const actorRelationOptions: IncludeOptions = {
  include: [
    Gender,
    { model: Movie, include: [Genre, { model: Author, include: [Gender] }] },
  ],
};

export default async (
  query: FindAndCountOptions,
  includeRelations?: boolean
): Promise<{
  rows: Actor[];
  count: number;
}> => {
  const finalQuery = generateQuery(
    query,
    actorRelationOptions,
    includeRelations
  );
  return await Actor.findAndCountAll(finalQuery);
};
