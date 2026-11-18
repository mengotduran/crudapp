const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const HttpError = require('../utils/HttpError');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const signToken = (user) =>
  jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiresIn });

exports.register = async (req, res) => {
  const name = req.body.name?.trim();
  const email = req.body.email?.trim().toLowerCase();
  const { password } = req.body;

  if (!name || !email || !password) {
    throw new HttpError(400, 'Name, email and password are required');
  }
  if (!EMAIL_PATTERN.test(email)) {
    throw new HttpError(400, 'Please provide a valid email');
  }
  if (password.length < 6) {
    throw new HttpError(400, 'Password must be at least 6 characters');
  }
  if (await UserModel.findByEmail(email)) {
    throw new HttpError(409, 'An account with this email already exists');
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ name, email, password: hashed });

  res.status(201).json({ user, token: signToken(user) });
};

exports.login = async (req, res) => {
  const email = req.body.email?.trim().toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = await UserModel.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, 'Invalid email or password');
  }

  const { password: _, ...publicUser } = user;
  res.json({ user: publicUser, token: signToken(user) });
};

exports.me = async (req, res) => {
  const user = await UserModel.findById(req.userId);
  if (!user) throw new HttpError(404, 'User not found');
  res.json({ user });
};
