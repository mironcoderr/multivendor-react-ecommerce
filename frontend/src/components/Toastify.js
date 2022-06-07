import React from "react";
import styled from "styled-components";
import { color } from "../styles/color.css";
import { ToastContainer } from "react-toastify";

export default function ToastComponent() {
    return (
        <ToastStyled />
    );
}

const ToastStyled = styled(ToastContainer)`
    .Toastify__toast {
        right: 3.5em;
        min-height: auto;
        width: 320px;
        margin-bottom: 0px;
        border-radius: 8px;
        padding: 16px 18px 20px;
        font-family: inherit;
        letter-spacing: 0.2px;
    }
    
    .Toastify__toast-body {
        padding: 0px;
    }

    .Toastify__toast-theme--light {
        color: ${color.gray[100]};
        background: ${color.dark[100]};
    }

    .Toastify__toast-icon {
        width; 18px;
    }

    .Toastify__close-button {
        line-height: 18px;
    }

    .Toastify__close-button--light {
        color: ${color.white};
        opacity: 0.6;
    }
    
    .Toastify__progress-bar {
        height: 3px;
    }
`;