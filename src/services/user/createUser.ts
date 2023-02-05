import User from "../../db/models/user.model";

export default async (name: string) => {
  return await User.create({ name: name });
};
