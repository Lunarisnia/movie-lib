import Genre from "../../db/models/genre.model";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";
import Actor from "../../db/models/actor.model";
import Gender from "../../db/models/gender.model";
import Author from "../../db/models/author.model";
import { FindAndCountOptions } from "sequelize";
import generateQuery from "../utils/generateQuery";

export const movieRelationOptions = {
  include: [
    AgeRating,
    Genre,
    {
      model: Actor,
      include: [Gender],
    },
    {
      model: Author,
      include: [Gender],
    },
  ],
};

export default async (
  query: FindAndCountOptions,
  includeRelation?: boolean
): Promise<{
  rows: Movie[];
  count: number;
}> => {
  const finalQuery = generateQuery(
    query,
    movieRelationOptions,
    includeRelation
  );
  return await Movie.findAndCountAll(finalQuery);
};
