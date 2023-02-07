import express, { Express } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import applyRouter from "./routers";
import applyGraphql from "./gql/index";
import { errHandler } from "./services/error/errorHandler";
import { serverConfig } from "./config/components/server.config";
import dotenv from "dotenv";
dotenv.config();

// Trigger the joi validation for env variables
import "./config/index";

// Initialize Sequelize instance
import { sequelize } from "./db/index";

const app: Express = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

applyRouter(app);
applyGraphql(app);
app.use(errHandler);

const PORT: string = serverConfig.detail.port;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    console.log(`Server is listening on port: ${PORT} 👍`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});

/**
 * Progress:
 * Movie:
 *  - Fetch All movie (Done) > Maybe add search by param x
 *  - Add Movie (Done)
 *  - Fetch One Movie
 *  - Update Movie
 *  - Delete Movie
 * Author:
 *  - Fetch All Author
 *  - Add Author
 *  - Fetch One Author
 *  - Update Author
 *  - Delete Author
 * Actor:
 *  - Fetch All Actor
 *  - Add Actor
 *  - Fetch One Actor
 *  - Update Actor
 *  - Delete Actor
 */

// Todo: Finish the CRUD of every table important table (Movie, Author, Actor)
// Todo: Currently detailed read is only available for Movie, make it available everywhere
// Todo: Crud for those 3 schema
// Todo: write documentation for the api
// Todo: Add pagination
// Todo: Do unit tests
