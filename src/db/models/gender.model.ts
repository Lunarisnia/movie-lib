import { Model, Table, Column, HasMany } from "sequelize-typescript";
import Actor from "./actor.model";

@Table({
  tableName: "genders",
  paranoid: true,
})
export default class Gender extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  name!: string;

  @HasMany(() => Actor)
  actors!: Actor[];
}
