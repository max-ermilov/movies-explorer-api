const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  BadRequest, Unauthorized, NotFound, Conflict,
} = require('../errors');
const { prepareValidationMessage } = require('../utils');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch((err) => next(err));
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      // return res.cookie('jwt', token, {
      //   maxAge: 3600000 * 24 * 7,
      //   httpOnly: true,
      //   sameSite: true,
      // }).send({ token });
      return res.send({ token });
    })
    .catch(() => next(new Unauthorized('Неверные почта или пароль')));
};

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.status(201).send(
      {
        email: user.email,
        name: user.name,
      },
    ))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(prepareValidationMessage(err)));
      } if (err.code === 11000) {
        return next(new Conflict('Данный email уже занят'));
      }
      return next(err);
    });
};

const updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      return res.send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequest(prepareValidationMessage(err)));
      }
      return next(err);
    });
};

module.exports = {
  getUser,
  login,
  createUser,
  updateUser,
};
