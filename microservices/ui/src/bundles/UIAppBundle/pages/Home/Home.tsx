import { useGuardian } from '@kaviar/x-ui'
import { Container, Jumbotron } from 'react-bootstrap'
import { Layout } from '../../components/Layout'


export const Home = () => {
    const guardian = useGuardian()

    const { isLoggedIn, user } = guardian.state

    return (
        <Layout>
            <Jumbotron className = 'text-center h-auto d-flex'>
                <Container className = 'justify-content-center'>
                    {
                        isLoggedIn ?
                        (
                            <h5>Welcome, { user.profile.firstName }!</h5>
                        )
                        :
                        (
                            <h5>You're not logged in. Not much to see here.</h5>
                        )
                    }
                </Container>
            </Jumbotron>
        </Layout>
    )

}