/* eslint-disable no-unused-vars */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/conn');

// eslint-disable-next-line no-undef
class Film extends Model { }

Film.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		image: {
			type: DataTypes.STRING,

		},
		title: {
			type: DataTypes.STRING,
		},
		creationDate: {
			type: DataTypes.DATE,
			
		},
		score: {
			type: DataTypes.INTEGER,
		}
	},
	{
		sequelize,
		modelName: 'film',
		timestamps: false
	}
);
/* Characters associated
*/ 

module.exports = { 
	Film
};