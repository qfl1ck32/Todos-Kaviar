import { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { ErrorAlert } from '../ErrorAlert'
import { useForm } from 'react-hook-form'

import { use } from "@kaviar/x-ui"
import { TodosCollection } from '../../collections/Todos'

export interface ITodo {
    title: string
    description: string
    _id: any
    order: number
    id: any
    checked: boolean
}

export interface CreateTodoProps {
    setTodos: any
}

export const CreateTodo = ({ setTodos } : CreateTodoProps) => {

    const todosCollection = use(TodosCollection)

    const [todoError, setTodoError] = useState <string> ('')
    const { register, handleSubmit, formState: { errors }, reset } = useForm <ITodo> ({})

    const onSubmit = (data: ITodo) => {
        todosCollection.insertOne({
            title: data.title,
            description: data.description,
            checked: false
        })
        .then(todo => {
            const newTodo = {
                _id: todo._id,
                title: data.title,
                description: data.description,
                checked: false
            } as ITodo

            reset()

            setTodos((prevTodos: ITodo[]) => {
                return prevTodos.concat(newTodo)
            })

            setTodoError('')
        })
        .catch((err: any) => {
            setTodoError(err.toString())
        })
    }

    return (
        <Container className = 'd-flex text-white justify-content-center'>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control autoComplete = 'off' {...register('title', { required: true })}/>
                    { errors.title && <ErrorAlert message = 'This field is required.'/> }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control autoComplete = 'off' {...register('description', { required: true })}/>
                    { errors.description && <ErrorAlert message = 'This field is required.'/> }
                </Form.Group>

                <Button block size = 'lg' type = 'submit'>Create todo</Button>

                { todoError && <ErrorAlert message = { todoError } /> }

            </Form>
        </Container>
    )
}
