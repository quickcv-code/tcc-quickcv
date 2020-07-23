const { Model, DataTypes } = require('sequelize');


class Candidatura extends Model{

    static init(sequelize){

        super.init({

            id_curriculo: DataTypes.INTEGER,
            id_vaga: DataTypes.INTEGER,
            id_usuario: DataTypes.INTEGER,
            id_empresa: DataTypes.INTEGER
        },{
            sequelize
        })
    }
}

module.exports = Candidatura;