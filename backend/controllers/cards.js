const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const { OK, OK_ADD } = require('../constants/constants');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});
    res.status(OK).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const card = await Card.create({ name, link, owner: req.user._id });
    res.status(OK_ADD).send(card);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.delTargetCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);
    if (!card) {
      throw new NotFoundError('Какточка отсутствут.');
    }
    if (card.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нет прав.');
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Какточка отсутствут.');
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Какточка отсутствут.');
    }
    res.status(OK).send(card);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};
