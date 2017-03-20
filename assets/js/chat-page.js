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
