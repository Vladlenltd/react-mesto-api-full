const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
// const errorStatus = require('./utils/errorStatus');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App works at port ${PORT}`);
});

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8)
      .max(30),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), createUser);
app.use('/', auth, cardsRouter);
app.use('/', auth, usersRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});
