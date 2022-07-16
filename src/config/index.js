/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config();

/*  ENV VARIABLES  */

// MAIN SERVER
const port = process.env.PORT || 3000;
// DATABASE 
const db_name = process.env.DATABASE_NAME;
const db_user = process.env.DATABASE_USER;
const db_pw = process.env.DATABASE_PASSWORD;
const db_host = process.env.DATABASE_HOST;
const db_dialect = process.env.DATABASE_DIALECT;
const db_port = process.env.DATABASE_PORT;
// JWT 
const jwt_key = process.env.JWT_KEY;
const jwt_time = process.env.JWT_TIME;
// BCRYPT 






/* MAIN CONFIGURATION SERVER */
const express = require('express');
const app = express();
const cors = require('cors');   
const helmet = require('helmet'); 
const chalk = require('chalk'); 

function main() { 

	app.use(express.json());
	app.use(express.urlencoded({ extended: true })); 

	app.use(cors()); 
	app.use(helmet());

	// eslint-disable-next-line no-unused-vars
	app.listen(port, (req, res) => {
		console.log(chalk.bgGreen(`Server running in port ${port}`));
	});
} 



module.exports = {
	main,
	port
};