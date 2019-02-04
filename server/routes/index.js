const express = require('express');
const router = express.Router();

// Controllers
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const postController = require('../controllers/post');

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
  .put(
    checkAuth,
    userController.uploadAvatar,
    catchErrors(userController.resizeAvatar),
    catchErrors(userController.updateUser)
  )
  .delete(checkAuth, catchErrors(userController.deleteUser));

router.get('/api/users/profile/:userId', userController.getUserProfile);

router.put(
  '/api/users/follow',
  checkAuth,
  catchErrors(userController.addFollowing),
  catchErrors(userController.addFollower)
);

router.put(
  '/api/users/unfollow',
  checkAuth,
  catchErrors(userController.deleteFollowing),
  catchErrors(userController.deleteFollower)
);

router.get(
  '/api/users/feed/:userId',
  checkAuth,
  catchErrors(userController.getUserFeed)
);

/**
 * POST ROUTES: /api/posts
 */
router.param('postId', postController.getPostById);

router.post(
  '/api/posts/new/:userId',
  checkAuth,
  postController.uploadImage,
  catchErrors(postController.resizeImage),
  catchErrors(postController.addPost)
);

module.exports = router;
