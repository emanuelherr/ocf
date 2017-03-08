angular
  .module('ocf.controllers')
  .config(ConfigureLocationSelecion);

ConfigureLocationSelecion.$inject = ['$stateProvider'];

/**
 * Apps states/routes definition
 * @param $stateProvider
 */
function ConfigureLocationSelecion($stateProvider) {
  $stateProvider
    .state('ocf.locationSelector', {
      url: '/locationSelector',
      views: {
        "ocf": {
          controller: 'LocationSelectorController',
          templateUrl: 'commons/LocationSelector/locationSelector.html'
        }
      }
    })
  ;
}
