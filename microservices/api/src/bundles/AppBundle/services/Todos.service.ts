import { Service, Inject, EventManager, ContainerInstance } from "@kaviar/core";
import { Todo, TodosCollection } from "../collections";
import { FilterQuery } from 'mongodb'
import { ObjectId } from "@kaviar/ejson";

@Service()
export class TodosService {
  constructor(protected readonly container: ContainerInstance) {}

  public async count(filters?: FilterQuery <Todo>) {
    return await this.container.get(TodosCollection).find(filters).count()
  }

  public async isUserOwningTodo(filters: FilterQuery <Todo>) {
    return (await this.count(filters)) === 1
  }

  public async checkUserHasTodoSameTitle(userId: ObjectId, title: string) {
    const filters: FilterQuery <Todo> = {
      userId,
      title
    }

    const exists = (await this.count(filters)) === 1

    if (exists) {
      throw new Error('You already have a Todo with the given title.')
    }
  }

  public async checkTodoBelongsToUser(userId: ObjectId, todoId: ObjectId) {
    const filters: FilterQuery <Todo> = {
      userId,
      _id: todoId
    }

    const exists = (await this.count(filters)) === 1

    if(!exists) {
      throw new Error('You are trying to modify other user\'s todo.')
    }
  }

  public async createDocument(userId: string, data: Partial <Todo>) {
    const userIdObject = new ObjectId(userId)
    return {
      ...data,
      userId: userIdObject,
      order: 1 + await this.count({ userId: userIdObject }),
      checked: false
    } as Todo
  }
}
