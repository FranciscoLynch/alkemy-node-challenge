const router = require('express').Router();
const { charAndFilmList, createCharAndFilm, editCharAndFilm, eliminateCharAndFilm } = require('../controllers/charAndFilm');

router.get('/charAndFilm', charAndFilmList);

router.post('/charAndFilm/add', createCharAndFilm);

router.put('/charAndFilm/edit', editCharAndFilm);

router.delete('/charAndFilm/remove', eliminateCharAndFilm);

module.exports = router;