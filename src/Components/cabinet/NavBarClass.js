import React, {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import "./NavBarClass.css"
import Classes from "./Classes";
import MyClasses from "./MyClasses";


export default function NavBarClass() {

    const [key, setKey] = useState("allClasses");

    return (
        <>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className={"margins"}>

                <div title="Filters" tabClassName={"filters"}>
                </div>

                <Tab eventKey="allClasses" title="ALL CLASSES" tabClassName={"margin-left"}>
                    <Classes/>
                </Tab>
                <Tab eventKey="myClasses" title="MY CLASSES" tabClassName={"margin-left"}>
                    <MyClasses/>
                </Tab>
            </Tabs>
        </>
    );
}