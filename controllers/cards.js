const Card = require('../models/card');
const errorStatus = require('../utils/errorStatus');
const AccessError = require('../errors/accessError');
const BadRequest = require('../errors/badRequest');
const NotFoundError = require('../errors/notFoundError');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
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
module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((data) => {
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new NotFoundError('Карточка не найдена');
      } next(error);
    })
    .catch(next);
};
module.exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  const id = req.user._id;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка  с указанным id: ${cardId} не найдена`);
      }
      if (card.owner.toString() !== id) {
        throw new AccessError('Недостаточно прав для удаления карточки');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              throw new BadRequest(`Карточка с id:${cardId} не найдена`);
            }
            next(error);
          })
          .catch(next);
      }
    })
    .catch(next);
};
module.exports.likeCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequest('Карточка не найдена');
      }
      next(error);
    })
    .catch(next);
};
module.exports.disLikeCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundError(`Карточка с указанным id:${cardId} не найдена`);
      }
      res.status(errorStatus.SUCCESSFUL_REQUEST).send(data);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        throw new BadRequest('Карточка не найдена');
      }
      next(error);
    })
    .catch(next);
};
