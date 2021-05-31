import { useState } from 'react'
import { ListGroupItem, Container, Form, Button } from 'react-bootstrap'
import { ITodo } from '../../components/Todo'
import { use } from "@kaviar/x-ui"
import { TodosCollection } from '../../collections/Todos'

interface IRemove {
    remove: (_id: any) => void
}

export const Todo = ({ title, description, checked, _id, remove } : ITodo & IRemove) => {

    const todosCollection = use(TodosCollection)

    const [checkedState, setCheckedState] = useState(checked)

    const checkedClick = async () => {
        await todosCollection.updateOne(_id, {
            $set: {
                checked: !checkedState
            }
        })

        setCheckedState(prevState => !prevState)
    }

    const handleDelete = async () => {
        
        if (!window.confirm(`Are you sure you want to delete "${ title }"?`))
            return

        await todosCollection.deleteOne(_id)

        remove(_id)
    }

    return (
        <ListGroupItem className = { `d-flex bg-${checkedState ? 'success' : 'warning'}` }>
            <Container className = 'd-flex'>
                <Form.Check
                    type = 'checkbox'
                    checked = { checkedState }
                    onChange = { checkedClick }
                    className = 'mr-2'/>
                <u className = 'font-weight-bold'>{ title }</u>
            </Container>

            <Container>
                { description }
            </Container>

            <Container className = 'col'>
                <Button onClick = { handleDelete } className = 'btn-sm'>Delete</Button>
            </Container>

        </ListGroupItem>
    )
}
