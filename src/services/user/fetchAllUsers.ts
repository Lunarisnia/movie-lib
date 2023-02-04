import User from "../../db/models/user.model";

export default async (): Promise<Array<User>> => {
  return User.findAll();
};
