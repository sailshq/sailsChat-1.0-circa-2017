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

    // TODO
    // Replace this hard-coded data with an API request.
    return cb(undefined, [
      {
        id: 1,
        username: 'sgress454',
        online: true
      },
      {
        id: 2,
        username: 'mikermcneil',
        online: true
      },
      {
        id: 3,
        username: 'particlebanana',
        online: true
      },
      {
        id: 4,
        username: 'rachaelshaw',
        online: true
      },
      {
        id: 5,
        username: 'irlnathan',
        online: false
      }
    ]);

  }

  // Get the current list of chat messages.
  function getChatMessages(cb) {

    // TODO
    // Replace this hard-coded data with an API request.
    return cb(undefined, [
      {
        id: 1,
        user: {
          id: 1,
          username: 'sgress454'
        },
        text: 'Howdy everyone'
      },
      {
        id: 2,
        user: {
          id: 2,
          username: 'mikermcneil'
        },
        text: 'What\'s up'
      },
      {
        id: 3,
        text: 'rachaelshaw joined the room'
      },
      {
        id: 4,
        user: {
          id: 4,
          username: 'rachaelshaw'
        },
        text: 'Chatz f\'real'
      },
      {
        id: 5,
        user: {
          id: 2,
          username: 'mikermcneil'
        },
        text: 'f\'real'
      },
      {
        id: 6,
        user: {
          id: 3,
          username: 'particlebanana'
        },
        text: 'f\'real'
      }
    ]);

  }

});
