/**
 * The login page.
 *
 * This the main app script that runs the login page.
 * It handles sending login attempts, creating new users and updating user status.
 *
 */

$(function() {

  //  ┬ ┬┌─┐┌┐┌┌┬┐┬  ┌─┐  ╦ ╦╦  ┌─┐┬  ┬┌─┐┌┐┌┌┬┐┌─┐
  //  ├─┤├─┤│││ │││  ├┤   ║ ║║  ├┤ └┐┌┘├┤ │││ │ └─┐
  //  ┴ ┴┴ ┴┘└┘─┴┘┴─┘└─┘  ╚═╝╩  └─┘ └┘ └─┘┘└┘ ┴ └─┘

  // Send a chat whenever the "send-chat" button is pressed, or enter is pressed inside the chat input.
  $('.login-page .login-button').click(attemptLogin);
  $('.login-page .username-input').keydown(function(e) {
    if (e.keyCode === 13) {
      return attemptLogin();
    }
  });

  //  ┌─┐┌┬┐┌┬┐┌─┐┌┬┐┌─┐┌┬┐╦  ┌─┐┌─┐┬┌┐┌  ┌─┐┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌
  //  ├─┤ │  │ ├┤ │││├─┘ │ ║  │ ││ ┬││││  ├┤ │ │││││   │ ││ ││││
  //  ┴ ┴ ┴  ┴ └─┘┴ ┴┴   ┴ ╩═╝└─┘└─┘┴┘└┘  └  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘

  function attemptLogin() {
    var username = $('.login-page .username-input').val();
    if (!username) { return; }

    // Attempt to log the user in.
    io.socket.put('/user/login', {username: username}, function(body, response) {

      // If no such user was found, try creating one.
      if (response.statusCode === 404) {

        // Attempt to create a user.
        io.socket.post('/user', {username: username}, function(body, response) {

          if (response.statusCode !== 200) {
            alert('An error occurred trying to log you in with that username.  Please try again.');
            return;
          }

          // Try logging in again.
          attemptLogin();

          return;

        });

        return;

      }

      // If there's no body, it means the user was already logged in, so just reload the page.
      // This will cause the chat page to appear.
      if (!body) {
        window.location.reload();
      }

      // Update the user's status.
      io.socket.patch('/user/' + body.id, { online: true }, function (body, response) {

        // Handle errors.
        if (response.statusCode !== 200) {
          alert('An error occurred trying to log you in with that username.  Please try again.');
          return;
        }

        // Reload the page.  Since we're logged in now, the chat page will appear.
        window.location.reload();

      });

    });

  }

});
