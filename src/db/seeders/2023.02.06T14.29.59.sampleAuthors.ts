import type { Seeder } from "../index";
import Author from "../models/author.model";
import MovieAuthor from "../models/movieAuthor.model";

const TABLE_NAME = "authors";
const seed: Author[] = [
  new Author({
    id: 1,
    name: "Stephen King",
    genderId: 1,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
  }),
  new Author({
    id: 2,
    name: "Dwight Schrute",
    genderId: 1,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
  }),
  new Author({
    id: 3,
    name: "Quentin Tarantino",
    genderId: 1,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Stephen_King%2C_Comicon.jpg",
  }),
];

const movieAuthorSeed: MovieAuthor[] = [
  new MovieAuthor({
    id: 1,
    movieId: 1,
    authorId: 1,
  }),
  new MovieAuthor({
    id: 2,
    movieId: 2,
    authorId: 1,
  }),
  new MovieAuthor({
    id: 3,
    movieId: 2,
    authorId: 2,
  }),
  new MovieAuthor({
    id: 4,
    movieId: 2,
    authorId: 3,
  }),
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(
    TABLE_NAME,
    seed.map((v) => v.dataValues)
  );
  await sequelize.getQueryInterface().bulkInsert(
    "movieAuthors",
    movieAuthorSeed.map((v) => v.dataValues)
  );
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(TABLE_NAME, { id: seed.map((v) => v.id) });
  await sequelize
    .getQueryInterface()
    .bulkDelete("movieAuthors", { id: movieAuthorSeed.map((v) => v.id) });
};
