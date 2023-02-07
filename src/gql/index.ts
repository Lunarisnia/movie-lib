import express from "express";
import type { Express, Router } from "express";
import { createYoga } from "graphql-yoga";
import { YogaServerOptions } from "graphql-yoga/typings/server";
import { schema } from "./schema";
import { blockFieldSuggestionsPlugin } from "@escape.tech/graphql-armor-block-field-suggestions";
import { useDisableIntrospection } from "@graphql-yoga/plugin-disable-introspection";
import { serverConfig } from "../config/components/server.config";
const routerDefault: Router = express.Router();

const defaultQuery = /* GraphQL */ `
  query Hi {
    weclome {
      message
    }
  }
`;

const applyGraphql = async (app: Express) => {
  const securityPlugins = [
    blockFieldSuggestionsPlugin(),
    useDisableIntrospection(),
  ];
  const yogaConfig: YogaServerOptions<{}, {}> = {
    schema: schema,
    graphiql: {
      defaultQuery: defaultQuery,
      title: "GraphiQL",
    },
    plugins: serverConfig.isDevelopment ? [] : securityPlugins,
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
