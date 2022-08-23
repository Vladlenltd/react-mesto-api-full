const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const errorStatus = require('../utils/errorStatus');
const BadRequest = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundError');
const DuplicateKeyError = require('../errors/duplicateKeyError');

module.exports.createUser = (req, res, next) => {
  const {
    email, name, about, avatar, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send({
        name: data.name,
        about: data.about,
        avatar: data.avatar,
        _id: data._id,
        email: data.email,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest('Не верные данные');
      } else if (error.code === '11000') {
        throw new DuplicateKeyError('Пользователь с указнным email существует');
      }
      next(error);
    })
    .catch(next);
};
module.exports.getUserById = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Пользователь с указанным id:${userId} не найден`);
      } else {
        res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequest('Неверно указан id');
      }
      next(error);
    })
    .catch(next);
};
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new NotFoundError('Пользователь не найден');
      }
      next(error);
    })
    .catch(next);
};
module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest('Некоректные данные');
      } next(error);
    })
    .catch(next);
};
module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        throw new BadRequest('Некорректные данные');
      } next(error);
    })
    .catch(next);
};
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'very-very-secret-code', { expiresIn: 3600 });
      res.status(errorStatus.SUCCESSFUL_REQUEST).res.send({ token });
    })
    .catch(next);
};
module.exports.getCurrentUserInfo = (req, res, next) => {
  const userId = req.user._id;
  return User.findById(userId)
    .then((user) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).res.send(user);
    })
    .catch(next);
};
