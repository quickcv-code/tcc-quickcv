const mysql2 = require('mysql2');

module.exports = {
    dialect: 'mysql',
    host:'localhost',
    username: 'dev',
    password: 'dev1',
    database: 'quickcv',
    define: {
        timestamps: true,
        underscored: true,
    },
};