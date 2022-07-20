const router = require('express').Router();  

const userRouter = require('../routes/users');
const characterRouter = require('../routes/characters');
const filmRouter = require('../routes/films');
const charInFilmRouter = require('../routes/charAndFilm');
const genreRouter = require('../routes/genres');

router.use(userRouter);
router.use(characterRouter);
router.use(filmRouter);
router.use(charInFilmRouter);
router.use(genreRouter); 

module.exports = router;