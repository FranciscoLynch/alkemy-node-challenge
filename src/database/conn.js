/* eslint-disable no-undef */
const chalk = require('chalk');
const { Sequelize } = require('sequelize');
const db_name = process.env.DATABASE_NAME;
const db_user = process.env.DATABASE_USER;
const db_pw = process.env.DATABASE_PASSWORD;
const db_host = process.env.DATABASE_HOST;
const db_dialect = process.env.DATABASE_DIALECT;
const db_port = process.env.DATABASE_PORT;

const sequelize = new Sequelize(db_name, db_user, db_pw, {
	host: db_host,
	dialect: db_dialect,
	port: db_port
});

// The connection to the database is validated 
(async function () {
	try {
		await sequelize.authenticate();
		console.log(chalk.bgGreen('The connection has been established succesfully'));
	} catch (err) {
		console.error(chalk.bgRed('Unable to connect to the database >>>  ', err));
	}
})();

// Exports the database config
module.exports = {
	sequelize
};