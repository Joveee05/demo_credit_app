const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  const user = await knex('users')
    .select('id', 'first_name', 'last_name', 'balance')
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
  const { email, first_name, last_name, password } = req.body;
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

exports.topUp = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  let balance = req.body.amount;
  const creditAccount = await knex('users')
    .where('id', '=', userId)
    .increment('balance', balance);

  res.status(200).json({
    status: 'success',
    message: 'Deposit successful',
  });
});

exports.withdrawFunds = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  let balance = req.body.amount;
  const debitAccount = await knex('users')
    .where('id', '=', userId)
    .decrement('balance', balance);

  res.status(200).json({
    status: 'success',
    message: 'Withdrawal successful',
  });
});

exports.transferFunds = catchAsync(async (req, res, next) => {
  let to = req.body.to;
  let balance = req.body.amount;
  let from = req.body.from;

  const transfer = await knex('users')
    .where('email', '=', to)
    .increment('balance', balance)
    .then(
      await knex('users')
        .where('email', '=', from)
        .decrement('balance', balance)
    );
  if (!transfer) {
    return next(new AppError('No user found with that email', 404));
  }
  res.status(200).json({
    status: 'success',
    message: 'Transfer successful',
  });
});
