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

interface InputID {
  id: string;
}

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
  // Check if age rating exist
  const doesAgeRatingExist = await fetchAgeRating(ageRating.id);
  if (!doesAgeRatingExist)
    throw new ResourceNotFoundError("Invalid Age Rating ID.");

  // Check if every genres exist
  const genresFiltered = onlyUnique(genres.map((v) => v.id));
  const doesEveryGenresExist = await searchGenres(genresFiltered);
  if (doesEveryGenresExist.count !== genresFiltered.length)
    throw new ResourceNotFoundError("One or more Genre ID is invalid.");

  // Check if every actors exist
  const actorsFiltered = onlyUnique(actors.map((v) => v.id));
  const doesEveryActorsExist = await searchActors(actorsFiltered);
  if (doesEveryActorsExist.count !== actorsFiltered.length)
    throw new ResourceNotFoundError("One or more Movie ID is invalid.");

  // Check if every authors exist
  const authorsFiltered = onlyUnique(authors.map((v) => v.id));
  const doesEveryAuthorsExist = await searchAuthors(authorsFiltered);
  if (doesEveryAuthorsExist.count !== authorsFiltered.length)
    throw new ResourceNotFoundError("One or more Author ID is invalid.");

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
