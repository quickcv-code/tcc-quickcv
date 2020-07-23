import React from 'react';
import Curriculo from '../../Components/Curriculo';
import './styles.css';

export default class CurriculoPage extends React.Component{

    render(){
        return(
            <div className="curriculo-page-container-background">
                 <div className="page">
                 <Curriculo />
                 </div>
            </div>
        );
    }
}