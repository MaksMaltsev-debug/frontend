import React, {useState} from "react";
import  {Tabs,Tab} from "react-bootstrap";
import '../registration/RegisterService.js'
import "./Settings.css";
import PersonalDetails from "./PersonalDetails";
import Passwords from "./Passwords";
import Notifications from "./Notifications";
import DeleteAccount from "./DeleteAccount";


export default function Settings() {

    const [key, setKey] = useState('personalDetails');

    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className={"settings-margin"}
        >
            <Tab eventKey="personalDetails" title="Personal details">
               <PersonalDetails/>
            </Tab>
            <Tab eventKey="passwords" title="Passwords">
                <Passwords/>
            </Tab>
            <Tab eventKey="notifications" title="Notifications">
                <Notifications/>
            </Tab>
            <Tab eventKey="deleteAccount" title="Delete account">
                <DeleteAccount/>
            </Tab>
        </Tabs>
    );
}

