import AgeRating from "../../db/models/ageRating.model";

export default async (ageRatingId: string) => {
  return await AgeRating.findByPk(ageRatingId);
};
