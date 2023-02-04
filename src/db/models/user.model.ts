import { Model, Table, Column } from "sequelize-typescript";

@Table({
  tableName: "users",
})
export default class User extends Model {
  @Column
  name!: string;
}
