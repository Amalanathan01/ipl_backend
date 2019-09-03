import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./types/";
import resolvers from "./resolver/";

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;