const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/sign-up', authController.createUser);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.use(authController.protect);

router.get('/', userController.getAllUsers);

router.post('/deposit/:userId', userController.topUp);

router.post('/withdraw/:userId', userController.withdrawFunds);

router.post('/transfer', userController.transferFunds);

router
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
