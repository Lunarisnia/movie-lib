export default /* GraphQL */ `
  interface IAuthor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
  }

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

  type Author implements IAuthor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
    movies: [AuthorMovie]
  }

  input AddAuthorInput {
    name: String!
    gender: InputID!
    photoUrl: String!
  }

  input UpdateAuthorInput {
    name: String
    gender: InputID
    photoUrl: String
  }

  type Query {
    authors: [Author]
    author(id: ID!): Author
  }
  type Mutation {
    addAuthor(params: AddAuthorInput!): Author
    updateAuthor(id: ID!, update: UpdateAuthorInput!): Author
    deleteAuthor(id: ID!): String
  }
`;
