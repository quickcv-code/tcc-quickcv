'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'vagas',
        'id_empresa',
        {
          type: Sequelize.INTEGER,
          allowNull:true,
        });
      },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vagas', 'id_empresa');
  }
};