import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import HeaderClient from "../../layouts/Header.client";
import TitleComponent from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { color } from "../../styles/color.css";
import { Store } from "../../Store";

export default function Vendor() {

    const [agreement, setAgreement] = useState(false);
    const { state, dispatch } = useContext(Store);
    const user = state.userInfo;
    const navigate = useNavigate();

    const handleCheckField = async () => {
        const { data } = await axios.put(`http://localhost:8000/vendor/${user._id}`);
        dispatch({ type: 'USER_LOGIN', payload: data });
        localStorage.removeItem('userInfo');
        localStorage.setItem('userInfo', JSON.stringify(data));
    }   

    useEffect(()=> { 
        if(!user) navigate('/');
        else if(Boolean(user.isVendor)) navigate('/add-product');
    }, [user, navigate]);

    return (
        <>
            <HeaderClient />
            <TitleComponent name="vendor page" />
            <AgreeContent>
                <AgreeGroup>
                    <AgreeCheck onChange={()=> setAgreement(!agreement)} type="checkbox" id="check" />
                    <AgreeLabel htmlFor="check">Accept the all our agreement</AgreeLabel>
                </AgreeGroup>
                {agreement ? 
                    <AgreeButton onClick={handleCheckField}>Become a Vendor</AgreeButton> : 
                    <AgreeButton disabled>Become a Vendor</AgreeButton> 
                }
            </AgreeContent>
        </>
    )
}

//====================================
//        THIS COMPONENT STYLES
//====================================
const AgreeContent = styled('div')`
    text-align: center;
`;
const AgreeGroup = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    margin-top: 30px;
    margin-bottom: 20px;
`;
const AgreeCheck = styled('input')`
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    cursor: pointer;
`;
const AgreeLabel = styled('label')`
    font-weight: 500;
    cursor: pointer;
    color: ${color.gray[400]};
    text-transform: capitalize;
`;
const AgreeButton = styled('button')`
    font-weight: 500;
    padding: 14px 30px;
    border-radius: 8px;
    text-transform: capitalize;
    background: ${(props)=> props.disabled ? `${color.dark[100]}` : `${color.primary}`};
    color: ${color.white};
`;