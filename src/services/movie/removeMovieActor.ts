import MovieActor from "../../db/models/movieActor.model";

export default async (movieId: string, actorId: string) => {
  const affectedCount = await MovieActor.destroy({
    where: {
      movieId: movieId,
      actorId: actorId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
