import React from 'react';


import Header from "./Header";
import TabMenu from "./TabMenuTest";
import {BrowserRouter as Router} from "react-router-dom";


export default function MainLayout() {
    return (
        <div>
            <Router defaultRoute={"/cabinet/scheduler"}>
                <Header/>
                <TabMenu/>
            </Router>
        </div>
    )
}