const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/conn');

// eslint-disable-next-line no-undef
class CharAndfilm extends Model { }

CharAndfilm.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
	},
	{
		sequelize,
		modelName: 'charAndFilms',
		timestamps: false
	}
);
/* Movie or serie associated
*/ 

module.exports = { 
	CharAndfilm
};