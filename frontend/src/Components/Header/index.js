import React from 'react';
import LinkWrapper from '../HighOrderComponents/LinkWrapper';


export default function Header(){

    return(
        <nav>
        <div className="nav-wrapper blue darken-4">
            <div className="container">
            <LinkWrapper to="/" className="brand-logo pd-10" activeStyle={{}}>QuickCV</LinkWrapper>
          <ul  className="right">

            
            <li> <LinkWrapper to="/main/vagas">Vagas</LinkWrapper></li>
            <li> <LinkWrapper to="/main/curriculos">Currículos</LinkWrapper></li>
            <li> <LinkWrapper to="/sobre">Empresas</LinkWrapper></li>
            
          </ul>
            </div>
         
        </div>
      </nav>
    );
}