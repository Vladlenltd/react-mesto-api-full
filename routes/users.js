const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  /* createUser, */
  getUserById,
  getUsers,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUserInfo,
} = require('../controllers/users');

// usersRouter.post('/signin', login);
// usersRouter.post('/users', createUser);

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().min(24)
      .max(24),
  }),
}), getUserById);
usersRouter.get('/users/me', getCurrentUserInfo);
usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()./* required(). */min(2).max(30),
    about: Joi.string()./* required(). */min(2).max(30),
  }),
}), updateUserInfo);
usersRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), updateUserAvatar);

module.exports = usersRouter;
