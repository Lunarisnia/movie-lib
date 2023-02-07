export default /* GraphQL */ `
  type Movie {
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
    authors: [Author]
  }

  input InputID {
    id: ID!
  }

  input MovieInput {
    title: String!
    durationInMinutes: Int!
    posterImageUrl: String!
    releaseDate: Date!
    synopsis: String!
    rating: Float
    genres: [InputID!]!
    ageRating: InputID!
    actors: [InputID!]!
    authors: [InputID!]!
  }

  type Query {
    movies: [Movie]!
  }
  type Mutation {
    addMovie(params: MovieInput): Movie
  }
`;
