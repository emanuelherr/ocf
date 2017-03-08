/**
 * Created by Henry Suarez on 18/1/2017.
 */

angular
  .module('ocf.services')
  .service('LanguageSelectorService', LanguageSelectorService);

LanguageSelectorService.$inject = [
  '$q',
  '$ionicModal',
  'lodash',
  '$log',
  '$rootScope',
  '$ionicBackdrop',
  '$translate',
  'UserPreferenceService'
];

function LanguageSelectorService($q,
                           $ionicModal,
                           lodash,
                           $log,
                           $rootScope,
                           $ionicBackdrop,
                           $translate,
                           UserPreferenceService) {
  var lss = this;

  lss.selectLangf = selectLangf;
  lss.close = close;
  lss.create = create;
  lss.destroy = destroy;
  lss.open = open;
  lss.isShown = isShown;
  lss.selected = undefined;
  lss.language = undefined;
  lss.lang = [
    {'key':'Spanish', 'value': 'es'},
    {'key':'English', 'value':'en'}
  ];
  lss.languageTemplate = 'apps/supplier/commons/services/languageSelector/languageSelector.html';
  lss.languagePopupOptions = {
    animation: 'none',
    focusFirstInput: false,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  };
  lss.languagePopupAttributes = {
    message: ''
  };

  return lss;

  ////////////////////
  /**
   * Closes the popup
   */
  function close() {
    lss.language.hide();
    $ionicBackdrop.release();
    $rootScope.$broadcast('languagePopupClose', true);
  }

  /**
   * Creates template and stores the pointer to it
   * @param template {String}
   * @param {Object} [options]
   * @param {Object} [attributes]
   */
  function create(template, options, attributes) {
    var q = $q.defer();
    template = template || lss.languageTemplate;

    if (options) {
      lodash.merge(lss.languagePopupOptions, options);
    }
    lss.selected = "English";

    $ionicModal.fromTemplateUrl(template, lss.languagePopupOptions)
      .then(function (popup) {
        $log.debug("Language Popup created", popup);
        lss.language = popup;
        q.resolve("Popup Created");
      })
      .catch(function (fail) {
        $log.language("Language Popup failed to load", fail);
        q.reject(fail);
      });

    return q.promise;
  }

  /**
   * Removes popup from DOM
   */
  function destroy() {
    lss.language.remove();
    $log.debug("Error removed from DOM");
  }

  /**
   * Called when open is needed
   */
  function open() {
    if ($rootScope.userConfiguration != undefined && $rootScope.userConfiguration.preferences != undefined && $rootScope.userConfiguration.preferences.language != undefined){
      lss.selected = (lodash.find(lss.lang, {value: $rootScope.userConfiguration.preferences.language})).key ;//$rootScope.selectedLanguage;
    }else{
      lss.selected = "English";
    }
    lss.language.show();
    $ionicBackdrop.retain();
    $log.debug("Error Open button clicked");
  }

  function isShown() {
    return lss.language.isShown();
  }
  function selectLangf(language){
    lss.selected = language;

    $rootScope.selectedLanguage =language;

    $rootScope.userConfiguration.preferences.language = (lodash.find(lss.lang, {key: language})).value;

    var preferences = {"preferences": {"language": $rootScope.userConfiguration.preferences.language } };

    UserPreferenceService.setUserPreference($rootScope.user.id, preferences);

    $translate.use($rootScope.userConfiguration.preferences.language);
    lss.close();
  }
}
