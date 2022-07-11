const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const { regExLink } = require('../utils');

router.get('/', getAllMovies);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regExLink),
    trailerLink: Joi.string().required().pattern(regExLink),
    thumbnail: Joi.string().required().pattern(regExLink),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
