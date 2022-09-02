/* eslint-disable no-useless-escape */
const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCard,
  deleteCard,
  likeCard,
  disLikeCard,
} = require('../controllers/cards');

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required()
      .regex(/^http(s)?:\/\/(w{3}\.)?([da-z\-]+\.)+([\w#!:.?+=&%\-])?/),
  }),
}), createCard);

cardsRouter.get('/cards', getCard);

cardsRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteCard);

cardsRouter.put('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), likeCard);

cardsRouter.delete('/cards/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), disLikeCard);

module.exports = cardsRouter;
