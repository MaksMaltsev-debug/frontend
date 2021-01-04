import React from "react";
import {Col, Container, Nav, Row, Tab} from "react-bootstrap";
import "./TabMenu.css"
import Scheduler from "./SchedulerMyClass";
import Students from "./StudentsTest";
import Settings from "./Settings";
import NavBarClass from "./NavBarClass";
import SchedulerNavBar from "./SchedulerNavBar";

export default function TabMenu() {
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
                        <Nav variant={"pills"} className={"flex-column mt-2"}>
                            {/*<Nav.Item>*/}
                            {/*    {*/}
                            {/*        mas.map((item, index) => (*/}
                            {/*        <Nav.Link eventKey={index}>*/}
                            {/*            {item.name}*/}
                            {/*            <span className="icon-chevron-right"/>*/}
                            {/*        </Nav.Link>)*/}
                            {/*    }*/}
                            {/*</Nav.Item>*/}
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
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}