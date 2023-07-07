const { andWhere } = require('../database');
const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

async function insertDataIntoTransactionsTable(
  transactionType,
  amount,
  accounts_id,
  users_id
) {
  const add = { transactionType, amount, accounts_id, users_id };
  const result = await knex('transactions').insert(add);
  if (result) {
    return true;
  } else {
    return false;
  }
}

exports.createAccount = catchAsync(async (req, res, next) => {
  const add = {};
  add.email = req.body.email;
  add.users_id = req.params.userId;
  const user = await knex('users')
    .where('email', '=', add.email)
    .andWhere('id', '=', add.userId)
    .then(async (user) => {
      if (user) {
        await knex('accounts').insert(add);
        return res.status(201).json({
          status: 'success',
          message: 'Account created successfully',
        });
      } else {
        return next(
          new AppError(
            'User does not exist. Please sign up with your email',
            400
          )
        );
      }
    });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  let userId = req.params.userId;
  const account = await knex('accounts')
    .select('id', 'users_id', 'email', 'balance')
    .where('users_id', userId);
  if (account.length < 1) {
    return next(new AppError('No acount found with that Id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: account,
  });
});

exports.getAllAccounts = catchAsync(async (req, res, next) => {
  const accounts = await knex('accounts').select(
    'id',
    'users_id',
    'email',
    'balance'
  );
  res.status(200).json({
    status: 'success',
    result: accounts.length,
    data: accounts,
  });
});

exports.deleteAccount = catchAsync(async (req, res, next) => {
  let accountId = req.params.accountId;
  const account = await knex('accounts').where('id', accountId).del();
  if (!account) {
    return next(new AppError('No account found with that Id', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deposit = catchAsync(async (req, res, next) => {
  const accounts_id = req.params.accountId;
  const users_id = req.body.users_id;
  const amount = req.body.amount;
  const creditAccount = await knex('accounts')
    .where('users_id', '=', users_id)
    .increment('balance', amount);
  if (!creditAccount) {
    return next(new AppError('No account or user found ', 404));
  } else {
    await insertDataIntoTransactionsTable(
      'credit',
      amount,
      accounts_id,
      users_id
    );

    res.status(200).json({
      status: 'success',
      message: 'Deposit successful',
    });
  }
});

exports.withdraw = catchAsync(async (req, res, next) => {
  const accounts_id = req.params.accountId;
  const amount = req.body.amount;
  const debitAccount = await knex('accounts')
    .where('id', '=', accounts_id)
    .decrement('balance', amount);
  if (!debitAccount) {
    return next(new AppError('No account found with the provided Id', 404));
  } else {
    await insertDataIntoTransactionsTable('debit', amount, accounts_id);

    if (true) {
      return res.status(200).json({
        status: 'success',
        message: 'Withdrawal successful',
      });
    } else {
      return next(new AppError('Something went wrong', 400));
    }
  }
});

exports.transfer = catchAsync(async (req, res, next) => {
  const accounts_id = req.body.accountId;
  const users_id = req.params.userId;
  const to = req.body.to;
  const amount = req.body.amount;
  const from = req.body.from;
  const transfer = await knex('accounts')
    .where('email', '=', from)
    .andWhere('users_id', '=', users_id)
    .decrement('balance', amount)
    .then(
      await knex('accounts')
        .where('email', '=', to)
        .increment('balance', amount)
    );
  if (!transfer) {
    return next(new AppError('No user found with that Id or email', 404));
  } else {
    await insertDataIntoTransactionsTable(
      'debit',
      amount,
      accounts_id,
      users_id
    );

    if (true) {
      return res.status(200).json({
        status: 'success',
        message: 'Transfer successful',
      });
    } else {
      return next(new AppError('Something went wrong', 400));
    }
  }
});
