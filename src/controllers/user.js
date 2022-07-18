/* eslint-disable no-undef */
const chalk = require('chalk');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
// SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
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

			const msg = {
				to: email,
				from: 'lynch_francisco_w@hotmail.com',
				subject: 'Welcome to the Alkemy Challenge of Francisco :)',
				text: 'Thank you for register! It was made with love.'
			};

			(async function (msg) {
				try {
					await sgMail.send(msg);
					console.log(chalk.bgGreen('Email sent'));
				} catch (error) {
					console.error(error);
				}
			})(msg);

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

				console.log(chalk.bgGreen('Login successful'));
				res.status(201).json({
					msg: 'Login successful',
					token: token
				});
			} else {
				console.log(chalk.bgRed('The password is wrong'));
				res.status(404).json({
					msg: 'The password is wrong',
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