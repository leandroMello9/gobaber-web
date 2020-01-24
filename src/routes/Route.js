import React from 'react';
import {Route, Redirect} from 'react-router-dom';
// import { Container } from './styles';
import AuthLayout from '~/pages/_layouts/auth/auth';
import DefaultLayout from '~/pages/_layouts/default/default';
import {store} from '~/store';
export default function RouterWrapper({
  component: Component,
  isPrivet = false,
  ...rest
}) {
  const {signed} = store.getState().auth

  if(!signed && isPrivet === true) {
    return <Redirect to="/"/>
  }
  if(signed && isPrivet === false) {
    return <Redirect to="/dashboard"/>
  }
  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route 
    {...rest}
    render = {props => (
      <Layout>
        <Component/>
      </Layout>
    )}
    
    />
  );
}
