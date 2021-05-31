import { ObjectId } from "@kaviar/ejson";
import * as X from "@kaviar/x-bundle";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";

export default {
  Query: [
    [],
    {
      todosFindOne: [X.CheckLoggedIn(), X.ToNovaOne(TodosCollection)],
      todosFind: [X.CheckLoggedIn(), X.ToNova(TodosCollection, (_, _2, ctx, _3) => {
        return {
          filters: {
            userId: new ObjectId(ctx.userId)
          }
        }
      })],
      todosCount: [X.CheckLoggedIn(), X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      todosInsertOne: [
        X.CheckLoggedIn(),

        async (_: any, args: any, ctx: any, ast: any) => {

          const filters = {
            userId: ctx.userId,
            title: args.document.title,
          }

          const checkExistsSameTitle = await X.ToCollectionCount(TodosCollection, (_: any, _2: any, _3: any) => filters)(_, args, ctx, ast)

          if (checkExistsSameTitle) {
            throw new Error('You have a Todo with the exact same title already.')
          }

          const argsWithUserID = {
            document: {
              ...args.document,
              userId: new ObjectId(ctx.userId),
              order: await X.ToCollectionCount(TodosCollection)(_, args, ctx, ast) + 1
            }
          }

          const _id = await X.ToDocumentInsert(TodosCollection)(_, argsWithUserID, ctx, ast)

          return await X.ToNovaByResultID(TodosCollection, () => ({
            filters: {
              _id
            }
          }))(_, args, ctx, ast)
        },

        // X.ToDocumentInsert(TodosCollection),
        
        // X.ToNovaByResultID(TodosCollection),
      ],
      todosUpdateOne: [
        X.CheckLoggedIn(),
        X.CheckDocumentExists(TodosCollection),

        async (_: any, args: any, ctx: any, ast: any) => {
          const filters = {
            _id: args._id,
            userId: ctx.userId
          }

          const checkExists = await X.ToCollectionCount(TodosCollection, (_: any, _2: any, _3: any) => filters)(_, args, ctx, ast)

          if (!checkExists) {
            throw new Error('Invalid mutation - trying to modify other user\'s Todo.')
          }
        },

        X.ToDocumentUpdateByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],

      todosDeleteOne: [
        X.CheckLoggedIn(),

        async (_: any, args: any, ctx: any, ast: any) => {
          const filters = {
            _id: args._id,
            userId: ctx.userId
          }

          const checkExists = await X.ToCollectionCount(TodosCollection, (_: any, _2: any, _3: any) => filters)(_, args, ctx, ast)

          if (!checkExists) {
            throw new Error('Invalid mutation - trying to modify other user\'s Todo.')
          }
        },

        X.CheckDocumentExists(TodosCollection),
        X.ToDocumentDeleteByID(TodosCollection),
      ],
    },
  ],
};
