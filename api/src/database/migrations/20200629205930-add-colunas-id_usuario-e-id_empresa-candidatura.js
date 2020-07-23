'use strict';


 module.exports = {
    up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.addColumn(
          'candidaturas',
          'id_usuario',
          {
            type: Sequelize.INTEGER,
            allowNull: false
          }
        ),
        queryInterface.addColumn(
          'candidaturas',
          'id_empresa',
          {
            type: Sequelize.INTEGER,
            allowNull: false
          }
        ),
      ]);
    },
  
    down: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.removeColumn('candidaturas', 'id_usuario'),
        queryInterface.removeColumn('candidatruas', 'id_empresa')
      ]);
    }
}