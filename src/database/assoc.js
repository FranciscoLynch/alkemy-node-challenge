const { Character } = require('../models/characters');
const { Film } = require('../models/films');
const { Genre } = require('../models/genres'); 
const { CharAndfilm } = require('../models/charAndFilm');
require('./conn');
 
Character.hasMany(CharAndfilm, {
	onDelete: 'cascade',
});
CharAndfilm.belongsTo(Character);

Film.hasMany(CharAndfilm, {
	onDelete: 'cascade',
}); 
CharAndfilm.belongsTo(Film);

Genre.hasMany(Film);
Film.belongsTo(Genre);
