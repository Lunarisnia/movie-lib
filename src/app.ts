import createError from "http-errors";
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

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

applyRouter(app);
app.use(errHandler);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const PORT : string =process.env.PORT || '3000'
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT} 👍`);
});


// Todo: Convert sequelize models and db to typescript as well
// Todo: Validate the joi config for env variables for database (make sure it allow postgres)
// Todo: Find out how to properly use sequelize with typescript
// Todo: add the graphql as well
// Todo: Add the postgres driver
// Todo: Refactor the 404 error handling maybe
// Todo: Deploy this on Heroku
// Todo: Establish a CI/CD for autodeploy on heroku
// Todo: Add unit test method