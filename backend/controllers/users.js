const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const User = require('../models/user');
const { resStatus } = require('../constants/constants');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(resStatus.OK).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.status(resStatus.OK).send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getTargetUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new NotFoundError('Пользователь не найден.');
    } else {
      res.status(resStatus.OK).send(user);
    }
  } catch (err) {
    if (err.kind === 'ObjectId') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const pasHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: pasHash,
    });
    res.status(resStatus.OK_ADD).send(user.toJSON());
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    if (err.code === 11000) {
      next(new ConflictError('Такой пользователь уже зарегистрирован.'));
      return;
    }
    next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(resStatus.OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true },
    );
    res.status(resStatus.OK).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Неверные данные запроса.'));
      return;
    }
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!validator.isEmail(email)) {
    throw new BadRequestError('Некорректный Email.');
  } else {
    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль.');
      } else if (!bcrypt.compare(password, user.password)) {
        throw new UnauthorizedError('Неправильные почта или пароль.');
      } else {
        const token = await jwt.sign(
          { _id: user._id },
          '671a191f3ef9128b01d4f624f9b51519941c7c2daa2790e71bd3956e74ca410f',
          { expiresIn: '7d' },
        );
        res.status(resStatus.OK).cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
          .send(user.toJSON())
          .end();
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports.outUsers = async (req, res, next) => {
  try {
    res.status(resStatus.OK).cookie('jwt', '', {
      maxAge: -1,
      httpOnly: true,
    });
  } catch (err) {
    next(err);
  }
};
