import Genre from "../../db/models/genre.model";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";
import Actor from "../../db/models/actor.model";
import Gender from "../../db/models/gender.model";
import Author from "../../db/models/author.model";

export default async (movieId: string): Promise<Movie | null> => {
  return await Movie.findByPk(movieId, {
    include: [
      AgeRating,
      Genre,
      {
        model: Actor,
        include: [Gender],
      },
      {
        model: Author,
        include: [Gender],
      },
    ],
  });
};
