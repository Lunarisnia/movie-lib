import Gender from "../../db/models/gender.model";

export default async (genderId: string): Promise<Gender | null> => {
  return await Gender.findByPk(genderId);
};
