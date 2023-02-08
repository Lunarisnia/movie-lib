import createMovie from "../../../services/movie/createMovie";
import { GraphQLFieldResolver, GraphQLError } from "graphql";
import Movie from "../../../db/models/movie.model";
import modifyMovie from "../../../services/movie/modifyMovie";
import removeMovie from "../../../services/movie/removeMovie";
import createMovieActor from "../../../services/movie/createMovieActor";
import MovieActor from "../../../db/models/movieActor.model";
import fetchMovie from "../../../services/movie/fetchMovie";
import createMovieAuthor from "../../../services/movie/createMovieAuthor";
import removeMovieActor from "../../../services/movie/removeMovieActor";
import removeMovieAuthor from "../../../services/movie/removeMovieAuthor";

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

const addActorToMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { actorId, movieId }
): Promise<Movie | null> => {
  try {
    await createMovieActor({ actorId, movieId });
    return await fetchMovie(movieId, true);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const removeActorFromMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { actorId, movieId }
): Promise<string> => {
  try {
    return await removeMovieActor(movieId, actorId);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const addAuthorToMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { authorId, movieId }
): Promise<Movie | null> => {
  try {
    await createMovieAuthor({ authorId, movieId });
    return await fetchMovie(movieId, true);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const removeAuthorFromMovie: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { authorId, movieId }
): Promise<string> => {
  try {
    return await removeMovieAuthor(movieId, authorId);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Mutation: {
    addMovie,
    updateMovie,
    deleteMovie,
    addActorToMovie,
    removeActorFromMovie,
    addAuthorToMovie,
    removeAuthorFromMovie,
  },
};
