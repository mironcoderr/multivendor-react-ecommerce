import { createGlobalStyle } from "styled-components";
import { color } from "./color.css";

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0px;
        padding: 0px;
        outline: 0px;
        box-sizing: border-box;
    }
    body {
        font-size: 16px;
        font-weight: 400;
        color: ${color.text};
        background: linear-gradient(to top, ${color.dark[300]}, ${color.black});
        background-attachment: fixed;
    }
    img {
        vertical-align: middle;
    }
    a {
        text-decoration: none;
        display: inline-block;
    }
    ul,
    ol {
        margin: 0px;
        padding: 0px;
        list-style: none;
        display: inline-block;
    }
    button {
        border: none;
        outline: none;
    }
`;