/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = function(cb) {

  User.createEach([
    {
      username: 'sgress454',
      online: true
    },
    {
      username: 'mikermcneil',
      online: true
    },
    {
      username: 'particlebanana',
      online: true
    },
    {
      username: 'rachaelshaw',
      online: true
    },
    {
      username: 'irlnathan',
      online: false
    }
  ])
  .meta({fetch: true})
  .exec(function(err, users) {

    var indexedUsers = _.indexBy(users, 'username');

    ChatMessage.createEach([
      {
        user: indexedUsers.sgress454.id,
        text: 'Howdy everyone'
      },
      {
        user: indexedUsers.mikermcneil.id,
        text: 'What\'s up'
      },
      {
        text: 'rachaelshaw joined the room'
      },
      {
        user: indexedUsers.rachaelshaw.id,
        text: 'Chatz f\'real'
      },
      {
        user: indexedUsers.mikermcneil.id,
        text: 'f\'real'
      },
      {
        user: indexedUsers.particlebanana.id,
        text: 'f\'real'
      }

    ]).exec(cb);

  });

};
