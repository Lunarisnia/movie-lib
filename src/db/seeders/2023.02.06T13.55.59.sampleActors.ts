import type { Seeder } from "../index";
import Actor from "../models/actor.model";
import MovieActor from "../models/movieActor.model";

const TABLE_NAME = "actors";
const seed: Actor[] = [
  new Actor({
    id: 1,
    name: "Keanu Reeves",
    genderId: 1,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg/800px-Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg",
  }),
  new Actor({
    id: 2,
    name: "Jane Vee",
    genderId: 2,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg/800px-Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg",
  }),
  new Actor({
    id: 3,
    name: "James Charles",
    genderId: 3,
    photoUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg/800px-Keanu_Reeves_2013_%2810615146086%29_%28cropped%29.jpg",
  }),
];

const movieActorSeed: MovieActor[] = [
  new MovieActor({
    id: 1,
    movieId: 1,
    actorId: 1,
  }),
  new MovieActor({
    id: 2,
    movieId: 2,
    actorId: 1,
  }),
  new MovieActor({
    id: 3,
    movieId: 2,
    actorId: 2,
  }),
  new MovieActor({
    id: 4,
    movieId: 2,
    actorId: 3,
  }),
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(
    TABLE_NAME,
    seed.map((v) => v.dataValues)
  );
  await sequelize.getQueryInterface().bulkInsert(
    "movieActors",
    movieActorSeed.map((v) => v.dataValues)
  );
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(TABLE_NAME, { id: seed.map((v) => v.id) });
  await sequelize
    .getQueryInterface()
    .bulkDelete("movieActors", { id: movieActorSeed.map((v) => v.id) });
};
