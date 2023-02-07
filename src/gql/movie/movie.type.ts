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

  input AddMovieInput {
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
    movie(id: ID!): Movie
    movies: [Movie]
  }
  type Mutation {
    addMovie(params: AddMovieInput): Movie
  }
`;
