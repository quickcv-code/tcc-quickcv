import React, { useState, useEffect } from 'react';
import 'materialize-css';
import api from '../../../services/api'



export default function CurriculoHeader(){
        

        const email = localStorage.getItem('@quickcv/email');
        const user_id = localStorage.getItem('@quickcv/user');
        const nascimento = localStorage.getItem('@quickcv/user_nascimento');
        const curr_id = localStorage.getItem('@quickcv/curriculo_id');
        const [curr, setCurr] = useState({});
        
        

            useEffect(()=> {
                api.get(`curriculos/buscar/${curr_id}`)
                .then(res => {
                setCurr(res.data);
                })
            }, [user_id]);
        
        const {
            nome_completo,
            telefone,
            estado_civil,
            nacionalidade,
            dependentes,
            endereco,
            cidade,
            estado,
            site_profissional1,
            site_profissional2
        } = curr;

        const idade = new Date().getFullYear() - nascimento.split('-')[0];
        

        return(
            <header>
                <div className="row">
                    <div className="col s4">
                        <h3>{nome_completo}</h3>
                    </div>
                    <div className="col s8">
                      <p><strong>{nacionalidade} | {idade}  Anos | {estado_civil} | Dependentes: {dependentes}</strong></p> 
                      <p><strong>Endereço: </strong>{endereco} - {cidade} - {estado}</p> 
                      <p><strong>Contato: </strong>{email} | Tel: {telefone}</p> 
                      <a>{site_profissional1}</a> <br/>
                      <a>{site_profissional2}</a>
                    </div>
                    
                </div>
                <div className="divider"></div>
            </header>
        );


}