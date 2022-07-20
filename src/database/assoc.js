const { Character } = require('../models/character');
const { Film } = require('../models/film');
const { Genre } = require('../models/genre'); 
const { Char_in_film } = require('../models/character-in-film');
require('./conn');
 
Character.hasMany(Char_in_film, {
	onDelete: 'cascade',
});
Char_in_film.belongsTo(Character);

Film.hasMany(Char_in_film, {
	onDelete: 'cascade',
}); 
Char_in_film.belongsTo(Film);

Genre.hasMany(Film);
Film.belongsTo(Genre);
