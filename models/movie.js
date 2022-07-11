const mongoose = require('mongoose');
const validator = require('validator');

const errorMessage = '{PATH} - обязательное поле. ';

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, errorMessage],
  },
  director: {
    type: String,
    required: [true, errorMessage],
  },
  duration: {
    type: Number,
    required: [true, errorMessage],
  },
  year: {
    type: String,
    required: [true, errorMessage],
  },
  description: {
    type: String,
    required: [true, errorMessage],
  },
  image: {
    type: String,
    required: [true, errorMessage],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, errorMessage],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, errorMessage],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, errorMessage],
  },
  movieId: {
    type: Number,
    required: [true, errorMessage],
  },
  nameRU: {
    type: String,
    minlength: 2,
    required: [true, errorMessage],
    validate: {
      // plan B validation
      // validator(v) {
      //   return /[а-я.:!?"«»;@%№()*#,ё\s]/gi.test(v);
      // },
      validator: (v) => validator.isIn(v, /[а-я.:!?"«»;@%№()*#,ё\s]/gi),
      message: 'Недопустимое имя фильма',
    },
  },
  nameEN: {
    type: String,
    minlength: 2,
    required: [true, errorMessage],
    validate: {
      validator: (v) => validator.isIn(v, /[\w.:!?"«»;@%№()*#,\s]/gi),
      message: 'Недопустимое имя фильма',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
