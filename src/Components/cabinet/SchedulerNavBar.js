import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import SchedulerAllClass from "./SchedulerAllClass";
import SchedulerMyClass from "./SchedulerMyClass";
import "./Scheduler.css";


export default function Scheduler() {

    const [key, setKey] = useState("allClasses");

    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}>

                <Tab eventKey="allClasses" title="ALL CLASSES" >
                    <SchedulerAllClass/>
                </Tab>
                <Tab eventKey="myClasses" title="MY CLASSES">
                    <SchedulerMyClass/>
                </Tab>

            </Tabs>
        </>
    );
}