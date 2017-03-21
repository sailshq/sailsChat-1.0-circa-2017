/**
 * webpack hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: http://sailsjs.com/docs/concepts/extending-sails/hooks
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

      webpack(sails.config.webpack, function(err, result) {
        console.log(result.toString());
        return done();
      });

    }

  };

};
