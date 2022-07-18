const router = require('express').Router(); 
const { register, login} = require('../controllers/user'); 

// Users

router.post('/auth/register', register); 

router.post('/auth/login', login); 

// Characters

router.get('/characters'); 

router.post('/characters/create');

router.put('/characters/edit');

router.delete('/characters/eliminate');

// Films
 
router.get('/movies');

router.post('/movies/create');

router.put('/movies/edit');

router.delete('/movies/eliminate');

module.exports = router;