import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Registration from "./Registration";
import Auth from "./Auth";
import Header from "./Header";
import MainLayout from "../cabinet/MainLayout";

export default function registerUserForm() {
    return (
        <div className={"wrapper"}>
            <Router>
                <Switch>
                    <Route exact path={"/registration"} component={Registration}/>
                    <Route exact path={"/auth"} component={Auth}/>
                    <Route exact path={"/"}><Redirect to={"/auth"}/></Route>
                    <Route exact path={"/cabinet*"} component={MainLayout}/>
                </Switch>
            </Router>
        </div>)
}