import { useState, useEffect } from 'react'
import { useGuardian, useRouter } from '@kaviar/x-ui'
import { Layout } from '../../components/Layout'
import * as Routes from '../routes'

import { Jumbotron, Container } from 'react-bootstrap'
import { Todo, CreateTodo, ITodo } from '../../components/Todo'

import { use } from "@kaviar/x-ui"
import { TodosCollection } from '../../collections/Todos'

import { ReactSortable } from 'react-sortablejs'

export const MyTodos = () => {
    const router = useRouter()
    const guardian = useGuardian()

    const [todos, setTodos] = useState <ITodo[]> ([])

    const { isLoggedIn, fetchingUserData } = guardian.state

    const todosCollection = use(TodosCollection)

    const removeTodo = (_id: any) => {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== _id))
    }

    const modifyCollectionOrder = (_: any) => {
        for (let i = 0; i < todos.length; ++i) {
            todosCollection.updateOne(todos[i]._id, {
                $set: {
                    order: i
                }
            })
        }
    }

    useEffect(() => {
        todosCollection.find({}, {
            _id: 1,
            title: 1,
            description: 1,
            checked: 1,
            order: 1
        }).then(data => {
            const todos = data as unknown as ITodo[]

            console.log(data)

            setTodos(todos.sort((todo1, todo2) => todo1.order - todo2.order))
        })
        .catch(err => {
            console.log(err)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (fetchingUserData) {
        return null
    }

    if (!isLoggedIn) {
        router.go(Routes.HOME)
    }

    return (
        <Layout>
            <Jumbotron className = 'bg-info'>

                <CreateTodo
                    setTodos = { setTodos }
                />                

                <ReactSortable
                    list = { todos }
                    setList = { setTodos }
                    animation = { 200 }
                    className = 'mt-2 mr-4'
                    style = { { overflowY: 'auto' } }
                    onEnd = { modifyCollectionOrder }>
                    {
                        todos.map(todo => {
                            return (
                                <Container className = 'mt-2' key = { todo._id }>
                                    <Todo
                                        remove = { removeTodo }
                                        { ...todo }/>
                                </Container>
                            )
                        })
                    }
                </ReactSortable>
            </Jumbotron>
        </Layout>
    )
}
