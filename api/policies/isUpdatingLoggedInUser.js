/**
 * isUpdatingLoggedInUser policy
 *
 * Checks that the `id` param in the request matches that of the logged-in user.
 *
 */

module.exports = function (req, res, next) {
  // If the `id` param matches the ID of the current user, go ahead.
  if (req.param('id') && req.param('id').toString() === req.session.userId.toString()) {

    return next();

  }

  // Otherwise pretend there's no such endpoint.
  return res.notFound();

};
