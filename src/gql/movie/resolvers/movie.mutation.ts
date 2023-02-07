import createMovie from "../../../services/movie/createMovie";
import { GraphQLFieldResolver, GraphQLError } from "graphql";
import Movie from "../../../db/models/movie.model";

const addMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { params: newMovieParams }
): Promise<Movie | null> => {
  try {
    const newMovie = await createMovie(newMovieParams);
    return newMovie;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Mutation: {
    addMovie,
  },
};
