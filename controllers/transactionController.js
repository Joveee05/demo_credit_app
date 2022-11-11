const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getTransaction = catchAsync(async (req, res, next) => {
  const trnId = req.params.trnId;
  const trn = await knex('transactions')
    .select('id', 'transactionType', 'account_id', 'amount')
    .where('id', trnId);
  if (trn.length === 0) {
    return next(new AppError('No transaction found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: trn,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const trn = await knex('transactions').select(
    'id',
    'transactionType',
    'account_id',
    'amount'
  );
  res.status(200).json({
    status: 'success',
    result: trn.length,
    data: trn,
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  let trnId = req.params.trnId;
  const trn = await knex('transactions').where('id', trnId).del();
  if (!trn) {
    return next(new AppError('No transaction found with that Id', 404));
  }
  res.status(204).json({
    data: null,
  });
});
