exports.checkAuth = (req, res, next) => {
  // isAuthenticated -> passport method
  if (req.isAuthenticated()) {
    return next();
  }
};