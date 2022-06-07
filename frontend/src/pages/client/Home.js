import React from "react";
import HeaderClient from "../../layouts/Header.client";
import TitleComponent from "../../components/PageTitle";

export default function Home() {
    return (
        <>
            <HeaderClient />
            <TitleComponent name="home page" />
        </>
    );
}



