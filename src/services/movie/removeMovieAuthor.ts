import MovieAuthor from "../../db/models/movieAuthor.model";

export default async (movieId: string, authorId: string) => {
  const affectedCount = await MovieAuthor.destroy({
    where: {
      movieId: movieId,
      authorId: authorId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
