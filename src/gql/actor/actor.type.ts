export default /* GraphQL */ `
  interface IActor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
  }

  type ActorMovie implements IMovie {
    id: ID!
    title: String
    slug: String
    durationInMinutes: Int
    posterImageUrl: String
    releaseDate: Date
    synopsis: String
    rating: Float
    genres: [Genre]
    authors: [Author]
    ageRating: AgeRating
  }

  type Actor implements IActor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
    movies: [ActorMovie]
  }

  input AddActorInput {
    name: String!
    gender: InputID!
    photoUrl: String!
  }

  input UpdateActorInput {
    name: String
    gender: InputID
    photoUrl: String
  }
  type Query {
    actors: [Actor]
    actor(id: ID!): Actor
  }
  type Mutation {
    addActor(params: AddActorInput!): Actor
    updateActor(id: ID!, update: UpdateActorInput!): Actor
    deleteActor(id: ID!): String
  }
`;
