import React, { useState, useEffect } from 'react';
import CurriculoHeader from './CurriculoHeader';
import api from '../../services/api'


export default function Curriculo(props){

    const user_id = localStorage.getItem('@quickcv/user_id');
    const curr_id = props.idcurriculo;
    const [modalIsOpen, setModalIsOpen] = useState(true);

    


    return(
            <CurriculoHeader/>  
    );
}