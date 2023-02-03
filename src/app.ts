import express, { Express, Request, Response } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import applyRouter from "./routers";
import { errHandler } from './services/error/errorHandler'; 
import dotenv from 'dotenv';
dotenv.config();

// Trigger the joi validation for env variables
import './config/index';

const app: Express = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

applyRouter(app);
app.use(errHandler);

const PORT : string = process.env.PORT || '3000';
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} 👍`);
});


// Todo: Convert sequelize models and db to typescript as well
// Todo: Validate the joi config for env variables for database (make sure it allow postgres)
// Todo: Find out how to properly use sequelize with typescript
// Todo: add the graphql as well
// Todo: Add the postgres driver
// Todo: Deploy this on Heroku
// Todo: Establish a CI/CD for autodeploy on heroku
// Todo: Add unit test method