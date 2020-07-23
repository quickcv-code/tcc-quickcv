import React, {Component, useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import 'materialize-css';
import api from '../../services/api';
import Curriculo from '../../Components/Curriculo';

import M from 'materialize-css';
export default function ListaCurriculos(){

  
    const user_id = localStorage.getItem('@quickcv/user_id');
    const [curriculos, setCurriculos] = useState([]);
    const history = useHistory();

    useEffect(()=> {
        api.get(`usuarios/${user_id}/curriculos/lista`)
        .then(res => {
           setCurriculos(res.data)
        })
    }, [user_id]);
        


    async function handleDeleteCurriculo(id){
        try{
            await api.delete(`usuarios/${user_id}/curriculos/deletar/${id}`);

            setCurriculos(curriculos.filter(curr => curr.id != id));


        }catch(err){
            alert('erro ao deletar o caso. Tente novamente.')
        }
    }

    
        return(
            <div className="curriculos-container">
                <div className="row">
                    <div className="col s6">
                    <h1>Meus Currículos</h1>
                    </div>
                    <div className="col s6 ajusta-btn">
                        <a className="blue darken-1 waves-effect waves-light btn-large ">Criar um currículo</a>
                    </div>
                </div>
                

                <ul className="ul-vagas">
                  {
                  curriculos.map(curr =>(
                      <li key={curr.id}>
                          
                         <h5><strong>Objetivo:</strong>{` ${curr.objetivo}`}</h5> 
                         <br/>
                         <p><strong>Criado em:</strong>  {` `}
                         {(new Date(curr.createdAt).getDate())}/
                         {(new Date(curr.createdAt).getMonth()+1)}/
                         {(new Date(curr.createdAt).getFullYear())}
                         </p>
                         <div className="divider"></div>
                         <br/>
                         <Link className="green accent-4 waves-effect waves-light btn mg-20" to={'/main/curriculos/show'} onClick={
                             () => localStorage.setItem('@quickcv/curriculo_id', curr.id)
                         }>Visualizar</Link>
                         <a className="blue darken-1 waves-effect waves-light btn mg-20">Alterar</a>
                         <a className="red darken-3 waves-effect waves-light btn mg-20" onClick={
                             () => handleDeleteCurriculo(curr.id)
                             }>Remover</a>
                      </li>
                  ))}
                </ul>
            </div>
            
        );
}
