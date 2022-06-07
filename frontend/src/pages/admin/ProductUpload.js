import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components";
import { color } from "../../styles/color.css";
import { Store } from "../../Store";
import HeaderClient from "../../layouts/Header.client";
import BoxCard from "../../components/BoxCard";
import axios from "axios";
import ToastComponent from "../../components/Toastify";
import { toast } from "react-toastify";

export default function ProductUpload() {

    const [brand, setBrand] = useState('');
    const [brandname, setBrandname] = useState([]);
    const [category, setCategory] = useState('');
    const [categoryname, setCategoryname] = useState([]);
    const { state } = useContext(Store);
    const navigate = useNavigate();
    const user = state.userInfo;

    const handleBrandButton = async () => {
        if(!brand) toast.error('Please give a brand name');
        else {
            await axios.post('http://localhost:8000/brand', { brand: brand });
            setBrand('');
        }
    }

    const handleCategoryButton = async () => {
        if(!category) toast.error('Please give a category name');
        else {
            await axios.post('http://localhost:8000/category', { category: category });
            setCategory('');
        }
    }

    useEffect(()=> {
        async function brandData() {
            const { data } = await axios.get('http://localhost:8000/brand');
            setBrandname(data);
        }
        brandData();
    }, [brand]);

    useEffect(()=> {
        async function categoryData() {
            const { data } = await axios.get('http://localhost:8000/category');
            setCategoryname(data);
        }
        categoryData();
    }, [category]);

    useEffect(()=> { if(!user) navigate('/'); }, [user, navigate]);

    return (
        <>
        <ToastComponent />
        <HeaderClient />
            <Container>
                <Row>
                    <Col xl={6}>
                        <BoxCard title="Add Brand">
                            <Form>
                                <Input type="text" placeholder="Type Barnd" value={brand} onChange={(e)=> setBrand(e.target.value)}/>
                                <Button type="button" value="add data" onClick={handleBrandButton}/>
                            </Form>
                        </BoxCard>
                    </Col>
                    <Col xl={6}>
                        <BoxCard title="Add Category">
                            <Form>
                                <Input type="text" placeholder="Type Category" value={category} onChange={(e)=> setCategory(e.target.value)} />
                                <Button type="button" value="add data" onClick={handleCategoryButton}/>
                            </Form>
                        </BoxCard>
                    </Col>
                    <Col xl={12}>
                        <BoxCard title="Add Product">
                            <form>
                                <Row>
                                    <Col className="col-xl-4 mb-4"><Input type="text" placeholder="Product Name"/></Col>
                                    <Col className="col-xl-4 mb-4"><Input type="text" placeholder="Product Price"/></Col>
                                    <Col className="col-xl-4 mb-4">
                                        <Select>
                                            <option>Product Brand</option>
                                            {brandname.map((item)=> (
                                                <option key={ item._id } value={ item.brand }>{ item.brand }</option> 
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col className="col-xl-4 mb-4">
                                        <Select>
                                            <option>Product Category</option>
                                            {categoryname.map((item)=> (
                                                <option key={ item._id } value={ item.category }>{ item.category }</option>
                                            ))}
                                        </Select>
                                    </Col>
                                    <Col className="col-xl-4 mb-4">
                                        <Select>
                                            <option>Product Color</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Select>
                                    </Col>
                                    <Col className="col-xl-4 mb-4">
                                        <Select>
                                            <option>Product Size</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </Select>
                                    </Col>
                                    <Col xl={12} className="text-center mt-3"><Button type="button" value="upload product"/></Col>
                                </Row>
                            </form>
                        </BoxCard>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

//====================================
//        THIS COMPONENT STYLES
//====================================
const Form = styled('form')`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 15px;
`;
const Input = styled('input')`
    width: 100%;
    height: 45px;
    padding: 0px 18px;
    border-radius: 8px;
    border: none;
    background: ${color.gray[300]};
`;
const Button = styled('input')`
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    text-transform: uppercase;
    ${(props)=> props.fullWidth ? 'width: 100%;' : 'padding: 0px 25px;'}
    border: none;
    color: ${color.white};
    background: ${color.primary};
`;
const Select = styled('select')`
    width: 100%;
    height: 45px;
    padding: 0px 18px;
    border-radius: 8px;
    border: none;
    color: ${color.text};
    background: ${color.gray[300]};
`;
