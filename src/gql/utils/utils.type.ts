export default /* GraphQL */ `
  scalar DateTime

  """
  A simple greeting.
  """
  type WelcomeMessage {
    message: String!
  }

  type Query {
    welcome: WelcomeMessage
  }
`;
