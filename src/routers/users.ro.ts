import { wrap } from "../services/error/errorHandler";
import { getUsers } from "../controllers/user.co";
import { Router } from "express";

export default (router: Router) => {
  router.get("/", wrap(getUsers));
};
