export default /* GraphQL */ `
  """
  Interface representing Actor data.
  """
  interface IActor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
  }

  """
  Type representing Movie that an Actor has.
  """
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

  """
  Type representing Actor data.
  """
  type Actor implements IActor {
    id: ID!
    name: String
    gender: Gender
    photoUrl: String
    movies: [ActorMovie]
  }

  """
  Input type for adding new actor entry.
  """
  input AddActorInput {
    name: String!
    gender: InputID!
    photoUrl: String!
  }
  """
  Input type for updating an actor entry.
  """
  input UpdateActorInput {
    name: String
    gender: InputID
    photoUrl: String
  }

  type Query {
    """
    Fetch all actors entry.
    """
    actors: [Actor]
    """
    Fetch one actor entry by id.
    """
    actor(id: ID!): Actor
  }
  type Mutation {
    """
    Add a new actor entry.
    """
    addActor(params: AddActorInput!): Actor
    """
    Update a actor entry.
    """
    updateActor(id: ID!, update: UpdateActorInput!): Actor
    """
    Delete a actor entry.
    """
    deleteActor(id: ID!): String
  }
`;
