import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../../components/layouts'
import { 
    Row,
    Col,
    Container
 } from 'react-bootstrap'
 import { NavLink } from 'react-router-dom'
 import './style.css'

const Home = props => {
    return (
        <div>
            <Layout sidebar >
               
            </Layout>
        </div>
    )
}
    
Home.propTypes = {

}

export default Home
