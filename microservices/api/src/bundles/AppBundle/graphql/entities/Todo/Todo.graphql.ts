export default /* GraphQL */ `
  type Todo {
    _id: ObjectId!
    userId: ObjectId!
    order: Int!
    title: String!
    description: String!
    checked: Boolean!
  }
`;
