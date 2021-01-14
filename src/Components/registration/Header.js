import React, {Component} from "react";
import {Container, Navbar, NavbarBrand} from "react-bootstrap";
import logo from '../LogoDB.jpg'
import './RegisterService.css'
export default class Header extends Component {
    render() {
        return (
            <div className={"navbar"}>
                <Container className={"registration-container"}>
                    <Navbar.Brand>
                        <img
                            src={logo}
                            height="50"
                            width="150"
                            className="d-inline-block align-top"
                            alt="Logo"
                        />
                    </Navbar.Brand>
                    <div className={"links"}>
                        <a href="/registration">Registration</a>
                        <a href="/auth">Authorization</a>
                    </div>
                </Container>
            </div>
        )
    }
}