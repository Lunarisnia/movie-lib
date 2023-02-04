import express, { Express, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import applyRouter from "./routers";
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

// Todo: add Graphql
// Todo: Start thinking about the relations of the required table
