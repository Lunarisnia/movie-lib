export default /* GraphQL */ `
  """
  A simple greeting.
  """
  type WelcomeMessage {
    message: String!
  }

  type Query {
    """
    Simply greet you.
    """
    welcome: WelcomeMessage
  }
`;
