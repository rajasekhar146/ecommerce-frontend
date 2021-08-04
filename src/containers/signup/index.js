import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/layouts'
import {
    Container,
    Form,
    Row,
    Col,
    Button
} from 'react-bootstrap'
import Input from '../../components/ui/input';
import useStore from '../../hooks/use-store';
import AuthStore from '../../stores/authstore';
import SignInStore from '../../stores/signinstore'
import { useHistory } from 'react-router';




const Signup = props => {
    const history = useHistory();
    const [authStoreData] = useStore(AuthStore);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const {
        authToken,
    } = authStoreData;
    if (authToken) {
        history.push('/')
    }


    const handlleSubmit = (e) => {
        e.preventDefault()
        SignInStore.load('Signup', {
            email,
            password,
            firstName,
            lastName,
            successCallback: (res) => {
                history.push('/signin')
            },
            errorCallback: (err) => {

            },
        })
    }



    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }} className>
                        <Form onSubmit={handlleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        label={'First Name'}
                                        placeholder={'First Name'}
                                        value={firstName}
                                        type="text"
                                        onChange={(e) => {
                                            setFirstName(e.target.value)
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        label={'Last Name'}
                                        placeholder={'Last Name'}
                                        value={lastName}
                                        type="text"
                                        onChange={(e) => {
                                            setLastName(e.target.value)
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Input
                                label={'Email address'}
                                placeholder={'Email address'}
                                value={email}
                                type="email"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />

                            <Input
                                label={'Password'}
                                placeholder={'Password'}
                                value={password}
                                type="password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>

                </Row>

            </Container>

        </Layout>
    )
}

Signup.propTypes = {

}

export default Signup
