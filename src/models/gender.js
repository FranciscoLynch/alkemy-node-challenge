/* eslint-disable no-unused-vars */
const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/conn');

// eslint-disable-next-line no-undef
class Gender extends Model { }

Gender.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,

		},
		image: {
			type: DataTypes.STRING,
		}
	},
	{
		sequelize,
		modelName: 'gender',
		timestamps: false
	}
);
/*  Movie or serie associated associated
*/

module.exports = { 
	Gender
};