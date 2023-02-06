import {
  Model,
  Table,
  Column,
  IsFloat,
  BelongsToMany,
  HasOne,
  BelongsTo,
  ForeignKey,
  Max,
  Min,
  IsInt,
} from "sequelize-typescript";
import AgeRating from "./ageRating.model";
import Genre from "./genre.model";
import MovieGenre from "./movieGenre.model";

@Table({
  tableName: "movies",
  paranoid: true,
})
export default class Movie extends Model {
  @Column
  title!: string;

  @Column
  releaseDate!: Date;

  @IsFloat
  @Min(0.0)
  @Max(5.0)
  @Column
  rating!: number;

  @ForeignKey(() => AgeRating)
  @Column
  ageRatingId!: number;

  @Column
  slug!: string;

  @IsInt
  @Min(0)
  @Column
  durationInMinutes!: number;

  @Column
  posterImageUrl!: string;

  @Column
  synopsis!: string;

  // Todo: Add Fields = Actors, Authors

  @BelongsTo(() => AgeRating)
  ageRating!: AgeRating;

  @BelongsToMany(() => Genre, () => MovieGenre)
  genres!: Array<Genre & { MovieGenre: MovieGenre }>;
}
