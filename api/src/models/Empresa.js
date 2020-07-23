const { Model, DataTypes } = require('sequelize');


class Empresa extends Model{

    static init(sequelize){

        super.init({

            razao_social:DataTypes.STRING,
            nome_fantasia:DataTypes.STRING,
            cnpj:DataTypes.STRING,
            endereco:DataTypes.STRING,
            cidade:DataTypes.STRING,
            estado:DataTypes.STRING,
            telefone:DataTypes.STRING,
            email:DataTypes.STRING,
            home_page1:DataTypes.STRING,
            home_page2:DataTypes.STRING,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as:'usuario'});
    }
}

module.exports = Empresa;