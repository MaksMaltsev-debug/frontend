import React from 'react';
import {useLocation} from 'react-router-dom';

import RegisterService from "./RegisterService";
import Header from "./Header";

export default function AppLayout() {
    const {pathname} = useLocation();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const Layout = RegisterService;

    return (
        <div>
            <Header/>
            <RegisterService/>
        </div>
    )
}