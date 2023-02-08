import Movie from "../../db/models/movie.model";
import generateQuery from "../utils/generateQuery";
import { movieRelationOptions } from "./fetchAllMovies";

export default async (
  movieId: string,
  includeRelations?: boolean
): Promise<Movie | null> => {
  const finalQuery = generateQuery({}, movieRelationOptions, includeRelations);
  return await Movie.findByPk(movieId, finalQuery);
};
