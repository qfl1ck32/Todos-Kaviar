export default /* GraphQL */ `
  type User {
    _id: ObjectId!
    profile: UserProfile
    email: String
    fullName: String
    roles: [String]
  }

  type UserProfile {
    firstName: String!
    lastName: String!
  }
`;
