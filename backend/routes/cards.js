const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../constants/constants');
const {
  getCards, createCard, delTargetCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routes.get('/', getCards);
routes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi
      .string()
      .regex(regExp.link)
      .required(),
  }),
}), createCard);
routes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),
}), delTargetCard);
routes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),
}), likeCard);
routes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().hex().length(24),
  }),
}), dislikeCard);

module.exports = routes;
