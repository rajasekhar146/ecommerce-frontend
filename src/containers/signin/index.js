import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Layout from '../../components/layouts'
import {
    Container,
    Form,
    Row,
    Col,
    Button,
} from 'react-bootstrap'
import Input from '../../components/ui/input'
import SignInStore from '../../stores/signinstore'
import { useHistory } from 'react-router';
import get from 'lodash.get'
import {
    setAuthToken,
    setToLocalStorage
} from '../../utils';
import useStore from '../../hooks/use-store';
import AuthStore from '../../stores/authstore'



const Signin = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useHistory();
    const [authStoreData] = useStore(AuthStore);

    const {
        authToken,
    } = authStoreData;


    if (authToken) {
        history.push('/')
    }



    const handlleSubmit = (e) => {
        e.preventDefault()
        SignInStore.load('Signin', {
            email,
            password,
            successCallback: (res) => {
                const user = get(res, ['data', 'user'], null);
                setToLocalStorage('user', JSON.stringify(user))
                setAuthToken(get(res, ['data', 'token'], null))
                history.push('/')
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
                            <Input
                                label={'Email address'}
                                placeholder={'Email address'}
                                value={email}
                                type="text"
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />

                            <Input
                                label={'Password'}
                                placeholder={'Password'}
                                value={password}
                                type="text"
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

Signin.propTypes = {

}

export default Signin
