import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from "graphql";
import axios from "axios";
// eslint-disable-next-line import/no-cycle
import UserType from "../user/user";

// defines company's type
const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve: ({ id }) =>
        axios
          .get(`http://localhost:3000/companies/${id}/users`)
          .then(response => response.data)
          .catch(() => null)
    }
  })
});

export default CompanyType;

// find a company by it's id
export const company = {
  type: CompanyType,
  args: { id: { type: new GraphQLNonNull(GraphQLID) } },
  resolve: (parentValue, { id }) =>
    axios
      .get(`http://localhost:3000/company/${id}`)
      .then(response => response.data)
};

// add a new company
export const addCompany = {};

// delete an existing company
export const deleteCompany = {};

// edit an existing company
export const editCompany = {};
