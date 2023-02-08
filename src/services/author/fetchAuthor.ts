import Author from "../../db/models/author.model";
import generateQuery from "../utils/generateQuery";
import { authorRelationOptions } from "./fetchAllAuthors";

export default async (
  authorId: string | number,
  includeRelations?: boolean
): Promise<Author | null> => {
  const finalQuery = generateQuery({}, authorRelationOptions, includeRelations);
  return await Author.findByPk(authorId, finalQuery);
};
