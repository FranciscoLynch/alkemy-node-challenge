const { GenreList, createGenre, editGenre, eliminateGenre} = require('../controllers/genres');
const { isLogged, isAdmin }= require('../middlewares/users');
const router = require('express').Router();

router.get('/genres', isLogged, GenreList);

router.post('/genre/add', isLogged, isAdmin, createGenre);

router.put('/genre/edit', isLogged, isAdmin, editGenre);

router.delete('/genre/remove', isLogged, isAdmin, eliminateGenre);

module.exports = router;