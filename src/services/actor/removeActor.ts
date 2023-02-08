import Actor from "../../db/models/actor.model";

export default async (actorId: string) => {
  const affectedCount = await Actor.destroy({
    where: {
      id: actorId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
