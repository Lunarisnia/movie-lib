import Author from "../../../db/models/author.model";
import { GraphQLError, GraphQLFieldResolver } from "graphql";
import fetchAllAuthors from "../../../services/author/fetchAllAuthors";
import fetchAuthor from "../../../services/author/fetchAuthor";

const authors: GraphQLFieldResolver<any, any, any, any> = async (
  _
): Promise<Author[]> => {
  try {
    const authors = await fetchAllAuthors({}, true);
    return authors.rows;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};
const author: GraphQLFieldResolver<any, any, any, any> = async (
  _,
  { id }
): Promise<Author | null> => {
  try {
    const author = await fetchAuthor(id, true);
    return author;
  } catch (error: any) {
    throw new GraphQLError(error.message);
  }
};

export default {
  Query: {
    authors,
    author,
  },
};
