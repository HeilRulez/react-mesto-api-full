const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../constants/constants');
const {
  getUsers, getUser, getTargetUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routes.get('/', getUsers);
routes.get('/me', getUser);
routes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().hex().length(24),
  }),
}), getTargetUser);
routes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateProfile);
routes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .regex(regExp.link),
  }),
}), updateAvatar);

module.exports = routes;
