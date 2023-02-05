import express from "express";
import type { Express, Router } from "express";
import { createYoga } from "graphql-yoga";
import { YogaServerOptions } from "graphql-yoga/typings/server";
import { schema } from "./schema";
const routerDefault: Router = express.Router();

const defaultQuery = /* GraphQL */ `
  query Welcome {
    home {
      message
    }
  }
`;

const applyGraphql = async (app: Express) => {
  const yogaConfig: YogaServerOptions<{}, {}> = {
    schema: schema,
    graphiql: {
      defaultQuery: defaultQuery,
      title: "GraphiQL",
    },
  };

  const yogaGraphql = createYoga({ ...yogaConfig, graphiql: false });
  const yogaGraphiql = createYoga({
    ...yogaConfig,
    graphqlEndpoint: "/graphiql",
  });

  routerDefault.use("/graphql", yogaGraphql);
  routerDefault.use("/graphiql", yogaGraphiql);

  app.use(routerDefault);
};

export default applyGraphql;
