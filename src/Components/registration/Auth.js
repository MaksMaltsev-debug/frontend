import './RegisterService.css';
import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import * as axios from "axios";
import {Redirect} from "react-router-dom";
import Header from "./Header";

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [formValid, setFormValid] = useState(false);
    const [isLogged, setIsLogged] = useState(false);


    const handleAuthorization = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {'login': email, 'password': password},
            url: 'http://localhost:8090/user-management/auth'
        };

        const response = await axios(options);
        if (response.data.token != null) {
            localStorage.setItem("logged", true);
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            setIsLogged(true);
        }
    }

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    useEffect(() => {
        setIsLogged(localStorage.getItem("logged"))
    }, [])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Email is incorrect")
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPasswordError("Password must be more than 3, but less than 15 characters")
            if (!e.target.value) {
                setPasswordError("Password must be more than 3, but less than 15 characters")
            }
        } else {
            setPasswordError("")
        }
    }
    if (!isLogged || !localStorage.getItem("logged")) {
        return (
            <div className={"wrapper"}>
                <Header/>
                <div className={"box"}>
                    <form>
                        <h1>Authorization</h1>
                        <div className={"form-line"}>
                            <label>Email:</label>
                            {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                            <input type="text" onBlur={e => blurHandler(e)} name='email' type='text'
                                   onChange={e => emailHandler(e)}/>
                        </div>
                        <div className={"form-line"}>
                            <label>Password:</label>
                            {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                            <input type="text" onBlur={e => blurHandler(e)} name='password'
                                   onChange={e => passwordHandler(e)}/>
                        </div>
                        <div className={"form-line"}>
                            <button disabled={!formValid} onClick={(e) => handleAuthorization(e)}
                                    variant="primary">Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } else {
        console.log(localStorage.getItem("logged"))
        return (<Redirect to="/cabinet"/>);
    }

}