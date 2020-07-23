'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('vagas',{

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
      titulo: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      empresa: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      descricao: {
        type:Sequelize.TEXT,
        allowNull: false,
      },
      requisitos: {
        type:Sequelize.TEXT,
        allowNull: false,
      },
      informacoes_adicionais: {
        type:Sequelize.TEXT,
        allowNull: false,
      },
      area: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      prazo: {
        type:Sequelize.DATE,
        allowNull: false,
      },
      contato: {
        type:Sequelize.STRING,
        allowNull: false,
      },
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('vagas');
  }
};
