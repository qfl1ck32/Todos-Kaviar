import { useGuardian, useRouter } from '@kaviar/x-ui'
import * as Routes from '../../routes'

import { Navbar, Nav , Container} from 'react-bootstrap'

export function Layout({ children }: any) {
  const guardian = useGuardian()
  const router = useRouter()

  const { isLoggedIn, fetchingUserData } = guardian.state

  const goToLogin = () => {
      router.go(Routes.LOGIN)
  }

  const goToHome = () => {
      router.go(Routes.HOME)
  }

  const goToRegister = () => {
      router.go(Routes.REGISTER)
  }

  const goToMyTodos = () => {
      router.go(Routes.MY_TODOS)
  }

  const logout = () => {
      guardian.logout()
        .then(() => router.go(Routes.HOME))
  }

  if (fetchingUserData) {
      return null
  }

  return (
    <Container fluid className = 'bg-primary vh-100 pt-2' style = { { maxHeight: '100vh', height: '100%' } }>
        <Navbar bg = 'light' variant = 'light' className = 'mb-4'>
            <Navbar.Brand href = '#' onClick = { goToHome }>Todos</Navbar.Brand>
            <Nav className = 'mr-auto'>
                {
                    isLoggedIn ?
                    (
                        <>
                            <Nav.Link href = '#' onClick = { goToMyTodos }>My Todos</Nav.Link>
                            <Nav.Link href = '#' onClick = { logout }>Logout</Nav.Link>
                        </>
                    )
                    :
                    (
                        <>
                            <Nav.Link href = '#' onClick = { goToLogin }>Login</Nav.Link>
                            <Nav.Link href = '#' onClick = { goToRegister }>Register</Nav.Link>
                        </>
                    )
                }
                
            </Nav>
        </Navbar>

        { children }

    </Container>
  )
}
