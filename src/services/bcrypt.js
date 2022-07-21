const bcrypt = require('bcrypt');
const chalk = require('chalk');
const { theToken } = require('./jwt');

function hashThePassword(password) {
	
	return bcrypt.hash(password, 12);
}

function compareThePassword(email, password, passwordHashed, res) {

	console.log('password ', password);
	console.log('passwordHashed ',passwordHashed);
	bcrypt.compare(password, passwordHashed, (err, result) => {

		if (err) {
			console.log(chalk.bgRed('ERROR'));
			return res.status(404).json({
				msg: 'ERROR',
				error: err
			});
		}
		console.log(result);
		if (result) {
			const token = theToken(email);

			console.log(chalk.bgGreen('Login successful'));
			return res.status(201).json({
				msg: 'Login successful',
				token: token
			});

		} else {

			console.log(chalk.bgRed('The password is wrong'));
			return res.status(404).json({
				msg: 'The password is wrong',
			});

		}

	});

}

module.exports = {
	hashThePassword,
	compareThePassword
};