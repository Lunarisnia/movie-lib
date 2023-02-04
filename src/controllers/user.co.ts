import fetchAllUsers from "../services/user/fetchAllUsers";
import { Response, Request } from "express";

export const getUsers = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  const users = await fetchAllUsers();
  return res.send({ users: users });
};
