export default /* GraphQL */ `
  type Query {
    todosFindOne(query: QueryInput): Todo
    todosFind(query: QueryInput): [Todo]!
    todosCount(query: QueryInput): Int!
  }

  type Mutation {
    todosInsertOne(document: EJSON!): Todo
    todosUpdateOne(_id: ObjectId!, modifier: EJSON!): Todo!
    todosDeleteOne(_id: ObjectId!): Boolean
  }
`;
