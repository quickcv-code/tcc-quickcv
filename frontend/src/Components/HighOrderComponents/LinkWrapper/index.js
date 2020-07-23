import React from 'react';

import { NavLink } from 'react-router-dom';

export default  function LinkWrapper(props){
    return (
        <NavLink activeStyle={{fontWeight: "bold", background: "#2962ff"}} {...props} />
    );
}
