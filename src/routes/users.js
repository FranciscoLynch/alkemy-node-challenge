const router = require('express').Router();
const { register, login, userList, editUser, eliminateUser } = require('../controllers/users');
const { fieldRegister, fieldLogin, isAdmin, emailUsed, isLogged } = require('../middlewares/users');

router.post('/auth/register', fieldRegister, emailUsed, register);

router.post('/auth/login', fieldLogin, login);   

router.get('/users/list', isLogged, isAdmin, userList);

router.put('/users/edit', isLogged, isAdmin, editUser);

router.delete('/users/remove', isLogged, isAdmin, eliminateUser);

module.exports = router;