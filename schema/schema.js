const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema
} = graphql;

const users = [
  { id: "23", firstName: "Bill", age: 20 },
  { id: "47", firstName: "Samantha", age: 21 }
];

const UserType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: (parentValue, args) => _.find(users, { id: args.id })
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
