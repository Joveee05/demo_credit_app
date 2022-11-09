const express = require('express');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
};

exports.createUser = catchAsync(async (req, res, next) => {
  let add = {};
  add.email = req.body.email;
  add.first_name = req.body.firstName;
  add.last_name = req.body.lastName;
  add.password = await bcrypt.hash(req.body.password, 12);
  const newUser = await knex('users').insert(add);

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const user = knex('users')
    .where({ email: req.body.email })
    .first()
    .then((user) => {
      if (!user) {
        res.status(400).json({
          error: 'Incorrect email or password. Try again',
        });
      } else {
        return bcrypt
          .compare(req.body.password, user.password)
          .then((isAuthenticated) => {
            if (!isAuthenticated) {
              res.status(400).json({
                error: 'Incorrect email or password. Try again',
              });
            } else {
              return createSendToken(user, 200, res);
            }
          });
      }
    });
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: 'Logged Out' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    );
  }
  next();
});
