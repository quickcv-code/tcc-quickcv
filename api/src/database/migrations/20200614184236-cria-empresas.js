'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('empresas',{

      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: { model : 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      razao_social: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      nome_fantasia: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      cnpj: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      endereco: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      home_page1: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      home_page2: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('empresas');
  }
};
