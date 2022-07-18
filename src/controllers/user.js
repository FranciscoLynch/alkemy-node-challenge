/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
// JWT 
const jwt = require('jsonwebtoken');

// https://stackoverflow.com/questions/64713565/accessing-non-existent-property-padlevels-of-module-exports-inside-circular-de
// The reason why i dont do a main file config with all the .env variables >:(

async function register(req, res) {
	const { name, lastname, email, password } = req.body;

	try {
		const pwHashed = await bcrypt.hash(password, 12);

		if (pwHashed !== undefined) {
			await User.create({
				name: name,
				lastname: lastname,
				email: email,
				password: pwHashed
			});

			const token = jwt.sign({
				data: email
			}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIME });

			res.status(201).json({
				msg: 'User created',
				token: token
			});

		} else {
			res.status(404).json({
				msg: 'The user couldnt be created' 
			});
		}

	} catch (error) {
		console.log(chalk.bgRed('ERROR', error));
		res.status(404).json({
			msg: 'ERROR',
			error: error
		});
	}
}

async function login(req, res) {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({
			where: {
				email: email
			}
		});
		await bcrypt.compare(password, user.password, (err, result) => {
			if (err) {
				console.log(chalk.bgRed('ERROR'));
				res.status(404).json({
					msg: 'ERROR',
					error: error
				});
			}
			if (result) {
				const token = jwt.sign({
					data: email
				}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIME });

				res.status(201).json({
					msg: 'Token',
					token: token
				});
			} else {
				console.log(chalk.bgRed('The password is different'));
				res.status(404).json({
					msg: 'The password is different',
				});
			}
		});

	} catch (error) {
		console.log(chalk.bgRed('ERROR', error));
		res.status(404).json({
			msg: 'ERROR',
			error: error
		});
	}
}




module.exports = {
	register,
	login
};