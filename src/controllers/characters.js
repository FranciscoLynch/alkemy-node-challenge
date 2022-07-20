/* eslint-disable no-unused-vars */
const { Character } = require('../models/characters');
const { CharAndfilm } = require('../models/charAndFilm');
const { Film } = require('../models/films');
const chalk = require('chalk');

async function charactersList(req, res) {
	try {
		const list = await Character.findAll({
			attributes: ['image', 'name']
		});

		res.status(202).json({
			msg: 'List of characters',
			list: list
		});
	} catch (error) {
		console.log(chalk.bgRed('The list of characters couldnt be sended, theres an error', error));
		res.status(404).send('The list of characters couldnt be sended, theres an error');
	}
}

async function characterDetail(req, res) {
	const { name, age, idMovie, weight } = req.query;

	const query = {};
	if (name) query.name = name;
	if (age) query.age = age;
	if (weight) query.weight = weight;

	try {
		const character = await Character.findOne({
			where: query,
		});
		const filmsRelated = await CharAndfilm.findAll({
			where: {
				characterId: character.id
			}
		});

		const filmsId = filmsRelated.map(() => {

		});
		// Como hacer para encontrar todas las peliculas si solo puedo ingresar un valor al buscar?
		const theFilms = await Film.findAll({
			where: {
				id: filmsRelated[0].filmId
			}
		});
		console.log('CHARACTER LOG', JSON.stringify(character));
		console.log('FILM RELATED LOG', JSON.stringify(filmsRelated[0]));
		console.log('FILMS LOG', JSON.stringify(theFilms));
		// Search the character for the film in which participates
		let filmIn;

		if (idMovie) {
			filmIn = await CharAndfilm.findAll({
				where: {
					id: idMovie,
				}
			});
			console.log(chalk.bgBlue(' ', filmIn));
		}

		/* 
				
				const movies = relationsSelected; 
				
				console.log(chalk.bgBlue(typeof movies));
				
		 */

		res.status(202).json({
			msg: 'Character detail',
			character: character,
			film: 1
		});
	} catch (error) {
		console.log(chalk.bgRed('The character couldnt be found, theres an error', error));
		res.status(404).send('The character couldnt be found, theres an error');
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
	characterDetail,
	createCharacter,
	editCharacter,
	eliminateCharacter
};