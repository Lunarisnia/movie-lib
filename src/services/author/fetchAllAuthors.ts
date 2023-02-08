import Author from "../../db/models/author.model";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";
import Gender from "../../db/models/gender.model";
import Actor from "../../db/models/actor.model";
import Genre from "../../db/models/genre.model";
import { FindAndCountOptions } from "sequelize";
import generateQuery from "../utils/generateQuery";

export const authorRelationOptions = {
  include: [
    Gender,
    {
      model: Movie,
      include: [AgeRating, Genre, { model: Actor, include: [Gender] }],
    },
  ],
};

export default async (
  query: FindAndCountOptions = {},
  includeRelations?: boolean
): Promise<{
  rows: Author[];
  count: number;
}> => {
  let finalQuery = generateQuery(
    query,
    authorRelationOptions,
    includeRelations
  );
  return await Author.findAndCountAll(finalQuery);
};
