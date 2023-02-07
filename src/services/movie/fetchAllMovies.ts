import Genre from "../../db/models/genre.model";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";
import Actor from "../../db/models/actor.model";
import Gender from "../../db/models/gender.model";
import Author from "../../db/models/author.model";

export default async (): Promise<{
  rows: Movie[];
  count: number;
}> => {
  return await Movie.findAndCountAll({
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
