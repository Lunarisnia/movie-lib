import { GraphQLFieldResolver } from "graphql";
import fetchAllMovies from "../../../services/movie/fetchAllMovies";
import Movie from "../../../db/models/movie.model";

const movies: GraphQLFieldResolver<any, any, any, any> = async (
  _
): Promise<Movie[]> => {
  const movies = await fetchAllMovies();
  return movies.rows;
};

export default {
  Query: {
    movies,
  },
};
