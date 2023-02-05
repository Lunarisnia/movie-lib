import { Field, ObjectType } from "type-graphql";

@ObjectType({ description: "Object representing the user." })
export class User {
  @Field({ description: "ID of the user." })
  id?: number;
  @Field({ description: "Name of the user." })
  name?: string;
  @Field({ description: "When the user is created." })
  createdAt?: Date;
  @Field({ description: "When the user is last updated." })
  updatedAt?: Date;
}
