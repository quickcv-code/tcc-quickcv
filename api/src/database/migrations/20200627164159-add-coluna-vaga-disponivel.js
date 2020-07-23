'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'vagas',
        'disponivel',
        {
          type: Sequelize.BOOLEAN,
          allowNull:false,
        });
      },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('vagas', 'disponivel');
  }
};