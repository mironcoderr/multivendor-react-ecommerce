import React from "react";
import styled from "styled-components";

export default function TitleComponent(props) {
    return (
        <Title>{ props.name }</Title>
    )
}

//====================================
//        THIS COMPONENT STYLES
//====================================
const Title = styled('h1')`
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    font-size: 55px;
    font-weight: 900;
    margin-top: 150px;
`;