const router = require('express').Router();

const auth = require('../middlewares/auth');
const { NotFound } = require('../errors');
const authRoute = require('./auth');

router.use(authRoute);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => next(new NotFound('Запрашиваемая страница не найдена')));

module.exports = router;
