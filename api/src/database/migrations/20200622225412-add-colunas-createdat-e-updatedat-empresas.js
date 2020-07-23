'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'empresas',
        'created_at',
        {
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn(
        'empresas',
        'updated_at',
        {
          type: Sequelize.DATE
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('empresas', 'created_at'),
      queryInterface.removeColumn('empresas', 'updated_at')
    ]);
  }
};
