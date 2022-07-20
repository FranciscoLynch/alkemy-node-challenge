const router = require('express').Router();
const { register, login } = require('../controllers/users');

router.post('/auth/register', register);

router.post('/auth/login', login);

module.exports = router;