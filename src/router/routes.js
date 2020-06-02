// Modules
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Containers
import Map from '../containers/map/map';
import Login from '../containers/login/login';
import Signup from '../containers/signup/signup';
import UserInfo from '../containers/user-info/user-info';

// auth: true
// token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDU1ZGM2ODU5MjdjNTNhZTE5NDE4MiIsImlhdCI6MTU5MTA0Nzc2MSwiZXhwIjoxNTkxMTQ3NzYxfQ.hWsSWRYZgLiafdQyhLbxMguZKzbfA77SMOL9kjTqqko"
// user: {result: {_id: "5ed55dc685927c53ae194182", name: "Teste", email: "teste@teste",…}}


function Routers() {

    const logged = (localStorage.getItem('pktime') || '').includes('user');

    return (
        <Switch>
            <Redirect exact path='/' to='/map' />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            {logged
                ?
                    <Route exact path="/map" component={Map} />
                :
                    <Redirect to="/login" />}
            {logged
                ?
                    <Route exact path="/user" component={UserInfo} />
                :
                    <Redirect to="/login" />}                
            {/* <Route exact path='*' component={NotFound} /> */}
        </Switch>
    );
}

export default Routers;