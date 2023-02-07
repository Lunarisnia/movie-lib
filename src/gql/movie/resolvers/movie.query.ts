import { GraphQLFieldResolver } from "graphql";
import fetchAllMovies from "../../../services/movie/fetchAllMovies";
import Movie from "../../../db/models/movie.model";
import fetchMovie from "../../../services/movie/fetchMovie";

const movies: GraphQLFieldResolver<any, any, any, any> = async (
  _
): Promise<Movie[]> => {
  const movies = await fetchAllMovies();
  return movies.rows;
};
const movie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  param
): Promise<Movie | null> => {
  const movie = await fetchMovie(param.id);
  return movie;
};

export default {
  Query: {
    movies,
    movie,
  },
};
