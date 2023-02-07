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

  input UpdateMovieInput {
    title: String
    rating: Float
    durationInMinutes: Int
    posterImageUrl: String
    synopsis: String
    releaseDate: Date
    ageRating: InputID
  }

  type Query {
    movie(id: ID!): Movie
    movies: [Movie]
  }
  type Mutation {
    addMovie(params: AddMovieInput): Movie
    updateMovie(id: ID!, update: UpdateMovieInput!): Movie
    deleteMovie(id: ID!): String
  }
`;
