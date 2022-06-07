import React, { useContext } from "react";
import ToastComponent from "../components/Toastify";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { color } from "../styles/color.css";
import { Container, Row, Col } from "react-bootstrap";
import { Store } from "../Store";


export default function HeaderClient() {
    const { state, dispatch } = useContext(Store);
    const user = state.userInfo;

    const handleUserLogout = () => {
        dispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('userInfo');
        toast.success('Account logout successfully');
    }

    return (
        <>
        <ToastComponent />
            <Header>
                <Container>
                    <Row>
                        <Col xl={12}>
                        <Content>
                            <Logo to="/admin"><img src="logo.png" alt="logo" /></Logo>
                            <NavList>
                                <NavItem><NavLink to="/">Home</NavLink></NavItem>
                                <NavItem><NavLink to="#">Product</NavLink></NavItem>
                                <NavItem><NavLink to="#">Vendor</NavLink></NavItem>
                                <NavItem><NavLink to="#">users</NavLink></NavItem>
                                <NavItem><NavLink to="#">pages</NavLink></NavItem>
                            </NavList>
                            <WidgetGroup>
                                <WidgetLink to="#">
                                    <WidgetIcon className="fa-solid fa-scale-balanced"></WidgetIcon>
                                    <WidgetNumber>01</WidgetNumber>
                                </WidgetLink >
                                <WidgetLink to="#">
                                    <WidgetIcon className="fa-solid fa-heart"></WidgetIcon>
                                    <WidgetNumber>05</WidgetNumber>
                                </WidgetLink>
                                <WidgetLink to="#">
                                    <WidgetIcon className="fa-solid fa-bag-shopping"></WidgetIcon>
                                    <WidgetNumber>03</WidgetNumber>
                                </WidgetLink>
                            </WidgetGroup>
                            <UserGroup>
                                <UserIcon className="fa-solid fa-user"></UserIcon>
                                <UserText>{user ? user.name.split(' ')[0] : 'join us'}</UserText>
                                {user ?
                                    <DropdownList>
                                        <DropdownItem><DropdownLink to="/admin">dashboard</DropdownLink></DropdownItem>
                                        {user.isVendor ?
                                            <DropdownItem><DropdownLink to="/product-upload">product upload</DropdownLink></DropdownItem>
                                        :
                                            <DropdownItem><DropdownLink to="/vendor">vendorship</DropdownLink></DropdownItem>
                                        }
                                        <DropdownItem><DropdownBtn type="button" onClick={handleUserLogout}>logout</DropdownBtn></DropdownItem>
                                    </DropdownList>
                                :
                                    <DropdownList>
                                        <DropdownItem><DropdownLink to="/login">login</DropdownLink></DropdownItem>
                                        <DropdownItem><DropdownLink to="/register">registration</DropdownLink></DropdownItem>
                                        <DropdownItem><DropdownLink to="/forgot-password">forgot password</DropdownLink></DropdownItem>
                                    </DropdownList>
                                }
                            </UserGroup>
                        </Content>
                        </Col>
                    </Row>
                </Container>
            </Header>
        </>
    )
}

//====================================
//        THIS COMPONENT STYLES
//====================================
const Header = styled('header')`
    margin: 25px 0px;
`;
const Content = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 25px;
    border-radius: 12px;
    background: ${color.dark[200]};
`;
const Logo = styled(Link)`
    img { 
        width: 200px; 
        filter: contrast(5);
    }
`;
const NavList = styled('ul')`
    display: flex;
    align-items: center;
    column-gap: 28px;
`;
const NavItem = styled('li')``;
const NavLink = styled(Link)`
    padding: 30px 0px;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: ${color.gray[200]};
`;
const WidgetGroup = styled('div')`
    display: flex;
    align-items: center;
    column-gap: 28px;
`;
const WidgetLink = styled(Link)`
    display: flex;
    align-items: center;
    column-gap: 8px;
    position: relative;
    color: ${color.gray[200]};
`;
const WidgetIcon = styled('i')`
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    font-size: 14px;
    background: ${color.dark[100]};
`;
const WidgetNumber = styled('sup')`
    position: absolute;
    top: -12px;
    right: -15px;
    width: 28px;
    height: 28px;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    background: ${color.dark[100]};
    border: 3px solid ${color.dark[200]};
`;
const UserGroup = styled('div')`
    display: flex;
    align-items: center;
    column-gap: 8px;
    padding: 22px 0px;
    position: relative;
    cursor: pointer;
    color: ${color.gray[200]};

    &:hover ul {
        top: 85px;
        opacity: 1;
        visibility: visible;
    }
`;
const UserIcon = styled(WidgetIcon)``;
const UserText = styled('span')`
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.2px;
    text-transform: uppercase;

    &::after {
        content: "\f078";
        font-size: 12px;
        font-weight: 900;
        margin-left: 5px;
        font-family: "Font Awesome 6 Free";
    }
`;
const DropdownList = styled('ul')`
    position: absolute;
    top: 50px;
    right: -15px;
    padding: 15px;
    min-width: 220px;
    max-width: 220px;
    border-radius: 8px;
    background: ${color.dark[300]};
    opacity: 0;
    visibility: hidden;
    transition: all linear .3s;
`;
const DropdownItem = styled('li')``;
const DropdownLink = styled(Link)`
    width: 100%;
    font-weight: 500;
    padding: 7px 15px;
    border-radius: 8px;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    color: ${color.gray[200]};
    transition: all linear .3s;

    &:hover {
        color: ${color.gray[200]};
        background: ${color.dark[100]};
    }
`;
const DropdownBtn = styled('button')`
    width: 100%;
    font-weight: 500;
    text-align: left;
    padding: 8px 15px;
    border-radius: 8px;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    border: none;
    background: none;
    color: ${color.gray[200]};
    transition: all linear .3s;

    &:hover {
        color: ${color.gray[200]};
        background: ${color.dark[100]};
    }
`;
