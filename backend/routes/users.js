/* eslint-disable no-useless-escape */
const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');

usersRouter.get('/users', getUsers);

usersRouter.get('/users/me', getCurrentUserInfo);

usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().min(24)
      .max(24),
  }),
}), getUserById);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()./* required(). */min(2).max(30),
    about: Joi.string()./* required(). */min(2).max(30),
  }),
}), updateUserInfo);

usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^http(s)?:\/\/(w{3}\.)?([da-z\-]+\.)+([\w#!:.?+=&%\-])?/),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
