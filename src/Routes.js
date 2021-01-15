import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import SignUp from './auth/Signup';
import SignIn from './auth/Signin';
import Activate from './auth/Activate';
import Private from './core/Private';
import Admin from './core/Admin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import Explore from './core/Explore';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/" exact component={App} />
                <Route path = "/signup" component={SignUp} />
                <Route path = "/signin" component={SignIn} />
                <Route path = "/explore" component={Explore} />
                <Route path = "/auth/activate/:token" component={Activate} />
                <PrivateRoute path = "/private" component={Private} />
                <AdminRoute path = "/admin" component={Admin} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;