const { Character } = require('../models/characters');
const { Film } = require('../models/films');
const { Genre } = require('../models/genres');
const { User } = require('../models/users');
const { CharAndfilm } = require('../models/charAndFilm');
const chalk = require('chalk');


const charactersData = async () => {

	try {
		const added = await Character.findOne({
			where: {
				name: 'Wall-E'
			}
		});

		if (added) {
			console.log(chalk.bgRed('Characters predeterminated is already created'));
			return;
		} else {
			await Character.create({
				image: 'https://iresiduo.com/sites/default/files/images/08-Wall-E.jpg',
				name: 'Wall-E',
				age: 700,
				weight: 1000.00,
				story: 'WALL E is a rusty old robot, who lives alone on Earth with his cockroach Hal. He is the last surviving robot of an earth cleanup force.'
			});

			await Character.create({
				image: 'https://media.revistagq.com/photos/62723d5c3d5c22e592dbcaf8/master/pass/F_20624.jpg',
				name: 'Spiderman',
				age: 18,
				weight: 70.00,
				story: 'Peter Benjamin Parker is a young who is bitten by a radioactive spider at a science exhibit and gains the agility and proportional strength of an arachnid.'
			});

			await Character.create({
				image: 'https://www.sociedadtolkien.org/wp-content/uploads/2020/02/Ian-McKellen-Gandalf.jpg',
				name: 'Gandalf',
				age: undefined,
				weight: 80.00,
				story: 'Was an Istar (Wizard), dispatched to Middle-earth in the Third Age to combat the threat of Sauron.'
			});
			console.log(chalk.bgGreen('Characters created'));
		}
	} catch (error) {
		console.error(error);
	}
};

const genreData = async () => {
	try {

		const added = await Genre.findOne({
			where: {
				name: 'Action'
			}
		});

		if (added) {
			console.log(chalk.bgRed('Genres predeterminated is already created'));
			return;
		} else {

			await Genre.create({
				image: 'https://static.wikia.nocookie.net/doblaje/images/5/55/Walle-poster.jpg/revision/latest?cb=20201004143700&path-prefix=es',
				name: 'Action'
			});

			await Genre.create({
				image: 'https://static.wikia.nocookie.net/doblaje/images/5/55/Walle-poster.jpg/revision/latest?cb=20201004143700&path-prefix=es',
				name: 'Adventure'
			});

			await Genre.create({
				image: 'https://static.wikia.nocookie.net/doblaje/images/5/55/Walle-poster.jpg/revision/latest?cb=20201004143700&path-prefix=es',
				name: 'Science fiction'
			});
			console.log(chalk.bgGreen('Genres created'));
		}
	} catch (error) {
		console.error(error);
	}
};

const filmsData = async () => {

	try {

		const added = await Film.findOne({
			where: {
				title: 'WALL-E'
			}
		});

		if (added) {
			console.log(chalk.bgRed('Films predeterminated is already created'));
			return;
		} else {
			await Film.create({
				image: 'https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg',
				title: 'The Lord of the Rings: The Fellowship of the Ring',
				creationDate: '2002/01/31',
				score: 5,
				genreId: 2
			});

			await Film.create({
				image: 'https://static.wikia.nocookie.net/doblaje/images/5/55/Walle-poster.jpg/revision/latest?cb=20201004143700&path-prefix=es',
				title: 'WALL-E',
				creationDate: '2008/07/09',
				score: 4,
				genreId: 2
			});

			await Film.create({
				image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spider-man-no-way-home-poster-fotogramas-1638214021.jpg',
				title: 'Spider-Man: No Way Home',
				creationDate: '2021/12/17',
				score: 5,
				genreId: 1
			});

			console.log(chalk.bgGreen('Films created'));
		}

	} catch (error) {
		console.error(error);
	}
};

const CharAndfilmData = async () => {

	try {

		const added = await CharAndfilm.findOne({
			where: {
				characterId: 1,
				filmId: 2
			}
		});

		if (added) {
			console.log(chalk.bgRed('Relation between the character and films predeterminated is already created'));
			return;
		} else {
			await CharAndfilm.create({
				characterId: 1,
				filmId: 2
			});

			await CharAndfilm.create({
				characterId: 2,
				filmId: 3
			});

			await CharAndfilm.create({
				characterId: 3,
				filmId: 1
			});
			console.log(chalk.bgGreen('Relation between the character and films created'));
		}

	} catch (error) {
		console.error(error);
	}
};

const userData = async () => {

	try {

		const added = await User.findOne({
			where: {
				admin: true
			}
		});

		if (added) {
			console.log(chalk.bgRed('The admin is already created'));
			return;
		} else {
			await User.create({
				name: 'GOD',
				lastname: 'GODINI',
				email: 'god_uwu@gmail.com',
				password: 'mimamamemima123',
				admin: true
			});

			console.log(chalk.bgGreen('Admin created'));
		}

	} catch (error) {
		console.error(error);
	}
};

module.exports = {
	userData,
	genreData,
	charactersData,
	filmsData,
	CharAndfilmData
};