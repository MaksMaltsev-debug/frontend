import React, {useEffect, useState} from "react";
import * as axios from "axios";
import "./PersonalDetails.css"
import './../../.././node_modules/antd/dist/antd.css'
import {Switch} from "antd";

export default function Notifications() {
    const [notificationClassStart, setNotificationClassStart] = useState();
    const [activityInClasses, setActivityInClasses] = useState();
    const [informationAboutUpdates, setInformationAboutUpdates] = useState();

    useEffect(() => {
        getNotifications();
    }, [])
    const handleChangeNotifications = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
                'Content-Type': 'application/json'
            },
            data: {
                'notificationClassStart': notificationClassStart,
                'activityInClasses': activityInClasses,
                'informationAboutUpdates': informationAboutUpdates
            },
            url: 'http://localhost:8091/class-management/notifications'
        };
        await axios(options);
    }
    const getNotifications = async () => {
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
            },
            url: 'http://localhost:8091/class-management/notifications'
        };
        const response = await axios(options);
        setNotificationClassStart(response.data.notificationClassStart);
        setActivityInClasses(response.data.activityInClasses);
        setInformationAboutUpdates(response.data.informationAboutUpdates);
    }

    const handleChangeClassStart = () => {
        notificationClassStart ? setNotificationClassStart(false) : setNotificationClassStart(true);
        console.log(notificationClassStart + " " + activityInClasses + " " + informationAboutUpdates);
    }
    const handleChangeActivityInClasses = () => {
        activityInClasses ? setActivityInClasses(false) : setActivityInClasses(true);
    }
    const handleChangeInformationAboutUpdates = () => {
        informationAboutUpdates ? setInformationAboutUpdates(false) : setInformationAboutUpdates(true);
    }
    return (
        <div className={"content-container"}>
            <div className={"settings-container"}>
                <div className={"name-settings"}>
                    <h2>Newsletter and notifications</h2>
                    <a>Control the newsletter subscription and email notifications.</a>
                    <form>
                        <label className={"margin-top"}>
                            <Switch onChange={(e) => handleChangeClassStart(e)} checked={notificationClassStart}/>
                            <span>I want to receive notification during class start</span>
                        </label>
                        <label className={"margin-top"}>
                            <Switch onChange={(e) => handleChangeActivityInClasses(e)} checked={activityInClasses}/>
                            <span>Email me about activity in subscribed classes</span>
                        </label>
                        <label className={"margin-top"}>
                            <Switch onChange={(e) => handleChangeInformationAboutUpdates(e)}
                                    checked={informationAboutUpdates}/>
                            <span>I want to receive information about new features and updates</span>
                        </label>
                        <span>
          </span>
                    </form>
                    <button className={"back-color"} onClick={(e) => handleChangeNotifications(e)}
                            variant="primary">Save Changes
                    </button>
                </div>
            </div>
        </div>)
}