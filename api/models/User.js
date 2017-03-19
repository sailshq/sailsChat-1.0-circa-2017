/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: http://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true
    },

    online: {
      type: 'boolean',
      defaultsTo: true
    },

    chats: {
      collection: 'ChatMessage',
      via: 'user'
    }

  },

};

