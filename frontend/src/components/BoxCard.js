import React from "react";
import styled from "styled-components";
import { color } from "../styles/color.css";

export default function BoxCard(props) {
    return (
        <Card>
            <Title>{ props.title }</Title>
            { props.children }
        </Card>
    )
}

//====================================
//        THIS COMPONENT STYLES
//====================================
const Card = styled('div')`
    width: 100%;
    padding: 20px 20px 25px;
    border-radius: 8px;
    margin-bottom: 25px;
    background: ${color.dark[200]};
`;
const Title = styled('h3')`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
    color: ${color.gray[200]};
`;