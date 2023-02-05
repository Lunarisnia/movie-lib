import "reflect-metadata";
import UserResolver from "../../src/gql/resolvers/user.resolver";
import { buildSchemaSync } from "type-graphql";
import { createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import User from "../../src/db/models/user.model";

beforeEach(() => {
  jest.resetAllMocks();
});

const schema = buildSchemaSync({
  resolvers: [UserResolver],
  emitSchemaFile: false,
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

it("Returns a list of every user", async () => {
  const mockUser = {
    id: 99,
    name: "Jane Bruh",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  User.findAll = jest.fn().mockReturnValue([mockUser]);
  const result = await executor({
    document: parse(`
        query Welcome {
            getUsers {
                id
                name
                createdAt
                updatedAt
            }
        }
        `),
  });

  expect(result).toHaveProperty('data.getUsers[0].id', 99);
  expect(result).toHaveProperty('data.getUsers[0].createdAt');
  expect(result).toHaveProperty('data.getUsers[0].updatedAt');
});
