'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('candidaturas',{

      id: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_curriculo: {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: { model : 'curriculos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      id_vaga: {
        type:Sequelize.INTEGER,
        allowNull: false,
        references: { model : 'vagas', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      });
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('candidaturas');
  }
};
