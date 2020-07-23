'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'usuarios',
        'senha_reset_token',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'usuarios',
        'senha_token_expira',
        {
          type: Sequelize.DATE,
          allowNull: true
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('usuarios', 'senha_reset_token'),
      queryInterface.removeColumn('usuarios', 'senha_token_expira')
    ]);
  }
};
