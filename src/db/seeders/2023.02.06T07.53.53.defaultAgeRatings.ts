import type { Seeder } from "../index";
import AgeRating from "../models/ageRating.model";

const TABLE_NAME = "ageRatings";
const seed: AgeRating[] = [
  new AgeRating({
    id: 1,
    name: "General Audiences",
    abbreviation: "G",
  }),
  new AgeRating({
    id: 2,
    name: "Parental Guidance Suggested",
    abbreviation: "PG",
  }),
  new AgeRating({
    id: 3,
    name: "Parents Strongly Cautioned",
    abbreviation: "PG-13",
  }),
  new AgeRating({
    id: 4,
    name: "Restricted",
    abbreviation: "R",
  }),
  new AgeRating({
    id: 5,
    name: "Adult Only",
    abbreviation: "NC-17",
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
