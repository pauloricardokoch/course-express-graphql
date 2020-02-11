import axios from "axios";
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLNonNull
} from "graphql";

import { addUser, deleteUser, user } from "./user/user";
import { company } from "./company/company";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user,
    company
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser,
    deleteUser
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
