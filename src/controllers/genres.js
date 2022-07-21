const { Genre } = require('../models/genres');
const chalk = require('chalk');

async function GenreList(_req, res) {
	try {
		const list = await Genre.findAll();
		res.status(202).json({
			msg: 'List of genres',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of genres couldnt be sent, theres an error', error));
		res.status(500).send('The list of genres couldnt be sent, theres an error');
	}
}

async function createGenre(req, res) {
	const { name, image } = req.body;

	try {
		await Genre.create({
			name: name,
			image: image
		});
		res.status(202).send('Genre added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The genre couldnt be added, theres an error', error));
		res.status(500).send('The genre couldnt be added, theres an error');
	}
}

async function editGenre(req, res) {
	const { id, name, image } = req.body;

	try {
		await Genre.findOne({
			where: {
				id: id
			}
		}).then((genre) => {
			genre.update({
				name: name,
				image: image
			});
		});

		res.status(202).send('Genre edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The genre couldnt be edited, theres an error', error));
		res.status(500).send('The genre couldnt be edited, theres an error');
	}
}

async function eliminateGenre(req, res) {
	const { id } = req.body;

	try {
		await Genre.destroy({
			where: {
				id: id
			}
		});
		res.status(202).send('Genre removed successfully');
	} catch (error) {
		console.log(chalk.bgRed('The genre couldnt be removed, theres an error', error));
		res.status(500).send('The genre couldnt be removed, theres an error', error);
	}
}

module.exports = {
	GenreList,
	createGenre,
	editGenre,
	eliminateGenre
};