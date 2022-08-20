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
      .regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), createCard);
cardsRouter.get('/cards', getCard);
cardsRouter.delete('/cards/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), deleteCard);
cardsRouter.put('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), likeCard);
cardsRouter.delete('/cards/:id/likes', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), disLikeCard);
module.exports = cardsRouter;
