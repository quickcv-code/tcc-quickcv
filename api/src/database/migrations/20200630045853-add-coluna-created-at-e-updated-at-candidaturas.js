'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'candidaturas',
        'created_at',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'candidaturas',
        'updated_at',
        {
          type: Sequelize.DATE
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('candidaturas', 'created_at'),
      queryInterface.removeColumn('candidaturas', 'updated_at')
    ]);
  }
};