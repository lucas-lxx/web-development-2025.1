const { Sequelize } = require('sequelize');
const sqlFormatter = require('sql-formatter');

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    dialect: 'postgres',
    host: 'postgres',
    logging: (msg) => {
      const formattedSql = sqlFormatter.format(msg, { language: 'postgresql' });
      console.log(formattedSql);
    },
    logQueryParameters: true
  }
);

module.exports = sequelize;  