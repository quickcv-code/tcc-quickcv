import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom'

import 'materialize-css'

export default function BotaoProcessoSeletivo(props){


    const processo = props.processo;
    if(processo){
        return (
            <div>
                <strong className="strong-verde" >Esta vaga possui um processo seletivo!</strong>
            </div>
        );
    } else {
        return null;
    }
}