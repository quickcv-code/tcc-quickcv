import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import api from '../services/api';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';
import M from 'materialize-css';

export default function FormRegistro(){
    const [nome,setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email,setEmail] = useState('');
    const [confirmaEmail,setConfirmaEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [confirmaSenha,setConfirmaSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nascimento, setNascimento] = useState('');

    const history = useHistory();

    async function handleRegister(event){

        event.preventDefault();

        const data = {
            confirmaEmail,
            email,
            senha,
            confirmaSenha,
            telefone, 
            nascimento,
            nome,
            sobrenome
        }

        try{

            const res = await api.post('usuarios/criar', data);
            alert(`Seu id de acesso:${res.data.user.id}`);

            history.push('/');
        } catch(err) {

            alert('Erro no Cadastro, tente novamente.');
        }
    }

    return(

      <form onSubmit={handleRegister}>               

                <div className="row">
                    <div className="input-field col s6">
                        <input 
                        id="email"
                         name="email" 
                         type="email" 
                         className="validate"
                         value={email}
                         onChange={ event => setEmail(event.target.value)}/>
                        <label htmlFor="email">Email</label>
                    </div>
                
                    <div className="input-field col s6">
                        <input 
                        id="confirmaEmail"
                         name="confirmaEmail" 
                         type="email" 
                         className="validate"
                         value={confirmaEmail}
                         onChange={ event => setConfirmaEmail(event.target.value)}/>
                        <label htmlFor="confirmaEmail">confirma Email</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
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
                
                    <div className="input-field col s6">
                        <input 
                         id="confirmaSenha"  
                         name="confirmaSenha"
                         type="password" 
                         className="validate" 
                         value={confirmaSenha}
                         onChange={ event => setConfirmaSenha(event.target.value)}
                         />
                        <label htmlFor="confirmaSenha">confirma Senha</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input 
                         id="nome"  
                         name="nome"
                         type="text" 
                         className="validate" 
                         value={nome}
                         onChange={event => setNome(event.target.value)}
                         />
                        <label htmlFor="nome">Nome</label>
                    </div>
               
                    <div className="input-field col s6">
                        <input 
                         id="sobrenome"  
                         name="sobrenome"
                         type="text" 
                         className="validate" 
                         value={sobrenome}
                         onChange={event => setSobrenome(event.target.value)}
                         />
                        <label htmlFor="sobrenome">Sobrenome</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s6">
                        <input 
                         id="telefone"  
                         name="telefone"
                         type="tel" 
                         className="validate" 
                         value={telefone}
                         onChange={event => setTelefone(event.target.value)}
                         />
                        <label htmlFor="telefone">Telefone</label>
                    </div>
                
                    <div className="input-field col s6">
                        <input
                        id="nascimento"
                        name="nascimento"
                        type="text"
                        className="validate"
                        onChange={event => setNascimento(event.target.value)}
                        value={nascimento}/>
                        <label htmlFor="nascimento">nascimento</label>
                    </div>
                </div>
                    <center>
                    <div className="row">
                    <div className="col s4"></div>
                    <button  className=" btn waves-effect waves-light blue darken-4 col s4" type="submit" name="action" >Salvar
                        <i className="material-icons right">save</i>
                    </button>
                    </div>
                    </center>
                    <div className="divider"></div>  
        </form>
        );
}