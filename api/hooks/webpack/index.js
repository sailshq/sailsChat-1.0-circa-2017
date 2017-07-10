/**
 * Webpack hook
 *
 * @description :: A hook to compile assets using Webhook.
 */

var webpack = require('webpack');

module.exports = function defineWebpackHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: function (done) {

      // In production mode, just compile the assets and be done.
      if (process.env.NODE_ENV === 'production') {
        return webpack(sails.config.webpack, done);
      }

      // Otherwise, create a compiler so that we can watch files.
      var compiler = webpack(sails.config.webpack);

      // Trigger the first compile, start watching files, and return
      // an instance we can use to stop the watcher when Sails lowers.
      var watcher = compiler.watch({
          aggregateTimeout: 300,
          // poll: true
          // ^^^^^ If native watching isn't working, uncomment the above.
      }, function(err, stats) {
          sails.log.verbose('Webpack compiled files and outputted:');
          sails.log.verbose(stats.toString());
      });

      // When Sails lowers, stop watching files.
      sails.on('lower', function() {
        watcher && watcher.close();
      });

      // Keep lifting Sails.
      return done();

    }

  };

};
