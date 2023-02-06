import { createSchema, createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import User from "../../src/db/models/user.model";
import userType from "../../src/gql/user/user.type";
import query from "../../src/gql/user/resolvers/query";
import mutation from "../../src/gql/user/resolvers/mutation";
import { typeDefs as scalarTypeDefs } from 'graphql-scalars';

beforeEach(() => {
  jest.resetAllMocks();
  jest.mock("../../src/db/models/user.model");
});

const schema = createSchema({
  typeDefs: [scalarTypeDefs, userType],
  resolvers: {
    Query: query.Query,
    Mutation: mutation.Mutation,
  },
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

const mockUser = {
  id: "99",
  name: "Jane Bruh",
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Given an endpoint that return user data", () => {
  it("Returns a list of every user", async () => {
    User.findAll = jest.fn().mockReturnValue([mockUser]);
    const result = await executor({
      document: parse(/* GraphQL */ `
        query Welcome {
          users {
            id
            name
            createdAt
            updatedAt
          }
        }
      `),
    });

    expect(result).toHaveProperty("data.users[0].id", "99");
    expect(result).toHaveProperty("data.users[0].createdAt");
    expect(result).toHaveProperty("data.users[0].updatedAt");
  });

  it("Returns a specific user", async () => {
    User.findByPk = jest.fn().mockReturnValue(mockUser);
    const result = await executor({
      document: parse(/* GraphQL */ `
        query Welcome {
          user(id: "99") {
            id
            name
            createdAt
            updatedAt
          }
        }
      `),
    });

    expect(result).toHaveProperty("data.user.id", "99");
    expect(result).toHaveProperty("data.user.createdAt");
    expect(result).toHaveProperty("data.user.updatedAt");
  });
});

describe("Given an endpoint to add a new user", () => {
  const mockNewUser = {
    id: "100",
    name: "NewUser",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  it("Return the newly added user", async () => {
    User.create = jest.fn().mockReturnValue({...mockNewUser, name: "Alex"});
    const newUser = await executor({
      document: parse(/* GraphQL */ `
        mutation Add {
          addUser(params: { name: "Alex" }) {
            id
            name
          }
        }
      `),
    });

    expect(User.create).toBeCalledTimes(1);
    expect(newUser).toHaveProperty("data.addUser.name", "Alex");
    expect(newUser).toHaveProperty("data.addUser.id", "100");
  });
});
