const { GenreList, createGenre, editGenre, eliminateGenre} = require('../controllers/genres');
const router = require('express').Router();

router.get('/genres', GenreList);

router.post('/genre/add', createGenre);

router.put('/genre/edit', editGenre);

router.delete('/genre/remove', eliminateGenre);

module.exports = router;