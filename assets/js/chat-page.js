/**
 * The chat page.
 *
 * This the main app script that runs the chat page.
 * It handles fetching the initial data, and setting up the chat room and
 * user list components.
 *
 */

// Run after page load.
$(function() {

  // Declare a dictionary to hold info about the app.
  var app = {
    loggedInUserId: SAILS_LOCALS.loggedInUserId,
    users: [],
    messages: []
  };

  //  ┌─┐┌─┐┌┬┐  ┬┌┐┌┬┌┬┐┬┌─┐┬    ┌┬┐┌─┐┌┬┐┌─┐
  //  │ ┬├┤  │   │││││ │ │├─┤│     ││├─┤ │ ├─┤
  //  └─┘└─┘ ┴   ┴┘└┘┴ ┴ ┴┴ ┴┴─┘  ─┴┘┴ ┴ ┴ ┴ ┴

  // Get the initial user list.
  getUsers(function(err, users) {

    if (err) { return alert ('Could not retrieve user list!  Please try reloading the page.');}

    // Add the current user list to the app data.
    app.users = users;

    // Get the initial list of chat messages.
    getChatMessages(function (err, messages) {

      if (err) { return alert ('Could not retrieve messages!  Please try reloading the page.');}

      // Add the current message list to the app data.
      app.messages = messages;


      //  ┬┌┐┌┬┌┬┐┬┌─┐┬  ┬┌─┐┌─┐  ┌─┐┌─┐┌┬┐┌─┐┌─┐┌┐┌┌─┐┌┐┌┌┬┐┌─┐
      //  │││││ │ │├─┤│  │┌─┘├┤   │  │ ││││├─┘│ ││││├┤ │││ │ └─┐
      //  ┴┘└┘┴ ┴ ┴┴ ┴┴─┘┴└─┘└─┘  └─┘└─┘┴ ┴┴  └─┘┘└┘└─┘┘└┘ ┴ └─┘

      // Create a new ChatRoom object.
      var chatRoom = new ChatRoom(app);
      // Initialize the new chat room.
      chatRoom.init();

      // Create a new UserList object.
      var userList = new UserList(app);
      // Initialize the new user list.
      userList.init();

      //  ┬ ┬┌─┐┌┐┌┌┬┐┬  ┌─┐  ┌─┐┌─┐┌─┐┬┌─┌─┐┌┬┐  ┌┐┌┌─┐┌┬┐┬┌─┐┬┌─┐┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
      //  ├─┤├─┤│││ │││  ├┤   └─┐│ ││  ├┴┐├┤  │   ││││ │ │ │├┤ ││  ├─┤ │ ││ ││││└─┐
      //  ┴ ┴┴ ┴┘└┘─┴┘┴─┘└─┘  └─┘└─┘└─┘┴ ┴└─┘ ┴   ┘└┘└─┘ ┴ ┴└  ┴└─┘┴ ┴ ┴ ┴└─┘┘└┘└─┘

      // When a `user` event is received, handle it.
      io.socket.on('user', function(notification) {

        switch (notification.verb) {

          // If a new user was created, add it to the app and to the user list.
          case 'created':
            userList.addNewUserToList(notification.data);
            app.users.push(notification.data);
            break;

          // If a user was updated, update their status in the user list.
          case 'updated':
            var user = _.find(app.users, {id: notification.id});

            if (user.id === app.loggedInUserId && notification.data.online === false) {
              return window.location.reload();
            }

            user.online = notification.data.online;
            userList.updateUserStatus(notification.id, notification.data.online);

        }

      });

      // When a `chatmessage` event is received, handle it.
      io.socket.on('chatmessage', function(notification) {

        switch (notification.verb) {

          // If a new chat was created, add it to the app and to the transcript.
          case 'created':
            chatRoom.renderMessage(notification.data);
            app.messages.push(notification.data);
            break;

        }

      });

    });

  });


  //  ┬ ┬┌┬┐┬┬  ┬┌┬┐┬ ┬  ┌─┐┬ ┬┌┐┌┌─┐┌┬┐┬┌─┐┌┐┌┌─┐
  //  │ │ │ ││  │ │ └┬┘  ├┤ │ │││││   │ ││ ││││└─┐
  //  └─┘ ┴ ┴┴─┘┴ ┴  ┴   └  └─┘┘└┘└─┘ ┴ ┴└─┘┘└┘└─┘

  // Get the current list of users.
  function getUsers(cb) {

    io.socket.get('/user', function(body) {
      return cb(undefined, body);
    });

  }

  // Get the current list of chat messages.
  function getChatMessages(cb) {

    io.socket.get('/chatMessage', function(body) {
      return cb(undefined, body);
    });

  }

});
