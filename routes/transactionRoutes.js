const express = require('express');
const authController = require('../controllers/auth');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.use(authController.protect);

router.get('/', transactionController.getAllTransactions);

router.get('/:userId', transactionController.getAllUserTransactions);

router
  .route('/:trnId')
  .get(transactionController.getTransaction)
  .delete(transactionController.deleteTransaction);

module.exports = router;
