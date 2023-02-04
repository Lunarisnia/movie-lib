import { DataTypes } from "sequelize";
import type { Migration } from "../index";

const TABLE_NAME = "tableName";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(TABLE_NAME, {
    /**
     * Table Data goes here
     */
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(TABLE_NAME);
};
