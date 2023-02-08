import Actor from "../../db/models/actor.model";
import { checkGenderExist, CreatePerson } from "../author/createAuthor";
import fetchActor from "./fetchActor";

interface CreateActor extends CreatePerson {}

export default async ({
  name,
  gender,
  photoUrl,
}: CreateActor): Promise<Actor | null> => {
  await checkGenderExist(gender);

  const actor = await Actor.create({
    name,
    photoUrl,
    genderId: gender.id,
  });

  return await fetchActor(actor.id, true);
};
