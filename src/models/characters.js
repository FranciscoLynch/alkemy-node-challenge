/* eslint-disable no-unused-vars */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/conn');

// eslint-disable-next-line no-undef
class Character extends Model { }

Character.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		image: {
			type: DataTypes.STRING,

		},
		name: {
			type: DataTypes.STRING,
		},
		age: {
			type: DataTypes.INTEGER,
			
		},
		weight: {
			type: DataTypes.FLOAT,
		},
		story: {
			type: DataTypes.STRING,
		}
	},
	{
		sequelize,
		modelName: 'characters',
		timestamps: false
	}
);
/* Movie or serie associated
*/ 

module.exports = { 
	Character
};