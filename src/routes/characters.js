const router = require('express').Router(); 
const { charactersList, characterDetail, createCharacter, editCharacter, eliminateCharacter } = require('../controllers/characters');

router.get('/characters', charactersList);
 
router.get('/character/detail/', characterDetail);

router.post('/characters/add', createCharacter);

router.put('/characters/edit', editCharacter);

router.delete('/characters/remove', eliminateCharacter);

module.exports = router; 



/* 
TO FIX
The character couldnt be found, theres an error Error: WHERE parameter "id" has invalid "undefined" value

SEARCH HOW SEND THE ID TO FIND THE CHARACTER BEING A ENDPOINT GET
*/