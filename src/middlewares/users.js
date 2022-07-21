/* eslint-disable no-undef */
const chalk = require('chalk');
const { User } = require('../models/users');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');


const fieldRegister = (req, res, next) => {

	const { name, lastname, email, password } = req.body;

	if (name === '' || lastname === '' || email === '' || password === '') {
		console.log(chalk.bgRed('One of the fields is empty'));
		res.status(400).send('One of the fields is empty');
	} else {
		next();
	}
};

const emailUsed = async (req, res, next) => {

	const { email } = req.body;

	const user = await User.findOne({
		where: {
			email: {
				[Op.eq]: email
			}
		}
	});

	if (user != null) {
		console.log(chalk.bgRed('The email is in use, choose another.'));
		res.status(406).send('The email is in use, choose another.');
	} else {
		return next();
	}
};

const fieldLogin = (req, res, next) => {

	const { email, password } = req.body;

	if (email === '' || password === '') {
		console.log(chalk.bgRed('One of the fields is empty'));
		res.status(400).send('One of the fields is empty');
	} else {
		next();
	}
};

const isLogged = (req, res, next) => {

	const token = req.headers.authorization.replace('Bearer ', '');

	if (token) {
		next();
	} else {
		console.log(chalk.bgRed('You are not logged in'));
		res.status(401).send('You are not logged in');
	}

};

const isAdmin = async (req, res, next) => {
	
	const token = req.headers.authorization.replace('Bearer ', '');

	const data = jwt.decode(token, process.env.JWT_KEY);

	const email = data.email;

	const wasFound = await User.findOne({
		where: {
			email: {
				[Op.eq]: email
			},
			admin: {
				[Op.eq]: true
			}
		}
	});

	if (wasFound != null) {
		next();
	} else {
		console.log(chalk.bgRed('Must be admin'));
		res.status(403).send('Must be admin');
	}
};

module.exports = {
	fieldRegister,
	emailUsed,
	fieldLogin,
	isLogged,
	isAdmin
};
