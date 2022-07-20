/* eslint-disable no-unused-vars */
const { Character } = require('../models/characters');
const chalk = require('chalk');

async function charactersList(req, res) {
	try {
		const list = await Character.findAll({ attributes: ['image', 'name'] });
		res.status(202).json({
			msg: 'List of characters',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of characters couldnt be sended, theres an error', error));
		res.status(404).send('The list of characters couldnt be sended, theres an error');
	}
}

async function createCharacter(req, res) {
	const { image, name, age, weight, story } = req.body;

	try {
		await Character.create({
			image: image,
			name: name,
			age: age,
			weight: weight,
			story: story
		});
		res.status(202).send('Character added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be added, theres an error', error));
		res.status(404).send('The character couldnt be added, theres an error', error);
	}
}

async function editCharacter(req, res) {
	const { id, image, name, age, weight, story } = req.body;

	try {
		await Character.findOne({
			where: {
				id: id
			}
		}).then((user) => {
			user.update({
				image: image,
				name: name,
				age: age,
				weight: weight,
				story: story
			});
		});

		res.status(202).send('Character edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be edited, theres an error', error));
		res.status(404).send('The character couldnt be edited, theres an error');
	}
}

async function eliminateCharacter(req, res) {
	const { id } = req.body;

	try {
		await Character.destroy({
			where: {
				id: id
			}
		});
		res.status(202).send('Character removed successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be removed, theres an error', error));
		res.status(404).send('The character couldnt be removed, theres an error', error);
	}
}

module.exports = {
	charactersList,
	createCharacter,
	editCharacter,
	eliminateCharacter
};