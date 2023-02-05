import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  id?: number;
  @Field()
  name?: string;
  @Field()
  createdAt?: Date;
  @Field()
  updatedAt?: Date;
}
