import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import axios from "axios";
// eslint-disable-next-line import/no-cycle
import CompanyType from "../company/company";

// defines user's type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      resolve: ({ companyId }) =>
        axios
          .get(`http://localhost:3000/companies/${companyId}`)
          .then(response => response.data)
          .catch(() => null)
    }
  })
});

export default UserType;

// fetch a user by it's id
export const user = {
  type: UserType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: (parentValue, { id }) =>
    axios
      .get(`http://localhost:3000/users/${id}`)
      .then(response => response.data)
};

// add a new user
export const addUser = {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    companyId: { type: GraphQLID }
  },
  resolve: (parentValue, args) =>
    axios
      .post("http://localhost:3000/users", { ...args })
      .then(response => response.data)
};

// delete an existing user
export const deleteUser = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) }
  },
  resolve: (parentValue, { id }) =>
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then(response => response.status === 200)
      .catch(() => false)
};

// edit an existing user
export const editUser = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyId: { type: GraphQLID }
  },
  resolve: (parentValue, args) =>
    axios
      .patch(`http://localhost:3000/users/${args.id}`, { ...args })
      .then(response => response.data)
};
