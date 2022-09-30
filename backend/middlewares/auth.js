const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;
  try {
    const token = cookie.replace('jwt=', '');
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    next();
  } catch (err) {
    next(new UnauthorizedError('Не авторизовано.'));
  }
};
