import Author from "../../db/models/author.model";
import { InternalError } from "../error/types";
import { InputID } from "../movie/createMovie";
import { checkGenderExist } from "./createAuthor";
import fetchAuthor from "./fetchAuthor";

export interface ModifyAuthorOptions {
  name?: String;
  gender?: InputID;
  photoUrl?: String;
}

export default async (authorId: string, options: ModifyAuthorOptions) => {
  const values: { [x: string]: any } = {
    name: options.name,
    photoUrl: options.photoUrl,
  };
  if (options.gender) {
    await checkGenderExist(options.gender);
    values.genderId = options.gender.id;
  }
  const affected = await Author.update(values, {
    where: {
      id: authorId,
    },
  });
  if (affected[0] < 1) throw new InternalError("Update failed.");
  return await fetchAuthor(authorId, true);
};
