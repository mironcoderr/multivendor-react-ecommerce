import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ToastComponent from "../../components/Toastify";
import HeaderClient from "../../layouts/Header.client";
import TitleComponent from "../../components/PageTitle";
import { toast } from "react-toastify";
import { Store } from "../../Store";


export default function Dashboard() {
    const { state } = useContext(Store);
    const user = state.userInfo;
    const location = useLocation();
    const navigate = useNavigate();
    toast.success(location.state);

    useEffect(()=> { if(!user) navigate('/'); }, [user, navigate]);

    return (
        <>
            <ToastComponent />
            <HeaderClient />
            <TitleComponent name="dashboard page" />
        </>
    );
}
