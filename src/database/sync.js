const { sequelize } = require('./conn');
const chalk = require('chalk'); 

require('../models/character');
require('../models/film');
require('../models/gender');  
require('../models/user');  

require('./assoc');

sequelize.sync({ force: false }).then(() => {
	console.log(chalk.bgGreen('All models were synchronized successfully'));
}); 
