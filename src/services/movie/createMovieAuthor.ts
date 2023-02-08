import MovieAuthor from "../../db/models/movieAuthor.model";

interface MovieAuthorOptions {
  movieId: string;
  authorId: string;
}

export default async ({
  movieId,
  authorId,
}: MovieAuthorOptions): Promise<MovieAuthor | null> => {
  const exist = await MovieAuthor.findOne({
    where: { movieId: movieId, authorId: authorId },
  });
  if (exist) return null;
  return await MovieAuthor.create({ movieId: movieId, authorId: authorId });
};
