import User from "../../db/models/user.model";

export default async (): Promise<User[]> => {
  return User.findAll();
};
