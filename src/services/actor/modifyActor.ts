import Actor from "../../db/models/actor.model";
import { checkGenderExist } from "../author/createAuthor";
import { InternalError } from "../error/types";
import { InputID } from "../movie/createMovie";
import fetchActor from "./fetchActor";

export interface ModifyActorOptions {
  name?: String;
  gender?: InputID;
  photoUrl?: String;
}

export default async (actorId: string, options: ModifyActorOptions) => {
  const values: { [x: string]: any } = {
    name: options.name,
    photoUrl: options.photoUrl,
  };
  if (options.gender) {
    await checkGenderExist(options.gender);
    values.genderId = options.gender.id;
  }
  const affected = await Actor.update(values, {
    where: {
      id: actorId,
    },
  });
  if (affected[0] < 1) throw new InternalError("Update failed.");
  return await fetchActor(actorId, true);
};
