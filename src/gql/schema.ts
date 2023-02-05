import { loadFilesSync } from "@graphql-tools/load-files";
import { createSchema } from "graphql-yoga";

export const schema = createSchema({
  typeDefs: loadFilesSync("src/gql/**/*.type.ts"),
  resolvers: loadFilesSync("src/gql/**/resolvers/*.ts"),
});
