import React from "react";
import {
    Inject, ScheduleComponent, Month, ViewsDirective, ViewDirective
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
import {DataManager, ODataV4Adaptor} from '@syncfusion/ej2-data';
import * as axios from "axios";

class CustomAdaptor extends ODataV4Adaptor {
    state = {
        myData: []
    }

    processResponse() {
        this.getClass();
        let i = 0;
        let original = this.state.myData;
        original.forEach((item) => item['EventID'] = ++i);
        return original;
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
            url: 'http://localhost:8091/class-management/my-class'
        };
        const response = await axios(options);
        const myData = response.data.map(myClass => {
            let start = new Date(myClass.startTime.toString());
            let finish = new Date(myClass.finishTime.toString());
            return (
                {
                    Id: myClass.id,
                    Subject: myClass.name,
                    StartTime: new Date(start.toISOString().substring(0, 10)),
                    EndTime: new Date(finish.toISOString().substring(0, 10))
                }
            )
        })
        this.state.myData = myData;
        console.log(this.state.myData)
    }
}

class SchedulerMyClass extends React.Component {

    constructor() {
        super(...arguments);
        this.dataManager = new DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
            adaptor: new CustomAdaptor
        });
    }

    render() {
        return (
            <ScheduleComponent selectedDate={new Date(2020, 12, 15)}
                               readonly={true} eventSettings={{dataSource: this.dataManager}} currentView='Month'
                               firstDayOfWeek={1} className={"margin-left"}>
                <ViewsDirective>
                    <ViewDirective option='Month'/>
                </ViewsDirective>
                <Inject services={[Month]}/>
            </ScheduleComponent>
        )
    }
};
export default SchedulerMyClass;