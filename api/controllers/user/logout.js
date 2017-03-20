module.exports = {


  friendlyName: 'Logout',


  description: 'Logout user.',


  inputs: {

  },


  fn: function (inputs, exits, env) {

    // Get the ID of the logged-in user.
    var loggedInUserId = env.req.session.userId;

    // If there is no logged-in user, just leave through the `success` exit.
    if (!loggedInUserId) { return exits.success(); }

    // Look up the logged-in user.
    User.findOne({id: loggedInUserId}).exec(function(err, user) {

      if (err) { return exits.error(err); }
      if (!user) {
        env.req.session.userId = null;
        return exits.success();
      }

      // Log the user out by removing the userId from the session.
      env.req.session.userId = null;

      // Create an admin chat message.
      ChatMessage.create({
        text: user.username + ' left the room.'
      })
      .meta({fetch: true})
      .exec(function(err, message) {
        if (err) { return exits.serverError(err); }

        // Blast that message out to all sockets (except the sender).
        sails.sockets.blast('chatmessage', {
          verb: 'created',
          id: message.id,
          data: {
            text: message.text
          }
        }, env.req);
      });

      // Return through the `success` exit.
      return exits.success();

    });

  }


};
