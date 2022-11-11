const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  const user = await knex('users')
    .select('id', 'email', 'first_name', 'last_name')
    .where('id', userId);
  if (user.length === 0) {
    return next(new AppError('No user found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const user = await knex('users').select(
    'id',
    'first_name',
    'last_name',
    'balance'
  );
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { email, first_name, last_name } = req.body;
  let userId = req.params.userId;
  const update = await knex('users').update(req.body).where('id', userId);
  if (!update) {
    return next(new AppError('No user found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Update successful!',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  const user = await knex('users').where('id', userId).del();
  if (!user) {
    return next(new AppError('No user found with that Id', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
