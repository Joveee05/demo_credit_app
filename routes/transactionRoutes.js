const express = require('express');
const authController = require('../controllers/auth');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.use(authController.protect);

router.get('/', transactionController.getAll);

router
  .route('/:trnId')
  .get(transactionController.getTransaction)
  .delete(transactionController.deleteOne);

module.exports = router;
