import React from 'react';
//pages
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Main from './pages/Main';
import Curriculos from './pages/Curriculos';
import CurriculoPage from './pages/CurriculoPage';


import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
           <Route exact path='/' component={()=> <h1>Hello World</h1>} />  
           <Route path="/login" component={Login}/>
           <Route path="/cadastro" component={Cadastro} />
           <PrivateRoute path="/main/vagas" component={Main} />
           <PrivateRoute exact path="/main/curriculos" component={Curriculos} />
           <PrivateRoute exact path="/main/curriculos/show" component={CurriculoPage} />
           <Route  component={()=> 
           <center><h1>Error 404</h1><p>Página não encontrada :(</p></center> }/>

        </Switch>
        </BrowserRouter>
    );
}

export default Routes;