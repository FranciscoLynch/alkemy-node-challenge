const { Film } = require('../models/films');
const chalk = require('chalk');

async function filmsList(req, res) {
	try {
		const list = await Film.findAll({ attributes: ['image', 'title', 'creationDate'] });
		res.status(202).json({
			msg: 'List of films',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of films couldnt be sended, theres an error', error));
		res.status(404).send('The list of films couldnt be sended, theres an error');
	}
}

async function createFilm(req, res) {
	const { image, title, creationDate, score, genreId } = req.body;

	try {
		await Film.create({
			image: image,
			title: title,
			creationDate: creationDate,
			score: score,
			genreId: genreId
		});
		res.status(202).send('film added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The film couldnt be added, theres an error', error));
		res.status(404).send('The film couldnt be added, theres an error', error);
	}

}

async function editFilm(req, res) {
	const { id, image, title, creationDate, score, genreId } = req.body;

	try {
		await Film.findOne({
			where: {
				id: id
			}
		}).then((user) => {
			user.update({
				image: image,
				title: title,
				creationDate: creationDate,
				score: score,
				genreId: genreId
			});
		});

		res.status(202).send('film edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The film couldnt be edited, theres an error', error));
		res.status(404).send('The film couldnt be edited, theres an error');
	}
}

async function eliminateFilm(req, res) {
	const { id } = req.body;

	try {
		await Film.destroy({
			where: {
				id: id
			}
		});
		res.status(202).send('film removed successfully');
	} catch (error) {
		console.log(chalk.bgRed('The film couldnt be removed, theres an error', error));
		res.status(404).send('The film couldnt be removed, theres an error', error);
	}
}

module.exports = {
	filmsList,
	createFilm,
	editFilm,
	eliminateFilm
};