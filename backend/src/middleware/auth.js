const jwt = require('jsonwebtoken');
const HttpError = require('../utils/HttpError');
const { jwtSecret } = require('../config/env');

module.exports = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new HttpError(401, 'Authentication required'));
  }

  try {
    req.userId = jwt.verify(token, jwtSecret).id;
    next();
  } catch {
    next(new HttpError(401, 'Session expired, please log in again'));
  }
};
