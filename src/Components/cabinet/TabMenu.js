import React, {useEffect, useState} from "react";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import "./TabMenu.css"
import Students from "./StudentsTest";
import Settings from "./Settings";
import NavBarClass from "./NavBarClass";
import SchedulerNavBar from "./SchedulerNavBar";
import * as axios from "axios";
import SubscribersClass from "./SubscribersClass";
import ClassInfo from "./ClassInfo";


export default function TabMenu() {

    const [subscriptions, setSubscriptions] = useState([])
    const [selectedClass, setSelectedClass] = useState()

    useEffect(() => {
        getSubscriptions();
    }, [])

    const getSubscriptions = async () => {
        const token = localStorage.getItem("token");
        console.log("I am here")
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
                'Content-Type': 'application/json'
            },
            url: 'http://localhost:8091/class-management/subscriptions'
        };
        const response = await axios(options);
        setSubscriptions(response.data);
    };


    return (

        <Container>
            <Tab.Container id={"left-tabs-example"} defaultActiveKey={"scheduler"}>
                <Row>
                    <Col sm={2}>
                        <Nav variant={"pills"} className={"flex-column mt-2 mb-2"}>
                            <Nav.Item>
                                <Nav.Link eventKey={"scheduler"}>
                                    Schedule
                                    <span className="icon-chevron-right"/>
                                </Nav.Link>
                                <Nav.Link eventKey={"classes"}>
                                    Classes
                                    <span className="icon-chevron-right"/>
                                </Nav.Link>
                                <Nav.Link eventKey={"students"}>
                                    Students
                                    <span className="icon-chevron-right"/>
                                </Nav.Link>
                                <Nav.Link eventKey={"settings"}>
                                    Settings
                                    <span className="icon-chevron-right"/>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Nav variant={"pills"} className={"flex-column mt-2 "}>
                            <SubscribersClass classes={subscriptions} onClassChange={setSelectedClass}/>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey={"scheduler"} className={"scheduler-size"}>
                                <SchedulerNavBar/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"classes"}>
                                <NavBarClass/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"students"}>
                                <Students/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"settings"} className={"margin-settings"}>
                                <Settings/>
                            </Tab.Pane>
                            <Tab.Pane eventKey={"subscriber"} className={"margin-settings class-info-content"}>
                                <ClassInfo selectedClass={selectedClass}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}