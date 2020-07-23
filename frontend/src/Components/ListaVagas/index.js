import React, {Component, useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import 'materialize-css';
import api from '../../services/api';
import BotaoProcessoSeletivo from '../HighOrderComponents/BotaoProcessoSeletivo';


export default class ListaVagas extends Component{

    constructor(props){
        super(props);

        this.state = {
            vagas: []
        } 
    }

    componentDidMount(){
        api.get('vaga/listar')
        .then(res => {
            let arrayDeVagas = []
            res.data.forEach(function(dado){
               arrayDeVagas.push(dado);
            });

            this.setState({vagas: arrayDeVagas});
            console.log(this.state);
        });
        
    }

   
    render(){

        const {vagas} = this.state;

        return(
            <div className="vagas-container">
                <div className="row">
                    <div className="col s6">
                    <h1>Lista de Vagas</h1>
                    </div>
                    <div className="col s6 ajusta-btn">
                        <Link className="blue darken-1 waves-effect waves-light btn-small ">Minhas vagas</Link>
                        <Link className="blue darken-1 waves-effect waves-light btn-small">Publicar Vagas</Link>
                        <Link className="blue darken-1 waves-effect waves-light btn-small">Buscar vagas</Link>
                    </div>
                </div>
                

                <ul className="ul-vagas">
                    {vagas.map( vaga => (
                        <li key={vaga.id}>
                            <div className="vaga-div-container">
                                <div className="row">
                                    <div className="col s10">
                                    <h5>{vaga.titulo}</h5>
                                    <h6>{vaga.empresa}</h6>
                                    </div>
                                    <div className="col 2">
                                        <Link className="waves-effect waves-light btn-small blue darken-4">Ver mais</Link>
                                    </div>
                                    
                                </div>
                                <div className="divider"></div>
                                <p> <strong>Descrição:</strong> 
                                      {' ' + vaga.descricao}</p>
                                <div className="row">
                                    <div className="col s6"></div>
                                    <div className="col s6">
                                        <BotaoProcessoSeletivo processo={vaga.processo_seletivo} />
                                    </div>
                                </div>    
                                    
                            </div>
                            
                            <br/>
                        </li>
                    ) )}
                </ul>
            </div>
            
        );
    }
    
   

}