/* global Bugsnag:false */
(function() {
  'use strict';

  angular
    .module('angularBugsnag')
    .constant('Bugsnag', Bugsnag);
})();
