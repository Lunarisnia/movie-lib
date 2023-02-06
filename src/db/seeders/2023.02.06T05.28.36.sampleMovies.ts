import slugify from "../../services/utils/slugify";
import type { Seeder } from "../index";
import Movie from "../models/movie.model";
import MovieGenre from "../models/movieGenre.model";

const TABLE_NAME = "movies";
const seed: Movie[] = [
  new Movie({
    id: 1,
    title: "The Matrix",
    ageRatingId: 1,
    slug: slugify("The Matrix"),
    durationInMinutes: 180,
    posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
    synopsis: "Lorem Ipsum yada yada",
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
  new Movie({
    id: 2,
    title: "The Matrix 2",
    ageRatingId: 2,
    slug: slugify("The Matrix 2"),
    durationInMinutes: 100,
    posterImageUrl: "https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg",
    synopsis: "Lorem Ipsum Foobar",
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }),
];

const movieGenreSeed: MovieGenre[] = [
  new MovieGenre({
    id: 1,
    movieId: 1,
    genreId: 1,
  }),
  new MovieGenre({
    id: 2,
    movieId: 2,
    genreId: 1,
  }),
  new MovieGenre({
    id: 2,
    movieId: 2,
    genreId: 2,
  }),
  new MovieGenre({
    id: 2,
    movieId: 2,
    genreId: 3,
  }),
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(
    "movieGenres",
    movieGenreSeed.map((v) => v.dataValues)
  );
  await sequelize.getQueryInterface().bulkInsert(
    TABLE_NAME,
    seed.map((v) => v.dataValues)
  );
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete("movieGenres", { id: movieGenreSeed.map((v) => v.id) });
  await sequelize
    .getQueryInterface()
    .bulkDelete(TABLE_NAME, { id: seed.map((v) => v.id) });
};
