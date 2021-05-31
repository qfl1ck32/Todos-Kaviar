import { Alert } from 'react-bootstrap'

export interface LoginError {
    message: string
}

export const ErrorAlert = (props: LoginError) => {
    const { message } = props

    return <Alert variant = 'danger' className = 'mt-2'>{ message }</Alert>
}
