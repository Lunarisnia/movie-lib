import Genre from "../../db/models/genre.model";
import { FindOptions } from "sequelize";
import Movie from "../../db/models/movie.model";
import AgeRating from "../../db/models/ageRating.model";

export default async (): Promise<Movie[]> => {
  return await Movie.findAll({
    include: [AgeRating, Genre],
  });
};
