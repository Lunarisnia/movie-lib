import modifyAuthor from "../../../services/author/modifyAuthor";
import { GraphQLFieldResolver, GraphQLError } from "graphql";
import Author from "../../../db/models/author.model";
import createAuthor from "../../../services/author/createAuthor";
import removeAuthor from "../../../services/author/removeAuthor";

const addAuthor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { params: newMovieParams }
): Promise<Author | null> => {
  try {
    const newMovie = await createAuthor(newMovieParams);
    return newMovie;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const updateAuthor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  param
): Promise<Author | null> => {
  try {
    return await modifyAuthor(param.id, param.update);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

const deleteAuthor: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<string> => {
  try {
    return await removeAuthor(id);
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Mutation: {
    addAuthor,
    updateAuthor,
    deleteAuthor,
  },
};
