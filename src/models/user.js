const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../database/conn');

class User extends Model { }

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
		},
		lastname: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'user',
		timestamps: false
	}
);

module.exports = { User };