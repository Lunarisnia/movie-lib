import MovieGenre from "../../db/models/movieGenre.model";
import dayjs from "dayjs";
import Movie from "../../db/models/movie.model";
import fetchAgeRating from "../ageRating/fetchAgeRating";
import { ResourceNotFoundError } from "../error/types";
import searchGenres from "../genre/searchGenres";
import onlyUnique from "../utils/onlyUnique";
import slugify from "../utils/slugify";
import fetchMovie from "./fetchMovie";
import searchActors from "../actor/searchActors";
import searchAuthors from "../author/searchAuthors";
import MovieActor from "../../db/models/movieActor.model";
import MovieAuthor from "../../db/models/movieAuthor.model";

export interface InputID {
  id: string;
}

export const checkAgeRatingExist = async (ageRating: InputID) => {
  // Check if age rating exist
  const doesAgeRatingExist = await fetchAgeRating(ageRating.id);
  if (!doesAgeRatingExist)
    throw new ResourceNotFoundError("Invalid Age Rating ID.");
};

export const checkGenresExist = async (genres: string[]) => {
  // Check if every genres exist
  const doesEveryGenresExist = await searchGenres(genres);
  if (doesEveryGenresExist.count !== genres.length)
    throw new ResourceNotFoundError("One or more Genre ID is invalid.");
};

export const checkActorsExist = async (actors: string[]) => {
  // Check if every actors exist
  const doesEveryActorsExist = await searchActors(actors);
  if (doesEveryActorsExist.count !== actors.length)
    throw new ResourceNotFoundError("One or more Actor ID is invalid.");
};

export const checkAuthorsExist = async (authors: string[]) => {
  // Check if every authors exist
  const doesEveryAuthorsExist = await searchAuthors(authors);
  if (doesEveryAuthorsExist.count !== authors.length)
    throw new ResourceNotFoundError("One or more Author ID is invalid.");
};

export const movieDataValidations = async ({
  ageRating,
  genres,
  actors,
  authors,
}: {
  ageRating: InputID;
  genres: string[];
  actors: string[];
  authors: string[];
}) => {
  await checkAgeRatingExist(ageRating);
  await checkGenresExist(genres);
  await checkActorsExist(actors);
  await checkAuthorsExist(authors);
};

interface CreateMovie {
  title: string;
  rating: number;
  synopsis: string;
  genres: InputID[];
  actors: InputID[];
  releaseDate: string;
  authors: InputID[];
  ageRating: InputID;
  posterImageUrl: string;
  durationInMinutes: number;
}

export default async ({
  title,
  rating,
  synopsis,
  genres,
  actors,
  releaseDate,
  authors,
  ageRating,
  posterImageUrl,
  durationInMinutes,
}: CreateMovie): Promise<Movie | null> => {
  const genresFiltered = onlyUnique(genres.map((v) => v.id));
  const actorsFiltered = onlyUnique(actors.map((v) => v.id));
  const authorsFiltered = onlyUnique(authors.map((v) => v.id));
  await movieDataValidations({
    actors: actorsFiltered,
    ageRating,
    authors: authorsFiltered,
    genres: genresFiltered,
  });

  // Create the movie
  const movie = await Movie.create({
    title,
    rating,
    synopsis,
    posterImageUrl,
    durationInMinutes,
    slug: slugify(title),
    ageRatingId: ageRating.id,
    releaseDate: dayjs(releaseDate).format(),
  });

  // Create the movieGenres mapping rows
  const movieGenres = genresFiltered.map((id) => ({
    movieId: movie.id,
    genreId: id,
  }));
  await MovieGenre.bulkCreate(movieGenres);

  // Create the actor mapping rows
  const movieActors = actorsFiltered.map((id) => ({
    movieId: movie.id,
    actorId: id,
  }));
  await MovieActor.bulkCreate(movieActors);

  // Create the author mapping rows
  const movieAuthors = authorsFiltered.map((id) => ({
    movieId: movie.id,
    authorId: id,
  }));
  await MovieAuthor.bulkCreate(movieAuthors);

  return await fetchMovie(movie.id);
};
