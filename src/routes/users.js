const router = require('express').Router();
const { register, login, userList, editUser, eliminateUser } = require('../controllers/users');

router.post('/auth/register', register);

router.post('/auth/login', login);   

router.get('/users/list', userList);

router.put('/users/edit', editUser);

router.delete('/users/remove', eliminateUser);

module.exports = router;