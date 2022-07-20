const router = require('express').Router(); 
const { charactersList, createCharacter, editCharacter, eliminateCharacter } = require('../controllers/characters');

router.get('/characters', charactersList);

router.post('/characters/add', createCharacter);

router.put('/characters/edit', editCharacter);

router.delete('/characters/remove', eliminateCharacter);

module.exports = router;