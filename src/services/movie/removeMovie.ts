import Movie from "../../db/models/movie.model";

export default async (movieId: string) => {
  const affectedCount = await Movie.destroy({
    where: {
      id: movieId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
