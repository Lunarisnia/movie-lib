import Movie from "../../db/models/movie.model";
import { InternalError } from "../error/types";
import slugify from "../utils/slugify";
import { checkAgeRatingExist, checkGenresExist, InputID } from "./createMovie";
import fetchMovie from "./fetchMovie";

export interface ModifyMovieOptions {
  title?: string;
  rating?: number;
  durationInMinutes?: number;
  posterImageUrl?: string;
  synopsis?: string;
  releaseDate?: string;
  ageRating?: InputID;
}

export default async (movieId: string, options: ModifyMovieOptions) => {
  const values: { [x: string]: any } = {
    title: options.title,
    rating: options.rating,
    durationInMinutes: options.durationInMinutes,
    posterImageUrl: options.posterImageUrl,
    synopsis: options.synopsis,
    releaseDate: options.releaseDate,
  };
  if (options.title) values.slug = slugify(options.title);
  if (options.ageRating) {
    await checkAgeRatingExist(options.ageRating);
    values.ageRatingId = options.ageRating.id;
  }
  const affected = await Movie.update(values, {
    where: {
      id: movieId,
    },
  });
  if (affected[0] < 1) throw new InternalError("Update failed.");
  return await fetchMovie(movieId);
};
