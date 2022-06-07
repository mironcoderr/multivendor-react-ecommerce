import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToastComponent from "../../components/Toastify";
import styled, { css } from "styled-components";
import { color } from "../../styles/color.css";
import { toast } from 'react-toastify';
import { Store } from "../../Store";
import axios from "axios";


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(Store);

    const navigate = useNavigate();

    const location = useLocation();
    // toast.success(location.state);

    const handleButtonField = async (event) => {
        event.preventDefault();

        if(!email && !password) toast.error('Please fill in the all field');
        else if (!email) toast.error('Please enter your verified email');
        else if (!password) toast.error('Please enter your password');
        else {
            const { data } = await axios.post('http://localhost:8000/login', {
                email: email,
                password: password,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
            });    

            dispatch({ type: 'USER_LOGIN', payload: data.currentUser });
            localStorage.setItem('userInfo', JSON.stringify(data.currentUser));

            if(data.successMsg) {
                setEmail('');
                setPassword('');
                // toast.success(data.successMsg);
                navigate('/admin', { state: data.successMsg });                                                                                                                                                                                                                            
            }
            else toast.error(data.alert);
        }
    }

    return (
        <>
        <ToastComponent />
        <AuthPage>
            <AuthOverlay>
                <Link to="/"><AuthLogo src="logo.png" alt="logo"></AuthLogo></Link>
                <AuthTitle>Login with Your Credentials.</AuthTitle>
                <AuthForm>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-envelope"/> 
                        <FieldInput 
                            type="email" 
                            placeholder="Enter Your Email" 
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-lock"/>     
                        <FieldInput 
                            type="password" 
                            placeholder="Enter Your Password" 
                            value={password} 
                            onChange={(e)=> setPassword(e.target.value)} 
                        />
                    </FieldGroup>

                    <ButtonField type="submit" onClick={handleButtonField}>login</ButtonField>
                    <AuthSwitch><Link to="/forgot-password">Forgot Your Password?</Link></AuthSwitch>

                    <Divide><span>or</span></Divide>

                    <SocialButton facebook href="#"><i className="fa-brands fa-facebook"></i><span>Continue with Facebook</span></SocialButton>
                    <SocialButton google href="#"><i className="fa-brands fa-google"></i><span>Continue with Google</span></SocialButton>
                    <SocialButton github href="#"><i className="fa-brands fa-github"></i><span>Continue with Github</span></SocialButton>
                    <AuthSwitch>Don't have an account? <Link to="/register">Register</Link></AuthSwitch>
                </AuthForm>
                <AuthNavlist>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/terms">Terms</Link></li>
                    <li><Link to="/privacy">Privacy</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </AuthNavlist>
            </AuthOverlay>
        </AuthPage>
        </>
    );
}


//====================================
//          COMPONENT STYLES                    
//====================================
const AuthPage = styled('div')`
    background-image: url(images/bg/auth.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
`;
const AuthOverlay = styled('div')`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 30px 0px 50px;
    background-color: ${color.authbg};
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`;
const AuthLogo = styled('img')`
    width: 200px;
    filter: contrast(5);
    margin-bottom: 18px;
`;
const AuthTitle = styled('h3')`
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 35px;
    color: ${color.gray[200]};
`;
const AuthForm = styled('form')`
    width: 400px;
    padding: 45px;
    border-radius: 16px;
    margin-bottom: 25px;
    border: 4px solid transparent;
    background: 
        linear-gradient(${color.blue[300]}, ${color.dark[300]}) padding-box,
        linear-gradient(to left, ${color.blue[100]}, ${color.purple[100]}) border-box;
`;
const FieldGroup = styled('div')`
    position: relative;
    margin-bottom: 25px;

    &:focus-within .fa-solid {
        color: ${color.primary};
    }

    ${ props => props.inline ? 
        css`
            display: flex;
            column-gap: 10px;
        `
        : css`` 
    };
`;
const FieldIcon = styled('i')`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 45px;
    height: 45px;
    font-size: 15px;
    line-height: 45px;
    text-align: center;
    color: ${color.text};
    transition: all linear .3s;
`;
const FieldInput = styled('input')`
    width: 100%;
    height: 45px;
    padding: 0px 18px 2px 42px;
    border-radius: 8px;
    outline: none; 
    background-color: ${color.gray[200]};
    border: 1px solid ${color.gray[200]};
    transition: all linear .3s;

    &:focus-visible {
        border-color: ${color.primary};
        background-color: ${color.white};
    }

    &::placeholder {
        font-size: 15px;
    }
`;
const ButtonField = styled('button')`
    width: 100%;
    height: 45px;
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 15px;
    border-radius: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: ${color.primary};
    color: ${color.white};
    border: none;
    outline: none;
`;
const Divide = styled('div')`
    margin: 20px 0;
    position: relative;
    text-align: center;
    z-index: 1;

    &:after {
        position: absolute;
        content: "";
        z-index: -1;
        top: 17px;
        left: 0;
        width: 100%;
        height: 1px;
        background: ${color.blue[100]};
    }

    span {
        width: 38px;
        height: 38px;
        line-height: 32px;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        letter-spacing: .3px;
        font-size: 16px;
        font-weight: 500;
        font-style: italic;
        color: ${color.gray[200]};
        background: ${color.blue[300]};
        border: 1px solid ${color.blue[100]};
    }
`;
const SocialButton = styled('a')`
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    margin-bottom: 20px;
    column-gap: 10px;
    padding: 11px 0px;
    border-radius: 8px;
    font-size: 15px;
    background-color: ${props => 
        props.facebook ? `${color.facebook}` : 
        props.google   ? `${color.google}`   :
        props.github   ? `${color.github}`   : `${color.primary}`
    };
    color: ${color.white};

    &:hover { color: ${color.white}; }
`;
const AuthSwitch = styled('p')`
    display: block;
    text-align: center;
    margin-bottom: 0px;
    color: ${color.gray[300]};

    a { 
        font-weight: 500;
        text-decoration: none;
    }
`;
const AuthNavlist = styled('ul')`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 25px;
    margin: 0px;
    padding: 0px;

    a {
        color: ${color.gray[400]};
        transition: all linear .3s;

        &:hover {
            color: ${color.blue[100]};
            text-decoration: underline;

        }
    }
`;