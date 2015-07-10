(function() {
  'use strict';

  angular
    .module('angularBugsnag')
    .provider('bugsnag', bugsnag);

  bugsnag.$inject = [];

  function bugsnag() {
    var service = {};

    return service;
    ////////////////////
    
  }
})();
