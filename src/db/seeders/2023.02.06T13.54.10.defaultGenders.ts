import type { Seeder } from "../index";
import Gender from "../models/gender.model";

const TABLE_NAME = "genders";
const seed: Gender[] = [
  new Gender({
    id: 1,
    name: "Male",
  }),
  new Gender({
    id: 2,
    name: "Female",
  }),
  new Gender({
    id: 3,
    name: "Other",
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
