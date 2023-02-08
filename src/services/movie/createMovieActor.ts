import MovieActor from "../../db/models/movieActor.model";

interface MovieActorOptions {
  movieId: string;
  actorId: string;
}

export default async ({
  movieId,
  actorId,
}: MovieActorOptions): Promise<MovieActor | null> => {
  const isExist = await MovieActor.findOne({
    where: { movieId: movieId, actorId: actorId },
  });
  if (isExist) return null;
  return await MovieActor.create({ movieId: movieId, actorId: actorId });
};
