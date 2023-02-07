import Movie from "../../db/models/movie.model";

export default async (movieId: string): Promise<Movie | null> => {
  return await Movie.findByPk(movieId);
};
