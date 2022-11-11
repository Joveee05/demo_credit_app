const { andWhere } = require('../database');
const knex = require('../database');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const credit = 1;
const debit = 0;

async function insertDataIntoTransactionsTable(
  transactionType,
  amount,
  account_id,
  user_id
) {
  const result = await knex('transactions').insert([
    { transactionType },
    { amount },
    { account_id },
  ]);
  if (result) {
    return true;
  } else {
    return false;
  }
}

exports.createAccount = catchAsync(async (req, res, next) => {
  const { user_email, user_id } = req.body;
  const user = await knex('users')
    .where('id', '=', req.body.user_id)
    .first()
    .then(async (user) => {
      if (user) {
        return next(new AppError('User already exists', 404));
      } else {
        await knex('accounts').insert(req.body);
      }
    });
  res.status(201).json({
    status: 'success',
    message: 'Account created successfully',
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  let accountId = req.params.accountId;
  const account = await knex('accounts')
    .select('id', 'user_email', 'user_id', 'balance')
    .where('id', accountId);
  if (account.length === 0) {
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
    'user_id',
    'user_email',
    'balance'
  );
  res.status(200).json({
    status: 'success',
    result: accounts.length,
    data: accounts,
  });
});

// exports.updateAccount = catchAsync(async (req, res, next) => {
//   const {} = req.body;
//   const accountId = req.params.accountId;
//   const update = await knex('accounts').update(req.body).where('id', accountId);
//   if (!update) {
//     return next(new AppError('No account found with that Id', 404));
//   }
//   res.status(200).json({
//     status: 'success',
//     message: 'Update successful!',
//   });
// });

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
  const account_Id = req.params.accountId;
  const amount = req.body.amount;
  const creditAccount = await knex('accounts')
    .where('id', '=', account_Id)
    .increment('balance', amount);
  if (!creditAccount) {
    return next(new AppError('No account found with that Id', 404));
  } else {
    await insertDataIntoTransactionsTable(credit, amount, account_Id);

    if (true) {
      return res.status(200).json({
        status: 'success',
        message: 'Deposit successful',
      });
    } else {
      return next(new AppError('Something went wrong', 400));
    }
  }
});

exports.withdraw = catchAsync(async (req, res, next) => {
  const account_Id = req.params.accountId;
  const user_id = req.body.id;
  const amount = req.body.amount;
  const debitAccount = await knex('accounts')
    .where('id', '=', account_Id)
    .decrement('balance', amount);
  if (!debitAccount) {
    return next(new AppError('No user found with the provided Id', 404));
  } else {
    await insertDataIntoTransactionsTable(debit, amount, account_Id, user_id);

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
  const account_Id = req.params.accountId;
  const to = req.body.to;
  const amount = req.body.amount;
  const from = req.body.from;
  const transfer = await knex('accounts')
    .where('user_email', '=', to)
    .increment('balance', amount)
    .then(
      await knex('accounts')
        .where('user_email', '=', from)
        .decrement('balance', amount)
    );
  if (!transfer) {
    return next(new AppError('No user found with that email', 404));
  } else {
    await insertDataIntoTransactionsTable(debit, amount, account_Id);

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
