import React from 'react';
import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';
import FormRegistro from '../../Components/FormRegistro';

import { Link } from 'react-router-dom';


export default function Cadastro () {
    return(
        <div className="container"> 
            <section className="formularioCadastro z-depth-2"> 
            <h1>QuickCV</h1>
            <h5>Cadastro de usuário</h5>
            <div className="row">
            <FormRegistro />
            </div>
            <p>Já possui cadastro? </p><Link to="/login">Faça seu acesso!</Link>
            </section>
        </div>
    );
}