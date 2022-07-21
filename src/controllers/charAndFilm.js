const { CharAndfilm } = require('../models/charAndFilm');
const chalk = require('chalk');

async function charAndFilmList(_req, res) {
	try {
		const list = await CharAndfilm.findAll();
		res.status(200).json({
			msg: 'List of characters and the films related',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of characters and films related couldnt be sent, theres an error', error));
		res.status(500).send('The list of characters and films related couldnt be sent, theres an error');
	}
}

async function createCharAndFilm(req, res) {
	const { characterId, filmId } = req.body;

	try {
		await CharAndfilm.create({
			characterId: characterId,
			filmId: filmId
		});
		res.status(201).send('Character and film related added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The characters and films related couldnt be added, theres an error', error));
		res.status(500).send('The characters and films related couldnt be added, theres an error');
	}

}

async function editCharAndFilm(req, res) {
	const { id, characterId, filmId } = req.body;

	try {
		await CharAndfilm.findOne({
			where: {
				id: id
			}
		}).then((user) => {
			user.update({
				characterId: characterId,
				filmId: filmId
			});
		});

		res.status(201).send('Character and film related edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The characters and films related couldnt be edited, theres an error', error));
		res.status(500).send('The characters and films related couldnt be edited, theres an error');
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
		res.status(200).send('Character and film related removed successfully');
	} catch (error) {
		console.log(chalk.bgRed('The characters and films related couldnt be removed, theres an error', error));
		res.status(500).send('The characters and films related couldnt be removed, theres an error', error);
	}
}

module.exports = {
	charAndFilmList,
	createCharAndFilm,
	editCharAndFilm,
	eliminateCharAndFilm
};