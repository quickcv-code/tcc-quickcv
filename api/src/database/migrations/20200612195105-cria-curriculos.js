'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('curriculos',{

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
      nome_completo: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      nascimento: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      estado_civil: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      nacionalidade: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      dependentes: {
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
      site_profissional1: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      site_profissional2: {
        type:Sequelize.STRING,
        allowNull: true,
      },
      formacao_academica: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      objetivo: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      projetos: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      atividades: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      experiencia_profissional: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      formacao_complementar: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      qualificacoes: {
        type:Sequelize.TEXT,
        allowNull: true,
      },
      created_at: {
        type:Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type:Sequelize.DATE,
        allowNull: false,
      },
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('curriculos');
  }
};
