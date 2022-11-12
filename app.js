const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const globalErrorHandler = require('./controllers/errorController');
const cors = require('cors');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionRoutes');

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests. Try again in an hour',
});

app.use('/api', limiter);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(xss());

app.use('/api/v1/users/', userRouter);
app.use('/api/v1/accounts/', accountRouter);
app.use('/api/v1/transactions/', transactionRouter);

app.use(compression());

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
