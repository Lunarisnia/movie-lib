import User from "../../db/models/user.model";
import fetchUser from "./fetchUser";

export default async (userId: string, name: string) => {
  await User.update(
    { name: name },
    {
      where: {
        id: userId,
      },
    }
  );
  return await fetchUser(userId);
};
