import type { Seeder } from "../index";
import Genre from "../models/genre.model";

const TABLE_NAME = "genres";
const seed: Genre[] = [
  new Genre({
    id: 1,
    name: "Action",
  }),
  new Genre({
    id: 2,
    name: "Comedy",
  }),
  new Genre({
    id: 3,
    name: "Mystery",
  }),
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(
    TABLE_NAME,
    seed.map((v) => v.dataValues)
  );
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(TABLE_NAME, { id: seed.map((v) => v.id) });
};
