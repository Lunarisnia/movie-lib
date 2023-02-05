import User from "../../db/models/user.model";

export default async (userId: string) => {
  const affectedCount = await User.destroy({
    where: {
      id: userId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
