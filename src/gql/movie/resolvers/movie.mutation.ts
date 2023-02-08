import createMovie from "../../../services/movie/createMovie";
import { GraphQLFieldResolver, GraphQLError } from "graphql";
import Movie from "../../../db/models/movie.model";
import modifyMovie from "../../../services/movie/modifyMovie";
import removeMovie from "../../../services/movie/removeMovie";

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

const updateMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  param
): Promise<Movie | null> => {
  try {
    return await modifyMovie(param.id, param.update);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const deleteMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<string> => {
  try {
    return await removeMovie(id);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Mutation: {
    addMovie,
    updateMovie,
    deleteMovie,
  },
};
