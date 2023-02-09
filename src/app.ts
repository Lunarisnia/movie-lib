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
 *  - Fetch One Movie (Done)
 *  - Update Movie (Done)
 *  - Delete Movie (Done)
 *  - Unit Test (DONE)
 *  - addActorToMovie (DONE)
 *  - removeActorFromMovie (DONE)
 *  - addAuthorToMovie (DONE)
 *  - removeAuthorFromMovie (DONE)
 *  - Documentation (DONE)
 * Author:
 *  - Fetch All Author (DONE)
 *  - Fetch One Author (DONE)
 *  - Add Author (DONE)
 *  - Update Author (DONE)
 *  - Delete Author (DONE)
 *  - Unit Test (DONE)
 *  - Documentation (DONE)
 * Actor:
 *  - Fetch All Actor (DONE)
 *  - Add Actor (DONE)
 *  - Fetch One Actor (DONE)
 *  - Update Actor (DONE)
 *  - Delete Actor (DONE)
 *  - Unit Test (DONE)
 *  - Documentation (DONE)
 */
//--------- NEXT == PREPARE DB ON A CLOUD SOMEWHERE, AWS/GCP
