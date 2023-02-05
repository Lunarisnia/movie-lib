import fetchAllUsers from "../../services/user/fetchAllUsers";
import { Query, Resolver } from "type-graphql";
import { User } from "../schemas/user.schema";

@Resolver(User)
export class UserResolver {
  @Query((of) => [User])
  async getUsers(): Promise<User[]> {
    const users = await fetchAllUsers();

    return users;
  }
}

export default UserResolver;
