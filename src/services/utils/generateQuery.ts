import { FindAndCountOptions, FindOptions, IncludeOptions } from "sequelize";

export default (
  rawQuery: FindOptions | FindAndCountOptions,
  relations: IncludeOptions,
  includeRelations?: boolean
) => {
  if (includeRelations)
    return {
      ...rawQuery,
      ...relations,
    };
  return rawQuery;
};
