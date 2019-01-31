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
  catchErrors(authController.signup)
);

module.exports = router;
