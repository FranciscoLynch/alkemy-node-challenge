const router = require('express').Router();
const { filmsList, filmDetail, createFilm, editFilm, eliminateFilm } = require('../controllers/films');

router.get('/movies', filmsList);

router.get('/movie/detail', filmDetail);

router.post('/movies/add', createFilm);

router.put('/movies/edit', editFilm);

router.delete('/movies/remove', eliminateFilm);

module.exports = router;