const router = require('express').Router(); 
const { charactersList, characterDetail, createCharacter, editCharacter, eliminateCharacter } = require('../controllers/characters');
const { isLogged, isAdmin }= require('../middlewares/users');

router.get('/characters', isLogged, charactersList);
 
router.get('/character/detail/', isLogged, characterDetail);

router.post('/characters/add', isLogged, isAdmin, createCharacter);

router.put('/characters/edit', isLogged, isAdmin, editCharacter);

router.delete('/characters/remove', isLogged, isAdmin, eliminateCharacter);

module.exports = router; 



/* 
TO FIX
The character couldnt be found, theres an error Error: WHERE parameter "id" has invalid "undefined" value

SEARCH HOW SEND THE ID TO FIND THE CHARACTER BEING A ENDPOINT GET
*/