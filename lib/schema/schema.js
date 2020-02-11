import axios from "axios";
import { GraphQLObjectType, GraphQLSchema } from "graphql";

import { user, addUser, deleteUser, editUser } from "./user/user";
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
    deleteUser,
    editUser
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
