import { useGuardian, useRouter } from '@kaviar/x-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Routes from '../../routes'
import { Layout } from '../../components/Layout'
import { ErrorAlert } from '../../components/ErrorAlert'

import { Jumbotron, Button, Form } from 'react-bootstrap'

type FormInput = {
  email: string
  password: string
}

export const Login = (props: any) => {
  const guardian = useGuardian()

  const router = useRouter()
  const [loginError, setLoginError] = useState <string> ('')
  const { register, handleSubmit, formState: { errors } } = useForm <FormInput> ({})

  const { isLoggedIn } = guardian.state

  console.log(props)
  console.log('^^^')

  const onSubmit = (data: FormInput) => {
      const { email, password } = data

      guardian
        .login(email, password)
        .then(() => router.go(Routes.HOME))
        .catch((err: any) => {
            setLoginError(err.toString())
        })
  }

  if (isLoggedIn) {
      router.go(Routes.HOME)
  }

  return (
    <Layout>
        <Jumbotron>
            <Form onSubmit = { handleSubmit(onSubmit) }>
                <h3>Login</h3>

                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control {...register('email', { required: true, pattern: /^\S+@\S+$/i })}/>
                    { errors.email && <ErrorAlert message = 'Invalid e-mail.'/> }
                </Form.Group>

                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register('password', { required: true })} />
                    { errors.password && <ErrorAlert message = 'Missing passsword.'/> }
                </Form.Group>

                <Button block size = 'lg' type = 'submit'>Login</Button>

                { loginError && <ErrorAlert message = { loginError } /> }
            </Form>
        </Jumbotron>
    </Layout>
  )
}
