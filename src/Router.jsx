import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from "./Components/registration/Auth";

export default function Router() {
    return (
        <Switch>
            <Route path="/auth" exact>
                <Auth />
            </Route>
        </Switch>
    );}