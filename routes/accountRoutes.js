const express = require('express');
const authController = require('../controllers/auth');
const accountController = require('../controllers/accountController');

const router = express.Router();

router.use(authController.protect);

router.get('/', accountController.getAllAccounts);

router.post('/create-account/:userId', accountController.createAccount);

router.post('/deposit/:accountId', accountController.deposit);

router.post('/withdraw/:accountId', accountController.withdraw);

router.post('/transfer/:userId', accountController.transfer);

router.route('/:userId').get(accountController.getAccount);
router.delete('/:accountId', accountController.deleteAccount);

module.exports = router;
