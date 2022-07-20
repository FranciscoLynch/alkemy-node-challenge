const { CharAndfilm } = require('../models/charAndFilm');
const chalk = require('chalk');

async function charAndFilmList(req, res) {
	try {
		const list = await CharAndfilm.findAll({ attributes: ['image', 'name'] });
		res.status(202).json({
			msg: 'List of characters and the films related',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of characters and films related couldnt be sent, theres an error', error));
		res.status(404).send('The list of characters and films related couldnt be sent, theres an error');
	}
}

async function createCharAndFilm(req, res) {
	const { image, name, age, weight, story } = req.body;

	try {
		await CharAndfilm.create({
			characterId: 1,
			filmId: 2
		});
		res.status(202).send('Character added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be added, theres an error', error));
		res.status(404).send('The character couldnt be added, theres an error', error);
	}

}

async function editCharAndFilm(req, res) {
	const { id, image, name, age, weight, story } = req.body;

	try {
		await CharAndfilm.findOne({
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

async function eliminateCharAndFilm(req, res) {
	const { id } = req.body;

	try {
		await CharAndfilm.destroy({
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
	charAndFilmList,
	createCharAndFilm,
	editCharAndFilm,
	eliminateCharAndFilm
};