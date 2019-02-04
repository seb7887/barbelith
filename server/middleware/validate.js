exports.validateSignup = (req, res, next) => {
  req.sanitizeBody('name');
  req.sanitizeBody('email');
  req.sanitizeBody('password');

  // Name is non-null and is 4 to 12 characters
  req.checkBody('name', 'You must supply a name').notEmpty();
  req.checkBody('name', 'Name must be between 4 and 12 characters')
    .isLength({ min: 4, max: 12 });

  // Email is non-null, valid and normalized
  req.checkBody('email', 'You must supply an email').notEmpty();
  req.checkBody('email', 'Enter a valid email').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  // Password is non-null
  req.checkBody('password', 'You must supply a password').notEmpty();
  req.checkBody('password', 'Password must be between 4 and 12 characters')
    .isLength({ min: 4, max: 12 });

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).send(firstError);
  }

  next();
};
