/**
 * ChatMessage.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: http://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    user: {
      model: 'User'
    },

    text: {
      type: 'string',
      required: true
    }

  },

};

