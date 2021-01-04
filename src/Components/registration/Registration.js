import React, {useEffect, useState} from "react";
import * as axios from "axios";
import './RegisterService.css';
import Header from "./Header";

export default function RegisterUser() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameDirty, setNameDirty] = useState(false);
    const [surnameDirty, setSurnameDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Email cannot be empty");
    const [nameError, setNameError] = useState("Name cannot be empty");
    const [surnameError, setSurnameError] = useState("Surname cannot be empty");
    const [passwordError, setPasswordError] = useState("Password cannot be empty");
    const [formValid, setFormValid] = useState(false);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            data: {'login': email, 'password': password, 'name': name, 'lastName': surname},
            url: 'http://localhost:8090/user-management/register'
        };

        const response = await axios(options);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token)
        console.log(response);
        localStorage.setItem("isAuthenticated", true)
    }
    useEffect(() => {
        if (emailError || passwordError || nameError || surnameError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
            case 'surname':
                setSurnameDirty(true)
                break
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

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError("Email is incorrect")
        } else {
            setEmailError("")
        }
    }

    const surnameHandler = (e) => {
        const re = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[^0-9]+/gi;
        setSurname(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setSurnameError("Surname must be more than 2, but less than 30 characters")
            if (!e.target.value) {
                setSurnameError("Surname must be more than 2, but less than 30 characters")
                if (!re.test(String(e.target.value))) {
                    setSurnameError("Please input correct surname")
                }
            }
        } else {
            setSurnameError("")
        }
    }

    const nameHandler = (e) => {
        const re = /\W/;
        setName(e.target.value)
        if (e.target.value.length < 2 || e.target.value.length > 30) {
            setNameError("Name must be more than 1, but less than 30 characters")
            if (!e.target.value) {
                setNameError("Name must be more than 1, but less than 30 characters")
                if (!re.test(String(e.target.value))) {
                    setNameError("Please input correct name")
                }
            }
        } else {
            setNameError("")
        }
    }
    return (
        <div className={"wrapper"}>
            <Header/>
            <div className={"box"}>
                <form>
                    <h1>Registration</h1>
                    <div className={"form-line"}>
                        <label>Name:</label>
                        {(nameDirty && nameError) && <div style={{color: "red"}}>{nameError}</div>}
                        <input onBlur={e => blurHandler(e)} name='name' type='text'
                               onChange={e => nameHandler(e)}/>
                    </div>
                    <div className={"form-line"}>
                        <label>Surname:</label>
                        {(surnameDirty && surnameError) && <div style={{color: "red"}}>{surnameError}</div>}
                        <input onBlur={e => blurHandler(e)} name='surname' type='text'
                               onChange={e => surnameHandler(e)}/>
                    </div>
                    <div className={"form-line"}>
                        <label>Email:</label>
                        {(emailDirty && emailError) && <div style={{color: "red"}}>{emailError}</div>}
                        <input onBlur={e => blurHandler(e)} name='email' type='text'
                               onChange={e => emailHandler(e)}/>
                    </div>
                    <div className={"form-line"}>
                        <label>Password:</label>
                        {(passwordDirty && passwordError) && <div style={{color: "red"}}>{passwordError}</div>}
                        <input type="text" onBlur={e => blurHandler(e)} name='password'
                               onChange={e => passwordHandler(e)}/>
                    </div>
                    <div className={"form-line"}>
                        <button disabled={!formValid} onClick={(e) => handleRegistration(e)}
                                variant="primary">Registration
                        </button>
                    </div>
                </form>
            </div>
        </div>)
}
