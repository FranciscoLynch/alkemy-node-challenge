/* eslint-disable no-unused-vars */
const { Character } = require('../models/characters');
const { CharAndfilm } = require('../models/charAndFilm');
const { Film } = require('../models/films');
const { Op } = require('sequelize');
const chalk = require('chalk');

async function charactersList(req, res) {
	const { name, age, movies, weight } = req.query;

	const query = {};
	if (name) query.name = name;
	if (age) query.age = age;
	if (weight) query.weight = weight;

	try {
		if (movies) {
			const listCharsFromThatFilm = await CharAndfilm.findAll({
				where: {
					filmId: movies
				}
			});

			const relatedFilms = await listCharsFromThatFilm.map(charAndFilm => charAndFilm.characterId);

			query.id = { [Op.or]: relatedFilms };

			const charactersList = await Character.findAll({
				where: query,
				attributes: ['image', 'name']
			});

			return res.status(200).json({
				msg: 'List of characters',
				list: charactersList
			});
		}

		if (query) {
			const characterList = await Character.findAll({
				where: query,
				attributes: ['image', 'name'],
			});

			return res.status(200).json({
				msg: 'List of characters',
				list: characterList
			});
		}

		const characterList = await Character.findAll({
			attributes: ['image', 'name'],
		});

		res.status(200).json({
			msg: 'List of characters',
			list: characterList
		});

	} catch (error) {
		console.log(chalk.bgRed('The list of characters couldnt be sent, theres an error', error));
		res.status(500).send('The list of characters couldnt be sent, theres an error');
	}
}

async function characterDetail(req, res) {
	const { id } = req.query; 

	try {
		const character = await Character.findOne({
			where: { id: id }
		});

		if (!character) {
			return res.status(404).json({
				msg: 'The character doesnt exist'
			});
		} 

		const theFilmsRelated = await CharAndfilm.findAll({
			where: {
				characterId: id
			}
		});

		const relatedFilmsId = await theFilmsRelated.map(charAndFilm => charAndFilm.filmId);

		const query = {};
		query.id = { [Op.or]: relatedFilmsId };
 
		const filmList = await Film.findAll({
			where: query
		}); 

		const characterAndFilmDetail = {
			character,
			filmList
		};

		res.status(200).json({
			msg: 'Character',
			detail: characterAndFilmDetail,
		});
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be found, theres an error', error));
		res.status(500).send('The character couldnt be found, theres an error');
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
		res.status(201).send('Character added successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be added, theres an error', error));
		res.status(500).send('The character couldnt be added, theres an error', error);
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

		res.status(201).send('Character edited successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be edited, theres an error', error));
		res.status(500).send('The character couldnt be edited, theres an error');
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
		res.status(200).send('Character removed successfully');
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be removed, theres an error', error));
		res.status(500).send('The character couldnt be removed, theres an error', error);
	}
}

module.exports = {
	charactersList,
	characterDetail,
	createCharacter,
	editCharacter,
	eliminateCharacter
};