const { Film } = require('../models/films');
const { Character } = require('../models/characters');
const { CharAndfilm } = require('../models/charAndFilm');
const { Op } = require('sequelize');
const chalk = require('chalk');

async function filmsList(req, res) {
	const { name, genre, order } = req.query;

	const query = {};
	let ordering = null;

	if (order === 'ASC' || order === 'DESC') {
		ordering = [['creationDate', order]];
	}

	if (name) query.title = name;
	if (genre) query.genreId = genre;

	try {

		const list = await Film.findAll({
			where: query,
			attributes: ['image', 'title', 'creationDate'],
			order: ordering
		});

		if (list.length === 0) {
			return res.status(404).json({ msg: 'No films found' });
		}

		res.status(200).json({
			msg: 'List of films',
			film: list
		});

	} catch (error) {
		console.log(chalk.bgRed('The list of films couldnt be sended, theres an error', error));
		res.status(500).send('The list of films couldnt be sended, theres an error');
	}
}

async function filmDetail(req, res) {
	const { id } = req.query;

	try {
		const film = await Film.findOne({
			where: { id: id }
		});

		if (!film) {
			return res.status(404).json({
				msg: 'The film doesnt exist'
			});
		}

		const theCharsRelated = await CharAndfilm.findAll({
			where: {
				filmId: id
			}
		});

		const relatedCharsId = await theCharsRelated.map(charAndFilm => charAndFilm.characterId);

		const query = {};
		query.id = { [Op.or]: relatedCharsId };

		const characterList = await Character.findAll({
			where: query
		});

		const characterAndFilmDetail = {
			film,
			characterList
		};

		res.status(202).json({
			msg: 'Film',
			detail: characterAndFilmDetail,
		});
	} catch (error) {
		console.log(chalk.bgRed('The film couldnt be found, theres an error', error));
		res.status(500).send('The film couldnt be found, theres an error');
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
		res.status(500).send('The film couldnt be added, theres an error', error);
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
		}).catch(error => {
			console.log(chalk.bgRed('The film couldnt be edited, theres an error', error));
			res.status(500).send('The film couldnt be edited, theres an error');
		});

		res.status(202).send('film edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The film couldnt be edited, theres an error', error));
		res.status(500).send('The film couldnt be edited, theres an error');
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
		res.status(500).send('The film couldnt be removed, theres an error', error);
	}
}

module.exports = {
	filmsList,
	filmDetail,
	createFilm,
	editFilm,
	eliminateFilm
};