import React, {useEffect, useState} from "react";
import logo from '../LogoDB.jpg'
import {Dropdown, FormControl, Navbar} from "react-bootstrap";
import {Form} from "shards-react";
import './Cabinet.css';
import '../registration/RegisterService.js'
import {Link, useHistory} from 'react-router-dom';
import * as axios from "axios";
import defaultPhoto from "./image/web-user.jpeg";

export default function Header() {
    const history = useHistory();
    const [userProfiles, setUserProfiles] = useState([])
    const [userPhoto, setUserPhoto] = useState([])
    const blob = new Blob([userPhoto], {type: 'image/png'});
    const url = URL.createObjectURL(blob);
    const bt = btoa(unescape(encodeURIComponent(userPhoto)));
    useEffect(() => {
        getUser();
        getPhoto();
    }, [])

    const handleLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("logged");
        localStorage.removeItem("isAuthenticated");
        history.push("/auth");
    }

    const getPhoto = async () => {
        setUserPhoto(null);
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*"
            },
            url: 'http://localhost:8091/class-management/image'
        };
        const response = await axios(options);
        setUserPhoto(response.data);
        return response;
    }

    const getUser = async () => {
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
            },
            url: 'http://localhost:8090/user-management/profile'
        };
        const response = await axios(options);
        localStorage.setItem("userId", response.data.id);
        setUserProfiles(response.data)
        return response;
    }


    return (
        <Navbar bg="white">
            <Navbar.Brand href="/cabinet"><
                img
                src={logo}/>
            </Navbar.Brand>
            <Form inline>
                <FormControl type="text" placeholder="Enter your request" className="mr-sm-3" fullwidth="true"
                             size="medium"/>
            </Form>
            <Dropdown className={"notifications"}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span className="icon-bell"/>
                </Dropdown.Toggle>
                <div className={"container-notifications"}>
                    <Dropdown.Menu>
                        <div className={"submenu"}>
                            <b>Notifications</b>
                            <a href={"/notifications"}>
                                <span className="icon-cog notification-gear"/>
                            </a>
                        </div>
                        <Dropdown.Item>
                            <div className={"submenu-item"}>Example</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-1">
                            <div className={"submenu-item"}>Example</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            </Dropdown>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <img className={"avatar"}
                         src={userPhoto == null ? defaultPhoto : `data:image/jpeg;base64,${userPhoto}`}/>
                    <span className="icon-chevron-down"/>
                </Dropdown.Toggle>
                <div className={"container-user"}>
                    <Dropdown.Menu>
                        <div className={"submenu"}>{userProfiles.name} {userProfiles.lastName}<br/>{userProfiles.login}
                        </div>
                        <Dropdown.Item>
                            <Link to={"/cabinet/student-info/" + localStorage.userId}>
                                <div className={"submenu-item"}>
                                    <span className="icon-person submenu-icon"/>
                                    My Profile
                                </div>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={"/cabinet/settings"}>
                                <div className={"submenu-item"}>
                                    <span className="icon-cog submenu-icon"/>
                                    Settings
                                </div>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleLogout()}>
                            <div className="submenu-item">
                                <span className="icon-exit submenu-icon"/>
                                Logout
                            </div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </div>
            </Dropdown>
        </Navbar>
    )

}