import React from 'react';
import {Switch} from 'react-router-dom';
import Route from './Route';
import SignIn from '../pages/SignIn'
import DashBoard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
export default function Routes() {
  return(
    <Switch>
      <Route path="/" exact component={SignIn}/>
      <Route path="/register" component={SignUp}/>
      <Route path="/dashboard" component={DashBoard} isPrivet/>
      <Route path="/profile" component={Profile} isPrivet/>

      
    </Switch>
  )
}