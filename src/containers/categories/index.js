import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Layout from '../../components/layouts';
import {
    Col,
    Container,
    Row,
    Modal,
    Button
} from 'react-bootstrap';
import Input from '../../components/ui/input'
import CategoryStore from '../../stores/categorystore';
import get from 'lodash.get'

const CategoryPage = props => {
    const [categoryList, setCategoryList] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [parentCategoryId, setparentCategoryId] = useState('')
    const [categoryImage, setCategoryImage] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => {
        const form = new FormData()
        form.append('name', categoryName)
        form.append('parentId', parentCategoryId)
        form.append('categoryImage', categoryImage)
        setShow(false);
    }
    const handleShow = () => setShow(true);
    useEffect(() => {
        CategoryStore.load('GetAllCategories', {
            successCallback: (res) => {
                setCategoryList(get(res, ['data', 'categoryList'], []))
            },
            errorCallback: (err) => {

            },
        })
    }, [])

    const renderCategories = (categories) => {
        const categoryLists = [];
        for (let category of categories) {
            categoryLists.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>
                        {renderCategories(category.children)}
                    </ul>) : null}
                </li>
            )
        }
        return categoryLists;
    }

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name})
            if(category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0])
    }



    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <h3>Category</h3>
                            <Button onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(categoryList)}
                        </ul>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Input
                            value={categoryName}
                            placeholder="Category Name"
                            onChange={(e) => {
                                setCategoryName(e.target.value);
                            }}
                        />
                        <select 
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => {
                            setParentCategoryId(e.target.value);
                        }}
                        >
                            <option>Select Category</option>
                            {
                                createCategoryList(categoryList).map(option => (
                                    <option key={option.value} value={option.value}>{option.name}</option>
                                ))
                            }
                        </select>
                        <input type="file" onChange={handleCategoryImage} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </Layout>
    )
}

CategoryPage.propTypes = {

}

export default CategoryPage
