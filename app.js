const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/accounts/', accountRouter);
app.use('/api/v1/transactions/', transactionRouter);

app.use(globalErrorHandler);

module.exports = app;
