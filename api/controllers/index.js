module.exports = {


  friendlyName: 'Index',


  description: 'Display the login page or the chat page, depending on whether there is a logged-in user.',


  inputs: {

  },


  exits: {

    loginPage: {
      responseType: 'view',
      viewTemplatePath: 'login'
    },

    chatPage: {
      responseType: 'view',
      viewTemplatePath: 'chat'
    }

  },


  fn: function (inputs, exits, env) {

    // If there is no user ID in the session, show the login page.
    if (!env.req.session.userId) {
      return exits.loginPage({});
    }

    // Attempt to find the user whose ID is in the session.
    User.findOne({id: env.req.session.userId}).exec(function(err, user) {
      if (err) { return exits.error(err); }

      // If the user couldn't be found, remove the ID from the session and show the login page.
      // This shouldn't happen, so we'll log an error, but it's also not fatal.
      if (!user) {
        sails.log.error('No user could be found with the ID currently stored in the session (' + env.req.session.userId + ').  Logging out...');
        env.req.session.userId = null;
        return exits.loginPage({});
      }

      // If the user's "online" flag is set to false, this request is coming from a client representing a
      // user that was logged out in another client.  So we'll log them out here as well, and show
      // the login page.
      if (user.online === false) {
        env.req.session.userId = null;
        return exits.loginPage({});
      }

      // Looks like this is a valid, logged-in, online user, so show the chat page.
      return exits.chatPage({
        loggedInUserId: env.req.session.userId,
        username: user.username
      });
    });

  }

};
