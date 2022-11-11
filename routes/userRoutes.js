const express = require('express');
const authController = require('../controllers/auth');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/sign-up', authController.createUser);

router.post('/login', authController.login);

router.use(authController.protect);

router.get('/', userController.getAllUsers);

router.get('/logout', authController.logout);

router
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
