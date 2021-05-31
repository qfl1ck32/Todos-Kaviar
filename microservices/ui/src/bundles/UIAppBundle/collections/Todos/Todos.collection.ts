import { Collection } from '@kaviar/x-ui'

import { ObjectId } from '@kaviar/ejson'

export interface ITodo {
    title: string
    description: string
    checked: boolean
    order: number
    _id: any
    userId: any
}

export class TodosCollection extends Collection <ITodo> {
    getName() {
        return "todos"
    }

    getTransformMap() {
        return {
            _id: (v: string) => new ObjectId(v)
        }
    }
}