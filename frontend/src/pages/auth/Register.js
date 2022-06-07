import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastComponent from "../../components/Toastify";
import styled, { css } from "styled-components";
import { color } from "../../styles/color.css";
import { toast } from 'react-toastify';
import axios from "axios";


export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    
    const navigate = useNavigate();

    const handleButtonField = (event) => {
        event.preventDefault();
        if(!name && !email && !number && !password && !cpassword && !checkbox) toast.error('Please fill in the all field');
        else if (!name) toast.error('Please fill in the name field');
        else if (!email) toast.error('Please fill in the email field');
        else if (!number) toast.error('Please fill in the number field');
        else if (!password) toast.error('Please fill in the password field');
        else if (password.length < 6) toast.error('Password must be 6 characters');
        else if (password !== cpassword) toast.error('Password does not matched');
        else if (!checkbox) toast.error('Please accept our terms policy');
        else {
            axios.post('http://localhost:8000/register', {
                name: name,
                email: email,
                number: number,
                password: password,
                checkbox: checkbox,
            });
            setName('');
            setEmail('');
            setNumber('');
            setPassword('');
            setCpassword('');
            setCheckbox(false);
            navigate('/login', { state: 'Your account created successfully. Please Login here!' });
        }
    }
    
    return (
        <>
        <ToastComponent />
            <AuthPage>
                <AuthBanner>
                    <BannerOverlay>
                        <Link to="/"><BannerLogo src="logo.png" alt="logo"></BannerLogo></Link>
                        <BannerHeading>Lorem ipsum dolor sit amet consectetur adipisicing</BannerHeading>
                        <BannerDescrip>Elit Iusto dolore libero recusandae dolor dolores explicabo ullam cum facilis aperiam alias odio quam excepturi molestiae omnis inventore. Repudiandae officia placeat amet consectetur dicta dolorem quo.</BannerDescrip>
                        <BannerButtons>
                            <Link className="home" to="/"><i className="fa-solid fa-house"></i><span>home</span></Link>
                            <Link className="login" to="/login"><i className="fa-solid fa-unlock"></i><span>login</span></Link>
                        </BannerButtons>
                    </BannerOverlay>
                </AuthBanner>

                <AuthForm>
                    <AuthTitle>Register a new account.</AuthTitle>

                    <FieldGroup >
                        <FieldIcon className="fa-solid fa-user"/>     
                        <FieldInput 
                            type="text" 
                            placeholder="User Fullname" 
                            value={name} 
                            onChange={(e)=> setName(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-envelope"/> 
                        <FieldInput 
                            type="email" 
                            placeholder="Email Address" 
                            value={email} 
                            onChange={(e)=> setEmail(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-phone"/>    
                        <FieldInput 
                            type="number" 
                            placeholder="Phone Number" 
                            value={number} 
                            onChange={(e)=> setNumber(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-lock"/>     
                        <FieldInput 
                            type="password" 
                            placeholder="Create Password" 
                            alue={password} 
                            onChange={(e)=> setPassword(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup>
                        <FieldIcon className="fa-solid fa-shield"/>   
                        <FieldInput 
                            type="password" 
                            placeholder="Repeat Password" 
                            value={cpassword} 
                            onChange={(e)=> setCpassword(e.target.value)} 
                        />
                    </FieldGroup>
                    <FieldGroup inline>
                        <FieldCheck 
                            type="checkbox" 
                            id="checkbox" 
                            checked={checkbox} 
                            onChange={(e)=> setCheckbox(e.target.checked)} 
                        />
                        <FieldLabel htmlFor="checkbox">I agree to the all <Link to="#">Terms and Conditions.</Link></FieldLabel>
                    </FieldGroup>

                    <ButtonField type="submit" onClick={handleButtonField}>Register</ButtonField>

                    <Divide><span>or</span></Divide>

                    <SocialButton facebook href="#"><i className="fa-brands fa-facebook"></i><span>Continue with Facebook</span></SocialButton>
                    <SocialButton google href="#"><i className="fa-brands fa-google"></i><span>Continue with Google</span></SocialButton>
                    <SocialButton github href="#"><i className="fa-brands fa-github"></i><span>Continue with Github</span></SocialButton>
                    <AuthSwitch>Already have an account? <Link to="/login">Login</Link></AuthSwitch>
                </AuthForm>

            </AuthPage>
        </>
    );
}

//====================================
//        THIS COMPONENT STYLES       
//====================================
const AuthPage = styled('div')`
    display: flex;
`;
const AuthBanner = styled('div')`
    background-image: url(images/bg/auth.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 68%;
`;
const BannerOverlay = styled('div')`
    height: 100vh;
    padding: 50px 100px;
    background-color: ${color.authbg};
    display: flex;
    flex-direction: column;
    justify-content: center;

    a { place-self: flex-start; }
`;
const BannerLogo = styled('img')`
    width: 220px;
    filter: contrast(5);
    margin-bottom: 40px;
`;
const BannerHeading = styled('h1')`
    color: ${color.gray[100]};
    font-weight: 800;
    text-transform: uppercase;
    margin-bottom: 20px;
`;
const BannerDescrip = styled('p')`
    color: ${color.gray[200]};
    font-size: 18px;
    margin-bottom: 50px;
`;
const BannerButtons = styled('div')`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    column-gap: 25px;

    a {
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        padding: 12px 30px;
        border-radius: 8px;
        text-transform: uppercase;
        border: 2px solid ${color.dark[100]};
        letter-spacing: 0.5px;
        font-size: 14px;
        font-weight: 500;
        text-decoration: none;
        color: ${color.gray[200]};
        transition: all linear .3s;

        &.home { background-color: ${color.dark[100]}; }
        &.login { background-color: transparent; }
    }
`;
const AuthForm = styled('form')`
    width: 32%;
    height: 100vh;
    padding: 50px 50px;
    background-color: ${color.gray[100]};
    overflow-y: auto;
`;
const AuthTitle = styled('h3')`
    margin-bottom: 25px;
    font-size: 22px;
    font-weight: 700;
    color: ${color.heading};
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
    border-radius: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
    background-color: ${color.primary};
    color: ${color.white};
    border: none;
    outline: none;
`;
const FieldCheck = styled('input')`
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    margin-top: 5px;
    cursor: pointer;
`;
const FieldLabel = styled('label')`
    cursor: pointer;
    color: ${color.text};

    a { text-decoration: none; }
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
        background: ${color.gray[200]};
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
        color: ${color.text};
        background: ${color.gray[100]};
        border: 1px solid ${color.gray[200]};
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
    color: ${color.heading};

    a { 
        font-weight: 500;
        text-decoration: none;
    }
`;