import Genre from "../../db/models/genre.model";
import { FindOptions } from "sequelize";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";
import Actor from "../../db/models/actor.model";
import Gender from "../../db/models/gender.model";
import Author from "../../db/models/author.model";

export default async (): Promise<Movie[]> => {
  return await Movie.findAll({
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
