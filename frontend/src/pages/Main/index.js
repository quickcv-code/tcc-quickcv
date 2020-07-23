import React, { Component, useState, Fragment } from "react";
import { getToken } from '../../services/auth';
import './styles.css';
import 'materialize-css';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { logout } from '../../services/auth';

import Header from '../../Components/Header';
import ListaVagas from '../../Components/ListaVagas';

export default class Main extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            userNome: '',
            userSobreNome: '',
            userEmail: '',
            userID: '',
        }


    }

    componentDidMount(){
        let usuario = localStorage.getItem('@quickcv/usuario');
        let sobrenome = localStorage.getItem('@quickcv/sobrenome');
        let email = localStorage.getItem('@quickcv/email');
        let user_id = localStorage.getItem('@quickcv/user_id');
        let token = getToken();
        this.setState({
            userNome: usuario,
            userSobreNome: sobrenome,
            userEmail: email,
            userID: user_id,
            token
        });
    }



     handleLogout = () =>{
        const { history } = this.props;
        logout();
        localStorage.clear();
        if(history){
            history.push('/login');
        }
    }


    render(){
        
        const {
            userNome,
            userSobreNome,
            userEmail,

        } = this.state
     

        return(
            <Fragment>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col s2">
                    <div className="user-container z-depth-2 blue-grey lighten-5">
                    <h5 style={{fontWeight: "bold"}}>Usuário</h5>
                    <strong>{userNome}<br />{userSobreNome}</strong>
                    <p>{userEmail}</p>
                
                    <br/>
                    <button className="waves-effect waves-light btn-small blue darken-4" onClick={this.handleLogout}>Sair</button>
                </div>

                    </div>
                    <div className="col s10">

                    <ListaVagas />
                    </div>
                </div>
                
                
                   
                
            </div>
            </Fragment>
            
        );
    }
}