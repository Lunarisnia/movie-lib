import {
  buildSchemaSync,
  Field,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import fs from "fs";
import express from "express";
import type { Express, Router } from "express";
import path from "path";
import { createYoga } from "graphql-yoga";
import { YogaServerOptions } from "graphql-yoga/typings/server";
const routerDefault: Router = express.Router();

const baseName: string = path.basename(__filename);

// Default Resolver to satisfy buildSchema
@ObjectType()
class Home {
  @Field()
  message!: string;
}

@Resolver(Home)
class HomeResolver {
  @Query(() => Home)
  home(): Home {
    return { message: "Welcome to the graphql API!" };
  }
}

const defaultQuery = `
query Welcome {
  home {
    message
  }
}
`;

const applyGraphql = (app: Express) => {
  const _resolvers = fs
    .readdirSync(path.join(__dirname, "resolvers"))
    .filter((file) => file.indexOf(".") !== 0 && file !== baseName)
    .map((file) => {
      return require(path.join(__dirname, "resolvers", file)).default;
    });
  const resolvers = [HomeResolver, ..._resolvers] as const;
  const schema = buildSchemaSync({
    resolvers: resolvers,
    emitSchemaFile: true,
  });

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
