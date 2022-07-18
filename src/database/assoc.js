const { Character } = require('../models/character');
const { Film } = require('../models/film');
const { Gender } = require('../models/gender'); 
require('./conn');
 
Character.hasMany(Film, {
	onDelete: 'cascade',
	foreignKey: 'characterId'
});
Film.belongsTo(Character);

Film.hasMany(Character, {
	onDelete: 'cascade',
	foreignKey: 'filmId'
}); 
Character.belongsTo(Film); 

Gender.hasMany(Film, {
	onDelete: 'cascade',
	foreignKey: 'genderId'
});
Film.belongsTo(Gender);
