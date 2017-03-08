angular
  .module('ocf.controllers',[])
  .config(ConfigureHomeController);

ConfigureHomeController.$inject = ['$stateProvider'];

function ConfigureHomeController($stateProvider) {
  $stateProvider
    .state('ocf.home', {
      url: "/home",
      views: {
        "ocf": {
          controller: 'HomeController',
          templateUrl: 'home/ocfHome.html'
        }
      },
      resolve: {},
      data: {}
    })
  ;
}
