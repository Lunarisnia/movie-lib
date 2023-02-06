import { createSchema, createYoga } from "graphql-yoga";
import { buildHTTPExecutor } from "@graphql-tools/executor-http";
import { parse } from "graphql/language";
import utilsType from "../../src/gql/utils/utils.type";
import utilsQuery from "../../src/gql/utils/resolvers/utils.query";

beforeEach(() => {
  jest.resetAllMocks();
});

const schema = createSchema({
  typeDefs: [utilsType],
  resolvers: {
    Query: utilsQuery.Query,
  },
});

const yoga = createYoga({ schema });

const executor = buildHTTPExecutor({
  fetch: yoga.fetch,
});

it("Greet the user :)", async () => {
  const greetingMessage = await executor({
    document: parse(/* GraphQL */ `
      query Greeting {
        welcome {
          message
        }
      }
    `),
  });

  expect(greetingMessage).toHaveProperty("data.welcome.message", "Hello!, Welcome to the GraphQL API.");
});
