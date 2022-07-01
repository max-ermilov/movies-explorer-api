const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
  },
  director: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
  },
  duration: {
    type: Number,
    required: [true, '{PATH} - обязательное поле. '],
  },
  year: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
  },
  description: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
  },
  image: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, '{PATH} - обязательное поле. '],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Недопустимый формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, '{PATH} - обязательное поле. '],
  },
  movieId: {
    type: Number,
    required: [true, '{PATH} - обязательное поле. '],
  },
  nameRU: {
    type: String,
    minlength: 2,
    required: [true, '{PATH} - обязательное поле. '],
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
    required: [true, '{PATH} - обязательное поле. '],
    validate: {
      validator: (v) => validator.isIn(v, /[\w.:!?"«»;@%№()*#,\s]/gi),
      message: 'Недопустимое имя фильма',
    },
  },
});

module.exports = mongoose.model('movie', movieSchema);
