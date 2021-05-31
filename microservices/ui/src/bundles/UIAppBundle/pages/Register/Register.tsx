import { useGuardian, useRouter, GuardianUserRegistrationType } from '@kaviar/x-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Routes from '../../routes'
import { Layout } from '../../components/Layout'
import { ErrorAlert } from '../../components/ErrorAlert'

import { Jumbotron, Button, Form } from 'react-bootstrap'

export const Register = () => {
  const guardian = useGuardian()

  const router = useRouter()
  const [registerError, setRegisterError] = useState <string> ('')
  const { register, handleSubmit, formState: { errors } } = useForm <GuardianUserRegistrationType> ({})

  const { isLoggedIn } = guardian.state

  const onSubmit = (data: GuardianUserRegistrationType) => {
      guardian
        .register(data)
        .then(() => router.go(Routes.LOGIN))
        .catch((err: any) => {
            setRegisterError(err.toString())
        })
  }

  if (isLoggedIn) {
      router.go(Routes.HOME)
  }

  return (
    <Layout>
        <Jumbotron>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <h3>Register</h3>

                <Form.Group>
                    <Form.Label>First name</Form.Label>
                    <Form.Control {...register('firstName', { required: true }) }/>
                    { errors.firstName && <ErrorAlert message = 'This field is required.'/> }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control {...register('lastName', { required: true })}/>
                    { errors.lastName && <ErrorAlert message = 'This field is required.'/> }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register('email', { required: true, pattern: /^\S+@\S+$/i })}/>
                    { errors.email && <ErrorAlert message = 'Invalid e-mail.'/> }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register('password', { required: true })} />
                    { errors.password && <ErrorAlert message = 'This field is required.'/> }
                </Form.Group>

                <Button block size = 'lg' type = 'submit'>Register</Button>

                { registerError && <ErrorAlert message = { registerError } /> }
            </Form>
        </Jumbotron>
    </Layout>
  )
}
