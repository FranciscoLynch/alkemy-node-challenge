const router = require('express').Router();
const { filmsList, createFilm, editFilm, eliminateFilm } = require('../controllers/films');

router.get('/movies', filmsList);

router.post('/movies/add', createFilm);

router.put('/movies/edit', editFilm);

router.delete('/movies/remove', eliminateFilm);

module.exports = router;