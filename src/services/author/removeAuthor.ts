import Author from "../../db/models/author.model";

export default async (authorId: string) => {
  const affectedCount = await Author.destroy({
    where: {
      id: authorId,
    },
  });
  return `Success. Amount of data affected: ${affectedCount}`;
};
