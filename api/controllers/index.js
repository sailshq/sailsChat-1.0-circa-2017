module.exports = {


  friendlyName: 'Index',


  description: 'Display the login page or the chat page, depending on whether there is a logged-in user.',


  inputs: {

  },


  exits: {

    chatPage: {
      responseType: 'view',
      viewTemplatePath: 'chat'
    }

  },


  fn: function (inputs, exits, env) {

    return exits.chatPage({
      loggedInUserId: 1,
      username: 'sgress454'
    });

  }

};
