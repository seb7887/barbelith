const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');

// Middleware
const validate = require('../middleware/validate');

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

module.exports = router;
