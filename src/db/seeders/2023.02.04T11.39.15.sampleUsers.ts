import type { Seeder } from "../index";

const TABLE_NAME = "users";
const seed = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export const up: Seeder = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert(TABLE_NAME, seed);
};

export const down: Seeder = async ({ context: sequelize }) => {
  await sequelize
    .getQueryInterface()
    .bulkDelete(TABLE_NAME, { id: seed.map((v) => v.id) });
};
