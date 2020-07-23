import React, { useState } from 'react';
import { Link, useHistory, withRouter} from 'react-router-dom';
import api from '../services/api';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';
import M from 'materialize-css';
import { login } from '../services/auth';


export default function FormLogin(){

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');

    const history = useHistory();
    
    async function handleLogin(event){
        event.preventDefault();

        const data = {
           email, senha
        }

        try{

            const res = await api.post('login', data);
            const nome = res.data.user.nome;
            const nomes = nome.split(' ');
            const primeiroNome = nomes[0];
            const sobrenome = nomes[1];
            localStorage.setItem('@quickcv/usuario', primeiroNome);
            localStorage.setItem('@quickcv/sobrenome', sobrenome);
            localStorage.setItem('@quickcv/email', res.data.user.email);
            localStorage.setItem('@quickcv/user_id', res.data.user.id);
            localStorage.setItem('@quickcv/user_nascimento', res.data.user.nascimento);
            login(res.data.token);
            history.push('/main/vagas');

        } catch(err) {

            alert('Erro no Cadastro, tente novamente.');
        }
    }
    
  
        return(
            <form onSubmit={handleLogin}>
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                        id="email"
                         name="email" 
                         type="email" 
                         className="validate"
                         value={email}
                         onChange={ event => setEmail(event.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
        
        
                <div className="row">
                    <div className="input-field col s12">
                        <input 
                         id="senha"  
                         name="senha"
                         type="password" 
                         className="validate" 
                          value={senha}
                         onChange={ event => setSenha(event.target.value)}
                         />
                        <label htmlFor="senha">Senha</label>
                    </div>
                </div>
            
        
                <div className="row">
                    <button  className="btn waves-effect waves-light blue darken-4 " type="submit" name="action" >Acessar
                        <i className="material-icons right">send</i>
                    </button>
                </div>
                <div className="divider"></div>  
        </form>
        );
    

}



