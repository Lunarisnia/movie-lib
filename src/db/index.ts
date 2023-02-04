import { databaseConfig } from "../config/components/database.config";
import { serverConfig } from "../config/components/server.config";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { Umzug, SequelizeStorage } from "umzug";

let config;
switch (serverConfig.env) {
  case "development":
    config = databaseConfig.development;
    break;
  case "test":
    config = databaseConfig.test;
    break;
  default:
    config = databaseConfig.production;
    break;
}

export const sequelize = new Sequelize({
  ...config,
  modelPaths: [__dirname + "/models"],
  modelMatch: (filename, member) => {
    return (
      filename.substring(0, filename.indexOf(".model")) == member.toLowerCase()
    );
  },
});

export const migrator = new Umzug({
  migrations: {
    glob: ["migrations/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "migration_meta",
  }),
  logger: console,
  create: {
    template: (filepath) => [
      // read template from filesystem
      [
        filepath,
        readFileSync(
          path.join(__dirname, "template/sampleMigrations.ts")
        ).toString(),
      ],
    ],
  },
});

export type Migration = typeof migrator._types.migration;

export const seeder = new Umzug({
  migrations: {
    glob: ["seeders/*.ts", { cwd: __dirname }],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: "seeder_meta",
  }),
  logger: console,
  create: {
    template: (filepath) => [
      // read template from filesystem
      [
        filepath,
        readFileSync(
          path.join(__dirname, "template/sampleSeeders.ts")
        ).toString(),
      ],
    ],
  },
});

export type Seeder = typeof seeder._types.migration;

export default sequelize;
