import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth page source
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// admin page source
import Dashboard from "./pages/admin/Dashboard";
import ProductUpload from "./pages/admin/ProductUpload";

// client page source
import Vendor from "./pages/client/Vendor";
import Home from "./pages/client/Home";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vendor" element={<Vendor />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/admin" element={<Dashboard />} />
                <Route path="/product-upload" element={<ProductUpload />} />
            </Routes>
        </BrowserRouter>
    );
}
