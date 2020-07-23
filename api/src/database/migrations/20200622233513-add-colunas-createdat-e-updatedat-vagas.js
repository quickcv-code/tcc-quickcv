'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'vagas',
        'created_at',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'vagas',
        'updated_at',
        {
          type: Sequelize.DATE
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('vagas', 'created_at'),
      queryInterface.removeColumn('vagas', 'updated_at')
    ]);
  }
};
