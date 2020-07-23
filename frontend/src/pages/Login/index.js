import React, { Component } from 'react';
import './styles.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import FormLogin from '../../Components/FormLogin'

export default class Login extends Component {

    constructor(props){
        super(props);

    }


    render(){

        return(
        <div className="container"> 
            <section className="formulario z-depth-2"> 
            <h1>QuickCV</h1>
            <h5>Acesso de usuário</h5>
            <FormLogin />
        
            <p>Não possui cadastro? </p><Link to="/cadastro">Cadastre-se!</Link>
            </section>
        </div>

    );
}
}