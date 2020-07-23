const { Model, DataTypes } = require('sequelize');


class Usuario extends Model{

    static init(sequelize){

        super.init({

            email:DataTypes.STRING,
            senha:DataTypes.STRING,
            nome:DataTypes.STRING,
            telefone:DataTypes.STRING,
            nascimento:DataTypes.DATE,
            senha_reset_token:DataTypes.STRING,
            senha_token_expira:DataTypes.DATE,
            
        },{
            sequelize
        })
    }
}

module.exports = Usuario;