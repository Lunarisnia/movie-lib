export default /* GraphQL */ `
  type Movie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    genres: [Genre]
    ageRating: AgeRating
  }

  input MoviesInput {
    ageRating: ID!
  }

  type Query {
    movies: [Movie]!
  }
`;
