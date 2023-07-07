const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOneTransaction = catchAsync(async (req, res, next) => {
  const trnId = req.params.trnId;
  const trn = await knex('transactions')
    .select('id', 'transactionType', 'accounts_id', 'users_id', 'amount')
    .where('id', trnId);
  if (trn.length < 1) {
    return next(new AppError('No transaction found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: trn,
  });
});

exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const trn = await knex('transactions').select(
    'id',
    'transactionType',
    'accounts_id',
    'users_id',
    'amount'
  );
  res.status(200).json({
    status: 'success',
    result: trn.length,
    data: trn,
  });
});

exports.deleteTransaction = catchAsync(async (req, res, next) => {
  let trnId = req.params.trnId;
  const trn = await knex('transactions').where('id', trnId).del();
  if (!trn) {
    return next(new AppError('No transaction found with that Id', 404));
  }
  res.status(204).json({
    data: null,
  });
});

exports.getAllUserTransactions = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await knex('transactions').where('users_id', userId);
  if (user.length < 1) {
    return next(new AppError('No user transaction history found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: user.length,
    data: user,
  });
});
