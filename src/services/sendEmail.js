/* eslint-disable no-undef */
// SendGrid
const sgMail = require('@sendgrid/mail');
const chalk = require('chalk');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendEmail(email) {

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
}

module.exports = {
	sendEmail
};