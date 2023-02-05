import User from "../../db/models/user.model";

export default async (userId: string) => {
  return User.findByPk(userId);
};
