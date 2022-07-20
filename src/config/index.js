/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();

// Main server
const port = process.env.PORT || 3000;

/* Main configuration server */
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const chalk = require('chalk');
const apiRouter = require('../routes/api');

function main() {

	require('../database/conn');
	require('../database/assoc');
	require('../database/sync');

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.use(cors());
	app.use(helmet());

	app.use(apiRouter); 
	
	app.listen(port, () => {
		console.log(chalk.bgGreen(`Server running in port ${port}`));
	});
}

module.exports = {
	main
};