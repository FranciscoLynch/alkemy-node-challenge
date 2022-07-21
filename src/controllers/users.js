/* eslint-disable no-undef */
const chalk = require('chalk');
// Repository, database querys
const { createUser, findUser, findAllUsers, findAndEdit, destroyUser } = require('../repository/users');
// SendGrid 
const { sendEmail } = require('../services/sendEmail');
// Bcrypt
const { hashThePassword, compareThePassword } = require('../services/bcrypt');
// JWT 
const { theToken } = require('../services/jwt');


// https://stackoverflow.com/questions/64713565/accessing-non-existent-property-padlevels-of-module-exports-inside-circular-de

async function register(req, res) {

	const { name, lastname, email, password } = req.body;

	try {

		const pwHashed = await hashThePassword(password);

		console.log(pwHashed);
		if (pwHashed !== undefined) {

			await createUser(name, lastname, email, pwHashed);

			sendEmail(email);

			const token = theToken(email);

			res.status(201).json({
				msg: 'User created',
				token: token
			});

		} else {

			res.status(400).json({
				msg: 'The user couldnt be created'
			});
		}

	} catch (error) {

		console.log(chalk.bgRed('ERROR', error));

		res.status(500).json({
			msg: 'ERROR',
			error: error
		});
	}
}

async function login(req, res) {

	const { email, password } = req.body;

	try {

		const user = await findUser(email);

		await compareThePassword(email, password, user.password, res);

	} catch (error) {

		console.log(chalk.bgRed('ERROR', error));

		res.status(500).json({
			msg: 'ERROR',
			error: error
		});
	}
}

async function userList(_req, res) {
	try {

		const list = await findAllUsers();

		res.status(202).json({
			msg: 'List of users',
			list: list
		});

	} catch (error) {

		console.log(chalk.bgRed('The list of users couldnt be sent, theres an error', error));

		res.status(500).send('The list of users couldnt be sent, theres an error');
	}
}

async function editUser(req, res) {

	const { id, name, lastname, email, password } = req.body;

	try {

		await findAndEdit(id, name, lastname, email, password);

		res.status(202).send('User edited successfully');

	} catch (error) {

		console.log(chalk.bgRed('The user couldnt be edited, theres an error', error));

		res.status(500).send('The user couldnt be edited, theres an error');
	}
}

async function eliminateUser(req, res) {

	const { id } = req.body;

	try {

		await destroyUser(id);

		res.status(202).send('User removed successfully');

	} catch (error) {

		console.log(chalk.bgRed('The user couldnt be removed, theres an error', error));

		res.status(500).send('The user couldnt be removed, theres an error', error);
	}
}

module.exports = {
	register,
	login,
	userList,
	editUser,
	eliminateUser
};