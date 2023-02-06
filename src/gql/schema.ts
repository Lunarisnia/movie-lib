import { loadFilesSync } from "@graphql-tools/load-files";
import { createSchema } from "graphql-yoga";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import path from "path";

const typeDefsPath = path.join(__dirname, "**", "*.type.{ts,js}");
const resolversPath = path.join(__dirname, "**", "resolvers", "*.{ts,js}");

export const schema = createSchema({
  typeDefs: [scalarTypeDefs, ...loadFilesSync(typeDefsPath)],
  resolvers: loadFilesSync(resolversPath),
});
