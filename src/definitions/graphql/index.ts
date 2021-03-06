import { gql } from "apollo-server";

import types from "./types";
import queries from "./queries";
import mutations from "./mutations";

export default gql`
  ${types}
  ${queries}
  ${mutations}
`;
