export default /* GraphQL */ `
  type User {
    id: ID!
    name: String
    createdAt: String
    updatedAt: String
  }

  input AddUserInput {
    name: String!
  }

  input UpdateUserInput {
    id: ID!
    name: String!
  }

  input DeleteUserInput {
    id: ID!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }
  type Mutation {
    addUser(params: AddUserInput): User
    updateUser(params: UpdateUserInput): User
    deleteUser(params: DeleteUserInput): String
  }
`;
