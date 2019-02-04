const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// Middleware
const validate = require('../middleware/validate');
const { checkAuth } = require('../middleware/checkAuth');

// Error handler
const { catchErrors } = require('../handlers/error');

/**
 * AUTH ROUTES: /api/auth
 */
router.post(
  '/api/auth/signup',
  validate.validateSignup,
  catchErrors(authController.signup),
  authController.signin
);
router.post('/api/auth/signin', authController.signin);
router.get('/api/auth/signout', authController.signout);

/**
 * USER ROUTES: /api/users
 */
router.get('/api/users', userController.getUsers);

router.param('userId', userController.getUserById);

router
  .route('/api/users/:userId')
  .get(userController.getAuthUser)
  .delete(checkAuth, catchErrors(userController.deleteUser));

router.get('/api/users/profile/:userId', userController.getUserProfile);

module.exports = router;
