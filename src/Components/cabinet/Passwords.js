import React, {useEffect, useState} from "react";
import * as axios from "axios";
import "./PersonalDetails.css"
import {Col} from "react-bootstrap";

export default function Password() {
    const [newSecondPassword, setNewSecondPassword] = useState('');
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [newFirstPassword, setNewFirstPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [formValid, setFormValid] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const options = {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
                'Content-Type': 'application/json'
            },
            data: {'oldPassword': oldPassword, 'firstPassword': newFirstPassword, 'secondPassword': newSecondPassword},
            url: 'http://localhost:8090/user-management/change-password'
        };
        const response = await axios(options);
        console.log(response);
    }

    useEffect(() => {
        if (passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [passwordError])


    const passwordHandler = (e) => {
        setNewFirstPassword(e.target.value)
        if (e.target.value.length < 3 || e.target.value.length > 15) {
            setPasswordError("Password must be more than 3, but less than 15 characters")
            if (!e.target.value) {
                setPasswordError("Password must be more than 3, but less than 15 characters")
            }
        } else {
            setPasswordError("")
        }
    }
    const passwordHandlerSecond = (e) => {
        setNewSecondPassword(e.target.value)
    }

    const passwordHandlerOld = (e) => {
        setOldPassword(e.target.value);
    }

    return (
        <div className={"settings-container"}>
            <div className={"name-settings"}>
                <h2>Passwords</h2>
                <a>We highly recommend you create a strong one.</a>
                <form className={"margin-top"}>
                    <Col sm={12}>
                        <Col sm={6}>
                            <label>Current password</label>
                            <input type={isPasswordShow ? "text" : "password"} name='password'
                                   onChange={e => passwordHandlerOld(e)}
                            />
                        </Col>
                        <Col sm={6} className={"margin-top"}>
                            <span className="icon-eye notification-gear"
                                  onClick={(e) => setIsPasswordShow(!isPasswordShow)}/>
                        </Col>
                    </Col>
                    <Col sm={12}>
                        <Col sm={6}>
                            <label>New password</label>
                            <input type={isPasswordShow ? "text" : "password"} name='firstPassword'
                                   onChange={e => passwordHandler(e)}/>
                        </Col>
                        <Col sm={6} className={"column-padding"}>
                            <label>Repeat new password</label>
                            <input type={isPasswordShow ? "text" : "password"} name='secondPassword'
                                   onChange={e => passwordHandlerSecond(e)}/>
                        </Col>
                    </Col>
                </form>
                <button className={"back-color"} disabled={!formValid} onClick={(e) => handleChangePassword(e)}
                        variant="primary">Save Changes
                </button>
            </div>
        </div>)
}
