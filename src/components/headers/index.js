import React from 'react'
import {
    Navbar,
    Nav,
    Container,
} from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import useStore from '../../hooks/use-store';
import AuthStore from '../../stores/authstore';
import { useHistory } from 'react-router';
import SignInStore from '../../stores/signinstore'


const Headers = props => {
    const history = useHistory();
    const [authStoreData] = useStore(AuthStore);
    const token = window.localStorage.getItem('token');
    const {
        authToken,
    } = authStoreData;


    const renderLoginLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span onClick={() => {
                        SignInStore.load('Signout', {
                            successCallback: (res) => {
                                localStorage.clear()
                                history.push('/')
                                AuthStore.set({ authToken: null })
                                AuthStore.set({ user: null })
                            },
                            errorCallback: (err) => {

                            },
                        })

                    }} className="nav-link" >
                        Signout
                    </span>
                </li>

            </Nav>
        )
    }
    const renderNonLoginLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to='/signin' className="nav-link" >
                        Signin
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/signup' className="nav-link" >
                        Signup
                    </NavLink>
                </li>
            </Nav>
        )
    }

    return (

        <Navbar bg="dark" variant="dark" expand="lg" style={{ zIndex: 1 }}>
            <Container fluid>
                <Link to="" className="navbar-brand">Admin Dashboard</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                    </Nav>
                    {token
                        ? renderLoginLinks()
                        :
                        renderNonLoginLinks()

                    }

                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}


export default Headers
