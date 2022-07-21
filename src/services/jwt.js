/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

function theToken(email) {

	return jwt.sign({
		data: email
	}, process.env.JWT_KEY, { expiresIn: process.env.JWT_TIME });
}

module.exports = {
	theToken
};