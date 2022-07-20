const { sequelize } = require('./conn');
const chalk = require('chalk');

require('./assoc');
const data = require('./data');

async function sync() {
	await sequelize.sync({ force: false }).then(() => {
		console.log(chalk.bgGreen('All models were synchronized successfully'));
	});
}  

sync();


(async (data) => {
	await data.userData();
	await data.genreData();
	await data.charactersData();
	await data.filmsData();
	await data.CharAndfilmData();
})(data);




// Add predeterminated info to the db 

