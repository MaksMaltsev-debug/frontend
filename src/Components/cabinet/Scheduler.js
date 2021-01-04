import React from "react";
import {
    Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, EventSettingsModel
} from "@syncfusion/ej2-react-schedule";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import "./Scheduler.css"
import * as axios from "axios";


class Scheduler extends React.Component {
    state = {
        myData: []
    }
    getClass = async () => {
        const token = localStorage.getItem("token");
        const options = {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + token,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With",
            },
            url: 'http://localhost:8091/class-management/all-class'
        };
        const response = await axios(options);
        const myData = response.data.map(myClass => {
            // let start1 = myClass.startTime.split("T")[0]+" "+myClass.startTime.split("T")[1].split("+")[0];
            // let finish1 = myClass.finishTime.split("T")[0]myClass.finishTime.split("T")[0]+" "+myClass.finishTime.split("T")[1].split("+")[0];
            let start = new Date(myClass.startTime.toString());
            let finish = new Date(myClass.finishTime.toString());
            // let result = new Date(start.toISOString().substring(0, 10));
            // console.log(start.toISOString().substring(0, 10));

            return (
                {
                    Id: myClass.id,
                    Subject: myClass.name,
                    StartTime: new Date(start.toISOString().substring(0, 10)),
                    EndTime: new Date(finish.toISOString().substring(0, 10))
                }
            )
        })


        // this.setState({dataSource: myData})
        this.state.myData = myData;
        console.log(this.data )
        // return myData;
    }

    constructor() {

        super(...arguments);
        this.state={dataSource: []};
        this.getClass();
        this.data = [
            {
            Id: "1019f9a5-070e-476e-82d0-ce61f5ccbf0a",
            Subject: 'Paris',
            StartTime: new Date(2021, 0, 15, 10, 0),
            EndTime: new Date(2021, 0, 15, 12, 30),
        }
        ];

        console.log(this.data)
    }

    componentDidMount() {
        this.getClass();
    }


    render() {
        const data = this.data;
        return <ScheduleComponent selectedDate={new Date(2020, 12, 15)}
                                  eventSettings={{dataSource: this.data}} currentView='Month'>
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
        </ScheduleComponent>;

    }
};
export default Scheduler;