const router = require('express').Router();
const { filmsList, filmDetail, createFilm, editFilm, eliminateFilm } = require('../controllers/films');
const { isLogged, isAdmin }= require('../middlewares/users');

router.get('/movies', isLogged, filmsList);

router.get('/movie/detail', isLogged, filmDetail);

router.post('/movies/add', isLogged, isAdmin, createFilm);

router.put('/movies/edit', isLogged, isAdmin, editFilm);

router.delete('/movies/remove', isLogged, isAdmin, eliminateFilm);

module.exports = router;