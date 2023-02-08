import Author from "../../db/models/author.model";
import { ResourceNotFoundError } from "../error/types";
import fetchGender from "../gender/fetchGender";
import { InputID } from "../movie/createMovie";
import fetchAuthor from "./fetchAuthor";

export interface CreatePerson {
  name: string;
  gender: InputID;
  photoUrl: string;
}

interface CreateAuthor extends CreatePerson {}

export const checkGenderExist = async (gender: InputID) => {
  // Check if gender exist
  const doesGenderExist = await fetchGender(gender.id);
  if (!doesGenderExist) throw new ResourceNotFoundError("Invalid Gender ID.");
};

export default async ({
  name,
  gender,
  photoUrl,
}: CreateAuthor): Promise<Author | null> => {
  await checkGenderExist(gender);

  const author = await Author.create({
    name,
    photoUrl,
    genderId: gender.id,
  });

  return await fetchAuthor(author.id, true);
};
