const { Model, DataTypes } = require('sequelize');


class Vaga extends Model{

    static init(sequelize){

        super.init({

            titulo:DataTypes.STRING,
            empresa:DataTypes.STRING,
            descricao:DataTypes.TEXT,
            requisitos:DataTypes.TEXT,
            informacoes_adicionais:DataTypes.TEXT,
            area:DataTypes.STRING,
            prazo:DataTypes.DATE,
            disponivel: DataTypes.BOOLEAN,
            contato:DataTypes.STRING,
            processo_seletivo: DataTypes.BOOLEAN,
            id_empresa: DataTypes.INTEGER,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as:'usuario'});
    }
}

module.exports = Vaga;