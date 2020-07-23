const { Model, DataTypes } = require('sequelize');


class Curriculo extends Model{

    static init(sequelize){

        super.init({

            nome_completo:DataTypes.STRING,
            telefone:DataTypes.STRING,
            nascimento:DataTypes.STRING,
            estado_civil:DataTypes.STRING,
            nacionalidade:DataTypes.STRING,
            dependentes:DataTypes.STRING,
            endereco:DataTypes.STRING,
            cidade:DataTypes.STRING,
            estado:DataTypes.STRING,
            site_profissional1:DataTypes.STRING,
            site_profissional2:DataTypes.STRING,
            formacao_academica:DataTypes.STRING,
            objetivo:DataTypes.STRING,
            projetos:DataTypes.TEXT,
            atividades:DataTypes.TEXT,
            experiencia_profissional:DataTypes.TEXT,
            formacao_complementar:DataTypes.TEXT,
            qualificacoes:DataTypes.TEXT,
        },{
            sequelize
        })
    }
    static associate(models){
        this.belongsTo(models.Usuario, {foreignKey: 'id_usuario', as:'usuario'});
    }
}

module.exports = Curriculo;