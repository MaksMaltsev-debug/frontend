import './App.css';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router} from "react-router-dom";
import Layout from "./Components/registration/Layout";
import RegisterService from "./Components/registration/RegisterService";

export default function RegistrationForm() {
    return (
        <div className={"wrapper"}>
            <Router>
                <RegisterService/>
            </Router>
        </div>
    );

}

