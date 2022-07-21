const router = require('express').Router();
const { charAndFilmList, createCharAndFilm, editCharAndFilm, eliminateCharAndFilm } = require('../controllers/charAndFilm');
const { isLogged, isAdmin }= require('../middlewares/users');

router.get('/charAndFilm', isLogged, charAndFilmList);

router.post('/charAndFilm/add', isLogged, isAdmin, createCharAndFilm);

router.put('/charAndFilm/edit', isLogged, isAdmin, editCharAndFilm);

router.delete('/charAndFilm/remove', isLogged, isAdmin, eliminateCharAndFilm);

module.exports = router;