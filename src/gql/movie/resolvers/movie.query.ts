import { GraphQLFieldResolver, GraphQLError } from "graphql";
import fetchAllMovies from "../../../services/movie/fetchAllMovies";
import Movie from "../../../db/models/movie.model";
import fetchMovie from "../../../services/movie/fetchMovie";

const movies: GraphQLFieldResolver<any, any, any, any> = async (
  _
): Promise<Movie[]> => {
  try {
    const movies = await fetchAllMovies({}, true);
    return movies.rows;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
const movie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  param
): Promise<Movie | null> => {
  try {
    const movie = await fetchMovie(param.id, true);
    return movie;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Query: {
    movies,
    movie,
  },
};
