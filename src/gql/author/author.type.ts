export default /* GraphQL */ `
  """
  Interface representing Author data.
  """
  interface IAuthor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
  }
  """
  Type representing Movie that an Author has.
  """
  type AuthorMovie implements IMovie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    rating: Float
    genres: [Genre]
    ageRating: AgeRating
    actors: [Actor]
  }
  """
  Type representing Author data.
  """
  type Author implements IAuthor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
    movies: [AuthorMovie]
  }
  """
  Input type for adding new author entry.
  """
  input AddAuthorInput {
    name: String!
    gender: InputID!
    photoUrl: String!
  }
  """
  Input type for updating an author entry.
  """
  input UpdateAuthorInput {
    name: String
    gender: InputID
    photoUrl: String
  }

  type Query {
    """
    Fetch all authors entry.
    """
    authors: [Author]
    """
    Fetch one author entry by id.
    """
    author(id: ID!): Author
  }
  type Mutation {
    """
    Add a new author entry.
    """
    addAuthor(params: AddAuthorInput!): Author
    """
    Update a author entry.
    """
    updateAuthor(id: ID!, update: UpdateAuthorInput!): Author
    """
    Delete a author entry.
    """
    deleteAuthor(id: ID!): String
  }
`;
