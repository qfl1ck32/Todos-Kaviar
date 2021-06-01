import * as X from "@kaviar/x-bundle";
import { TodosCollection } from "../../../collections/Todos/Todos.collection";
import { Todo } from '../../../collections'
import { TodosService } from '../../../services/Todos.service'

export default {
  Query: [
    [],
    {
      todosFindOne: [X.CheckLoggedIn(), X.ToNovaOne(TodosCollection)],
      todosFind: [
        X.CheckLoggedIn(),
        X.ToNova(TodosCollection, (_, _2, ctx, _3) => {
          return {
            filters: {
              userId: ctx.userId
            }
          }
        })
      ],
      todosCount: [X.CheckLoggedIn(), X.ToCollectionCount(TodosCollection)],
    },
  ],
  Mutation: [
    [],
    {
      todosInsertOne: [
        X.CheckLoggedIn(),

        async (_: any, args: any, ctx: any, _2: any) => {

          const todosCollection = ctx.container.get(TodosCollection) as TodosCollection
          const todosService = ctx.container.get(TodosService) as TodosService

          await todosService.checkUserHasTodoSameTitle(ctx.userId, args.document.title)
          
          const data: Partial <Todo> = args.document

          const document: Todo = await todosService.createDocument(ctx.userId, data)

          const inserted = (await todosCollection.insertOne(document)).ops[0]

          return inserted
        },
      ],
      todosUpdateOne: [
        X.CheckLoggedIn(),
        X.CheckDocumentExists(TodosCollection),

        async (_: any, args: any, ctx: any, ast: any) => {
          const todosService = ctx.container.get(TodosService) as TodosService

          await todosService.checkTodoBelongsToUser(ctx.userId, args._id)
        },

        X.ToDocumentUpdateByID(TodosCollection),
        X.ToNovaByResultID(TodosCollection),
      ],

      todosDeleteOne: [
        X.CheckLoggedIn(),
        X.CheckDocumentExists(TodosCollection),

        async (_: any, args: any, ctx: any, ast: any) => {
          const todosService = ctx.container.get(TodosService) as TodosService

          await todosService.checkTodoBelongsToUser(ctx.userId, args._id)
        },

        X.ToDocumentDeleteByID(TodosCollection),
      ],
    },
  ],
};
