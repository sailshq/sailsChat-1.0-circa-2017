/**
 * isLoggedIn
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how this policy works and how to use it, see:
 *   http://sailsjs.com/anatomy/api/policies/isLoggedIn.js
 */
module.exports = function isLoggedIn(req, res, next) {

  // Check that there is a user ID in the session.
  if (req.session.userId) {

    // Look up the user whose ID is in the session.
    User.findOne({id: req.session.userId}).exec(function(err, user) {
      if (err) { return res.serverError(err);}
      if (!user) { return res.forbidden(); }

      // If the user is not online, remove their ID from the session and return a 404.
      if (!user.online) {
        req.session.userId = null;
        return res.forbidden();
      }

      // User is logged in, so we can continue!
      return next();
    });

    return;

  }

  //--•
  // No user is logged in, so return the "forbidden" response.
  return res.forbidden();

};
