import { mergeResolvers } from "merge-graphql-schemas";

import Delivery from "./Delivery/";
import Match from "./Match/";

const resolvers = [Delivery, Match];

export default mergeResolvers(resolvers);