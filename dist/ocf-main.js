angular.module('ocf.services', ['toaster'])
  //
  //.factory('DocumentService', function (SessionService, $rootScope) {
  //
  //
  //  //TODO:set app and type
  //  var baseDocument = {
  //    _id: '', // string
  //    author: '', // string
  //    creationDate: '', // timestamp
  //    lastUpdate: '', // timestamp
  //    type: '', // string lotqc
  //    appName: '', // string LotQC
  //    organizationId: '', // int
  //    locationId: '', // 1546 <-- comes in the configuration document (PH Location)
  //    lastVersion: '', // int 1
  //    content: {},
  //    _deleted: false
  //  };
  //  var document = this;
  //
  //  document.createId = function (docId, docType, appName) {
  //    var user = $rootScope.user;
  //    var sessionID = SessionService.sessionID().sessionId;
  //
  //    return appName + "_" + docType + "_" + docId + "_" + user.username + "-" + sessionID;
  //  };
  //
  //  document.createDocument = function (doc, docType, appName) {
  //    var configObject = SessionService.ocfManager.getApplicationConfig($rootScope.selectedLocation.locationId, appName);
  //    var newDocument = this.baseDocument();
  //    var user = $rootScope.user;
  //
  //    newDocument._id = this.createId(docType,appName);
  //    newDocument.author = user.username;
  //    newDocument.content = angular.copy(doc);
  //    newDocument.creationDate = new Date().getTime();
  //    newDocument.lastUpdate = newDocument.creationDate;
  //    newDocument.lastVersion = 1;
  //    newDocument.organizationId = user.organizationId;
  //    newDocument.type = docType;
  //    newDocument.appName = appName;
  //    newDocument.locationId = $rootScope.selectedLocation.locationId;
  //
  //    return newDocument;
  //  };
  //
  //  document.baseDocument = function () {
  //    return angular.copy(baseDocument);
  //  };
  //
  //  document.generateDocId = function(docType,appName) {
  //    return appName + '_' + docType + '_01';
  //  }
  //
  //  return document;
  //})


  .factory('URLManager', ["$location", "EnvironmentConfig", "CouchDbConfig", "OCFConfig", "StagingConfig", "PutAwayConfig", function ($location, EnvironmentConfig, CouchDbConfig, OCFConfig, StagingConfig, PutAwayConfig) {
    var environmentHost = EnvironmentConfig.host + EnvironmentConfig.apiPath;
    var ocfHost = OCFConfig.host + OCFConfig.apiPath + OCFConfig.servicePath;
    //var couchDbHost = CouchDbConfig.host;
    var stagingConfig = StagingConfig.host + StagingConfig.apiPath;
    var putAwayConfig = PutAwayConfig.host + PutAwayConfig.apiPath;

    var resources = {
      session: environmentHost + 'authentication/session',
      //sessionID: ocfHost + 'application/getSessionId/:userID',
      //couchDbSession: couchDbHost + '_session',
      //initialConfig: ocfHost + "application/load/:appId/:locationId",
      applications: ocfHost + "application/access",
      //couchDbUser: couchDbHost + "_users/org.couchdb.user",
      //tagProcess: environmentHost + 'resources/e20receiving/:tagEpc',
      //tagInfo: environmentHost + 'resources/product_profile/produceProfileIdByEPC/:tagEpc',
      //binInfo: environmentHost + 'resources/tag/tagType/:tagEpc',
      ocfConfigurations: ocfHost + 'application/ocf/configurations',
      passwordChange: environmentHost + 'resources/password_change/:organizationId',
      passwordRecover: environmentHost + 'resources/password_recover',
      todayOrders: stagingConfig + 'resource/staging/order/:packhouseId/:appLocationId/:isRefresh',
      selectOrders: stagingConfig + 'resource/staging/selectedOrders',
      getSelectedOrders: stagingConfig + 'resource/staging/product/order/:packhouseId/:appLocationId/:isRefresh',
      closeOrder: stagingConfig + 'resource/staging/order/close/:packhouseId/:appLocationId/:orderId',
      removePallet: stagingConfig + 'resource/staging/pallet/remove/:packhouseId/:appLocationId/:tagEpc/:reason',
      assignPallet: stagingConfig + 'resource/staging/pallet/assign/:packhouseId/:appLocationId/:tagEpc/:assignRemovedPallet',
      unassignPallet: stagingConfig + 'resource/staging/pallet/unassign',
      overridePallet: stagingConfig + 'resource/staging/pallet/override/:packhouseId/:appLocationId/:tagEpc/:orderId',
      stagingConfiguration: stagingConfig + 'resource/staging/configuration',
      pallet: stagingConfig + 'resource/staging/pallet/:packhouseId/:appLocationId/:isRefresh',
      palletDetail: stagingConfig + 'resource/staging/pallet/detail/:packhouseId/:appLocationId/:tagEpc',
      assignPOTag: stagingConfig + 'resource/staging/order/assign/tag/:packhouseId/:appLocationId/:orderId/:tagEpc',
      reopenOrder: stagingConfig + 'resource/staging/order/reopen',
      apiLogMessage : environmentHost + 'resources/app_data_logging',
      grayLogMessage: 'http://192.168.6.38:12201/gelf',
      putAwayConfigurations: putAwayConfig + 'resource/pap/configurations',
      palletInfo: putAwayConfig + 'resource/pap/storage/area/assign/pallet/:tagEpc/packhouse/:packhouseId',
      confirmSA: putAwayConfig + 'resource/pap/storage/area/confirm',
      unassignSA: putAwayConfig + 'resource/pap/storage/area/unassign/pallet',
      language: environmentHost+ 'resources/user/preferences/:userId',
      storageAreaValid: putAwayConfig + 'resource/pap/storage/area/:barCode',
      unknown: environmentHost + 'UNKNOWN_URL'
    };

    return {
      getUrl: function (resource) {
        return resources[resource] ? resources[resource] : resources.unknown;
      }
    };
  }])


  .factory('navigateTo', ["$state", "$rootScope", function ($state,$rootScope) {
    return {
      login: function () {
        $state.go('ocf.login');
      },

      home: function () {
        $state.go('ocf.home');
      },

      forgotPassword: function () {
        $state.go('ocf.forgotPassword');
      },

      changePassword: function () {
        $state.go('ocf.changePassword');
      },

      gdc: function () {
        $state.go('ocf.retailer.gdcSelector', {}, { reload: true });
      },

      g10: function () {
        $state.go('ocf.supplier.staging.todayOrders', {}, { reload: true });
      },

      g04: function () {
        $state.go('ocf.supplier.g4.palletDetails', {}, { reload: true });
      },

      stagingFillOrders: function () {
        $state.go('ocf.supplier.staging.fillOrders', {}, { reload: true });
      },

      locationSelector:function () {
        $state.go('ocf.locationSelector', {}, { reload: true });
      },

      retailer: function () {
        if($rootScope.isPilot){
          $state.go('ocf.retailer.baseline.listOfSamplesPilot');
        }
        else{
          $state.go('ocf.retailer.baseline.listOfSamples');
        }
      },
    };
  }])


  .factory('encode', function () {
    var encode = this;

    encode.encodeCredentials = function (credentials) {
      return window.btoa(credentials.username + ':' + credentials.password);
    };

    encode.decodeCredentials = function (credentials) {
      return undefined != credentials ? window.atob(credentials).split(":") : false;
    };

    encode.decodeCredentialsAsObject = function (credentials) {
      var usr = encode.decodeCredentials(credentials);
      return {
        username: usr[0],
        password: usr[1]
      };
    };

    return encode;
  })


  .factory('LoadingService', ["$ionicLoading", function ($ionicLoading) {
    var loading = null;

    return {
      // Trigger the loading indicator
      show: function (message) {

        // Show the loading overlay and text
        loading = $ionicLoading.show({

          // The text to display in the loading indicator
          template: '<ion-spinner icon="lines"></ion-spinner>' +
          '<div>' + message || 'Loading' + '</div>',

          // The animation to use
          animation: 'fade-in'
          //,
          //
          //// The delay in showing the indicator
          //delay: 500
        });
      },

      // Hide the loading indicator
      hide: function () {
        $ionicLoading.hide();
      }
    };

  }])

  .factory('MessageService', function () {
    var messages = {
      information: [],
      success: [],
      warning: [],
      error: []
    };

    var clear = function () {
      messages.information.length = 0;
      messages.success.length = 0;
      messages.warning.length = 0;
      messages.error.length = 0;
    };

    var addMessage = function (type, txt, clearPrevious) {
      if (clearPrevious) {
        clear();
      }
      messages[type].push(txt);
    };

    return {
      getCurrentMessages: function () {
        return messages;
      },

      clear: function () {
        clear();
      },

      addSuccessMessage: function (txt, clearPrevious) {
        addMessage('success', txt, clearPrevious);
      },

      addInformationMessage: function (txt, clearPrevious) {
        addMessage('information', txt, clearPrevious);
      },

      addWarningMessage: function (txt, clearPrevious) {
        addMessage('warning', txt, clearPrevious);
      },

      addErrorMessage: function (txt, clearPrevious) {
        addMessage('error', txt, clearPrevious);
      }
    };
  })


  .factory('SessionService', ["$http", "$resource", "$state", "$window", "$q", "$timeout", "EnvironmentConfig", "SessionConfig", "OCFConfig", "URLManager", "navigateTo", "encode", "lodash", "$rootScope", function ($http, $resource, $state, $window, $q, $timeout, EnvironmentConfig,
                                       SessionConfig, OCFConfig, URLManager, navigateTo, encode,
                                       lodash, $rootScope) {

    var Session = $resource(URLManager.getUrl('session'), {}, {
      loginWS: {
        method: 'GET',
        timeout: EnvironmentConfig.requestTimeout
      }
    });

    var SessionID = $resource(URLManager.getUrl('sessionID'), {}, {
      request: {
        method: 'GET',
        timeout: EnvironmentConfig.requestTimeout
      }
    });

    var Applications = $resource(URLManager.getUrl('applications'), {}, {
      getApps: {
        method: 'GET',
        timeout: EnvironmentConfig.requestTimeout
      }
    });

    Session.login = function (loginData) {
      var q = $q.defer();

      Session.setHeaderLogin(loginData)
        .then(function (headerOk) {
          function loginSuccess(userInformation) {
            q.resolve(userInformation);
          }

          function loginFail(loginFail) {
            var failMessage = {
              status: loginFail.status,
              message: loginFail.message,
              type: 'login'
            };

            if (loginFail.status !== 0) {
              // net::ERR_CONNECTION_TIMED_OUT
              failMessage.message = "Authentication failed. Please try again.";
              if (loginFail.data.message == "java.lang.Exception: Credentials Expired. Contact System Support."){
                failMessage.message = "Credentials Expired. Contact System Support.";
              }
            }

            q.reject(failMessage);
          }

          Session.loginWS({appLocations: true}, loginSuccess, loginFail);

        });
      return q.promise;
    };

    Session.getSessionID = function (loginData, loginInfo) {
      var q = $q.defer();

      Session.setHeaderCommon()
        .then(function (headerOk) {

          function sessionSuccess(sessionID) {
            q.resolve(sessionID);
          }

          function sessionFail(sessionFail) {
            var failMessage = {
              status: sessionFail.status,
              message: sessionFail.message,
              type: 'session'
            };

            if (sessionFail.status !== 0) {
              // net::ERR_CONNECTION_TIMED_OUT
              failMessage.message = "Authentication failed. Please try again.";
            }

            q.reject(failMessage);
          }

          SessionID.request({userID: loginInfo.id}, sessionSuccess, sessionFail);

        });
      return q.promise;
    };

    Session.sessionID = function () {
      return JSON.parse($window.localStorage.getItem("sessionID"));
    };

    Session.setSessionID = function (sessionID) {
      $window.localStorage.setItem("sessionID", JSON.stringify(sessionID));
    };

    // Deprecated
    Session.setHeader = function (loginData) {
      function setHeader(loginData) {
        var encoded = encode.encodeCredentials(loginData);
        $http.defaults.headers.common.Authorization = "Basic " + encoded;

        return $http.defaults.headers.common.Authorization;
      }

      return $q.when(setHeader(loginData));
    };

    Session.setHeaderLogin = function (loginData) {
      function setHeaderLogin(loginData) {
        var encoded = encode.encodeCredentials(loginData);
        $http.defaults.headers.common.ZestAppName = "Shipping";
        $http.defaults.headers.common.Authorization = "Basic " + encoded;
        $http.defaults.headers.common.ZestSessionId = undefined;

        return $http.defaults.headers.common.Authorization;
      }

      return $q.when(setHeaderLogin(loginData));
    };

    Session.getZestSessionId = function () {
      var userData = Session.getUserData($rootScope.user.id);
      return userData.sessionId;
    }

    Session.setHeaderCommon = function () {
      function setHeaderCommon() {

        var userData = Session.getUserData($rootScope.user.id);

        $http.defaults.headers.common.Authorization = undefined;
        $http.defaults.headers.common.ZestAppName = "Shipping";
        $http.defaults.headers.common.ZestSessionId = userData.sessionId;

        return $http.defaults.headers.common.ZestSessionId;
      }

      return $q.when(setHeaderCommon());
    };

    Session.isSignedIn = function () {
      return !!$window.localStorage[SessionConfig.cookieName];
    };

    Session.setLoggedUserId = function (userId) {
      $window.localStorage.setItem("loggedUser", JSON.stringify(userId));
    };

    Session.clearLoggedUser = function () {
      $window.localStorage.setItem("loggedUser", "");
    };

    Session.getLoggedUserId = function () {
      return JSON.parse($window.localStorage.getItem("loggedUser"));
    };

    Session.getApplicationsList = function () {
      var q = $q.defer();

      function appsSuccess(userApps) {
        q.resolve(userApps.applications);
      }

      function appsFail(loginFail) {
        //var failMessage = {
        //  status: loginFail.status,
        //  message: loginFail.message,
        //  type: 'login'
        //};
        console.log(loginFail);
        //if (loginFail.status !== 0) {
        //  // net::ERR_CONNECTION_TIMED_OUT
        //  failMessage.message = "Authentication failed. Please try again.";
        //}

        q.reject();
      }

      Applications.getApps(appsSuccess, appsFail);

      return q.promise;
    };

    Session.setUserApplications = function (appsList) {
      var userData = Session.getUserData($rootScope.user.id);
      userData.apps = appsList;
      Session.setUserData(userData);
    };

    Session.getUserApplications = function (userId) {
      return Session.getUserData(userId).apps;
    };

    Session.clearCredentials = function () {
      var q = $q.defer();

      function cleaner() {
        $window.localStorage.removeItem(SessionConfig.cookieName);
        //$window.localStorage.removeItem(SessionConfig.userInformation);
        Session.clearLoggedUser()
        return true;
      }

      q.resolve(cleaner());

      return q.promise;
    };

    //Session.securityCheck = function () {
    //  if (!Session.isSignedIn()) {
    //    Session.clearCredentials()
    //      .then(function (success) {
    //        navigateTo.login();
    //      });
    //
    //  } else {
    //    var sessionData = Session.getSessionData();
    //    var loginData = encode.decodeCredentialsAsObject(sessionData);
    //
    //    if (angular.equals(pouchLocalDB.get(), {}) || typeof pouchLocalDB.get() !== "undefined") {
    //      var adapter = window.sqlitePlugin ? {adapter: 'websql'} : {};
    //      pouchLocalDB.set(new PouchDB('ocf', adapter));
    //    }
    //
    //    Session.setHeader(loginData);
    //  }
    //};

    Session.setCredentials = function (loginData, userInformation) {
      var encoded = encode.encodeCredentials(loginData);
      var sessionInfo = {
        sessionId: encoded,
        createdDate: Date.now(),
        status: ''
      };
      //change the username to be able to push docs to couchdb
      userInformation.username = loginData.username;

      $window.localStorage.setItem(SessionConfig.cookieName, JSON.stringify(sessionInfo));
      //$window.localStorage.setItem(SessionConfig.userInformation, JSON.stringify(userInfo));
    };

    Session.getSessionData = function () {
      return JSON.parse($window.localStorage.getItem(SessionConfig.cookieName));
    };

    Session.getUserLocations = function (userId) {
      var userData = Session.getUserData(userId);
      if (userData) {
        return userData.locations;
      }
    };

    Session.getUserData = function (userId) {
      var usersData = JSON.parse($window.localStorage.getItem("userInformation"));
      return lodash.find(usersData, function (userInfo) {
        return userInfo.id == userId;
      })
    };

    Session.setUserData = function (userData) {
      var usersData = JSON.parse($window.localStorage.getItem("userInformation"));
      var foundUserIndex = lodash.findIndex(usersData, function (userInfo) {
        return userInfo.id == userData.id;
      });

      if (foundUserIndex !== -1) {
        usersData[foundUserIndex] = userData;
      }
      else {
        if (usersData === null) {
          usersData = [];
        }
        usersData.push(userData);
      }

      $window.localStorage.setItem(SessionConfig.userInformation, JSON.stringify(usersData));
    };

    Session.setSession = function (loginData) {
      var encoded = encode.encodeCredentials(loginData);
      var sessionInfo = {
        sessionId: encoded,
        createdDate: new Date().getTime(),
        status: ''
      };
      $window.localStorage.setItem(SessionConfig.cookieName, JSON.stringify(sessionInfo));
    };

    Session.destroy = function () {
      $window.localStorage.removeItem(SessionConfig.cookieName);
    };

    Session.updateSessionStatus = function (status) {
      var sessionData = Session.getSessionData();
      sessionData.status = status;
      $window.localStorage[SessionConfig.cookieName] = JSON.stringify(sessionData);

    };

    Session.setLoggedOffline = function () {
      Session.updateSessionStatus("loggedOffline");
    };

    Session.setSessionExpired = function () {
      Session.updateSessionStatus("sessionExpired");
    };

    Session.setLoggedOnline = function () {
      Session.updateSessionStatus("loggedOnline");
    };

    Session.setLoggingOut = function () {
      Session.updateSessionStatus("loggingOut");
    };

    Session.setLoggedOut = function () {
      Session.updateSessionStatus("loggedOut");
    };

    //Session.offlineLogin = function (loginData) {
    //  var q = $q.defer();
    //  //TODO: implement a secure offline login mechanism
    //  var userData = Session.getUserData();
    //  var appConfig = Session.ocfManager.getApplicationConfig($rootScope.selectedLocation.locationId, $rootScope.appName);
    //
    //  //verify that the user exists in the device and that
    //  if (!!userData) {
    //    if (loginData.username.toUpperCase() == userData.userInfo.username.toUpperCase() && appConfig !== null) {
    //      console.log("Offline login successful");
    //      Session.setSession(loginData);
    //      Session.setLoggedOffline();
    //      q.resolve(true);
    //    } else {
    //      var warnMsg = "The current user is not the one related to the device or his data has changed. Online login is required";
    //      //TODO: implement a popup / message to inform that an online login is required.
    //      q.reject(warnMsg);
    //    }
    //  } else {
    //    q.reject(false);
    //  }
    //
    //  return q.promise;
    //};

    Session.ocfManager = {
      applicationConfig: function (loginData, appList, locationsList) {

        var userData = Session.getUserData($rootScope.user.id);

        var makeRequest = function (loginData, app, locationId) {
          var q = $q.defer();
          //var encodedData = encode.encodeCredentials(loginData);

          var initialConfig = $resource(URLManager.getUrl('initialConfig'), {}, {
            getConfigs: {
              method: 'GET',
              //headers: {'Authorization': "Basic " + encodedData}
              headers: {
                'ZestAppName': 'Shipping',
                'ZestSessionId': userData.sessionId
              }
            }
          });

          function storeAppConfig(configObject) {
            var configArray = JSON.parse($window.localStorage.getItem(OCFConfig.configObject));
            if (configArray == null) {
              configArray = [];
              configArray.push(configObject);
            }
            else {
              //check if there's already a config for the app and the location
              var config = lodash.find(configArray, function (config) {
                return config.appName == configObject.appName && config.locationId == locationId;
              });
              //if it exists, update it
              if (config) {
                var index = lodash.indexOf(configArray, config);
                configArray[index] = angular.copy(configObject);
              }
              else {
                configArray.push(configObject);
              }
            }
            $window.localStorage.setItem(OCFConfig.configObject, JSON.stringify(configArray));
            return configObject;
          }

          function appConfigSuccess(success) {
            var appConfig = {
              appName: app.appCacheName,
              config: success,
              locationId: locationId
            };
            return q.resolve(storeAppConfig(appConfig));
          }

          function appConfigFail(fail) {
            var failMessage = {
              status: fail.status,
              message: "Configurations: ",
              type: 'appConfig'
            };

            if (fail.status === 0) {
              // net::ERR_CONNECTION_TIMED_OUT
              failMessage.message += "Connection failed.";
            } else {
              failMessage.message += fail.data.reason;
            }

            return q.reject(failMessage);
          }

          initialConfig.getConfigs({appId: app.appCacheName, locationId: locationId}, appConfigSuccess, appConfigFail);

          return q.promise;
        };

        var promises = [];

        if (!locationsList) {
          var failMessage = {
            status: 99,
            message: "User not assigned to any location.",
            type: 'location'
          };

          return $q.reject(failMessage);

        }

        for (var j = 0; j < locationsList.length; j++) {
          var location = locationsList[j];
          for (var i = 0; i < appList.length; i++) {
            promises.push(makeRequest(loginData, appList[i], location.locationId))
          }
        }
        return $q.allSettled(promises);

      },

      getApplicationConfig: function (locationId, appName) {
        return lodash.find(JSON.parse($window.localStorage.getItem(OCFConfig.configObject)), function (config) {
          return config.appName == appName.toLowerCase() && config.locationId == locationId;
        });
      }
    };

    Session.remoteStorage = {
      userExist: function (loginData) {
        loginData.username = loginData.username.toUpperCase();
        var q = $q.defer();
        var encodedData = encode.encodeCredentials(loginData);
        var cdb = $resource(URLManager.getUrl('couchDbSession'), {}, {
          checkSession: {
            method: 'GET',
            headers: {'Authorization': "Basic " + encodedData}
          }
        });

        function sessionSuccess(success) {
          return q.resolve(success);
        }

        function sessionFail(fail) {
          var failMessage = {
            status: fail.status,
            message: "Remote Storage: ",
            type: 'remoteStorage'
          };

          if (fail.status === 0) {
            // net::ERR_CONNECTION_TIMED_OUT
            failMessage.message += "Connection failed.";
          } else {
            failMessage.message += fail.data.reason;
          }

          return q.reject(failMessage);
        }


        cdb.checkSession(sessionSuccess, sessionFail);


        return q.promise;
      },

      userCanAccessDatabase: function (loginData, appList, orgId) {


        var makeRequest = function (loginData, app, orgId) {
          var organizationId = orgId;
          var database;
          database = app.appCacheName + '_' + organizationId;

          var q = $q.defer();
          var encodedData = encode.encodeCredentials(loginData);
          var cDbHost = CouchDbConfig.host + database;

          var cdb = $resource(cDbHost, {}, {
            checkSession: {
              method: 'GET',
              headers: {'Authorization': "Basic " + encodedData}
            }
          });

          function sessionSuccess(success) {
            return q.resolve();
          }

          function sessionFail(fail) {
            return q.resolve();
          }

          cdb.checkSession(sessionSuccess, sessionFail);

          return q.promise;

        };


        var promises = [];

        for (var i = 0; i < appList.length; i++) {
          promises.push(makeRequest(loginData, appList[i], orgId))
        }

        return $q.allSettled(promises);

      }
    };

    return Session;
  }])

  .factory('pouchLocalDB', ["$q", function ($q) {
    var db = {
      localDB: null
    };
    var deferred = $q.defer();

    db.set = function (localDB) {
      if (this.localDB === null) {
        this.localDB = localDB;
        deferred.resolve("success");

      } else {
        deferred.reject("fail");
      }

      return deferred.promise;
    };

    db.get = function () {
      return this.localDB;
    };

    return db;
  }])

  .factory('InitializationService', ["$q", function ($q) {

    //pouchLocalDB.set(pouchDB(PouchConfig.pouchdbName));
    //
    //var db = pouchLocalDB.get();

    var initialization = {};

    //initialization.getAllDocsFromPouch = function () {
    //  return db.allDocs({
    //    include_docs: true
    //  });
    //};

    return initialization;


  }])


  .factory('ReplicationService', ["$q", "$rootScope", "$timeout", "CouchDbConfig", "SessionService", "PersistenceConfig", "pouchLocalDB", function ($q, $rootScope, $timeout, CouchDbConfig, SessionService, PersistenceConfig,
                                           pouchLocalDB) {
    var ReplicationService = this;

    ReplicationService.updateStatus = function (message) {
      $timeout(function () {
        $rootScope.$apply(function () {
          $rootScope.isSynchronized = message;
        });
      });
    };

    ReplicationService.retryReplication = function (sessionData) {
      var localDB = pouchLocalDB.get();
      var sessionInformation = $rootScope.user;
      var organizationId = sessionInformation.organizationId;

      if (localDB._db_name) {
        var cHost = CouchDbConfig.host.split("//");
        var cdb = cHost[0] + "//" + sessionInformation.username + ":" + sessionData.password + "@" + cHost[1];
        return localDB.replicate.to(cdb + "lotqc_" + organizationId);
      }
    };

    ReplicationService.liveReplicate = function (sessionData) {
      var localDB = pouchLocalDB.get();
      var sessionInformation = $rootScope.user;
      var organizationId = sessionInformation.organizationId;

      if (localDB._db_name) {
        var cHost = CouchDbConfig.host.split("//");
        var cdb = cHost[0] + "//" + sessionInformation.username + ":" + sessionData.password + "@" + cHost[1];
        return localDB.replicate.to(cdb + "lotqc_" + organizationId, {
          live: true
        });
      }
    };

    //TODO:refactor this method to use the current DB
    ReplicationService.sync = function (sessionData) {
      var localDB = pouchLocalDB.get();
      var sessionInformation = $rootScope.user;
      var organizationId = sessionInformation.organizationId;

      if (localDB._db_name) {
        var cHost = CouchDbConfig.host.split("//");
        var cdb = cHost[0] + "//" + sessionInformation.username + ":" + sessionData.password + "@" + cHost[1];
        return localDB.sync(cdb + "lotqc_" + organizationId, {
          live: true
        });
      }
    };

    ReplicationService.garbageCollector = function () {
      // TODO: Implement a method to clear the MC of the tombstones that PouchDB creates.
      console.log("Garbage collector called");
      var localDB = pouchLocalDB.get();
      var deferred = $q.defer();

      if (localDB._db_name) {
        // Try to replicate the documents first
        this.retryReplication();

        // Then get all the documents from PouchDB and validate the updated/created date
        localDB.allDocs({
          include_docs: true,
          descending: true
        }, function (error, response) {
          if (!error) {
            var todayTime = Date.now();

            response.rows.forEach(function (element) {
              // By default use the date when document was created
              var lastDocDate = element.doc.createDate;
              // TODO: in case that the Business Logic uses the last updated date to decide if the document is old enough
              //if(element.doc.modificationDate){
              //    lastDocDate = element.doc.modificationDate;
              //}
              if (lastDocDate) {
                var daysDiff = ( todayTime - lastDocDate) / (24 * 3600 * 1000);
                // remove the document if the days diff exceeds the configuration setting
                if (daysDiff >= PersistenceConfig.daysToLive) {

                  localDB.remove(element.doc);

                  console.log("Element removed");
                }
              }
            });
            deferred.resolve("success");
          }

          if (error) {
            deferred.reject(error);
          }
        });
      }

      return deferred.promise;
    };

    return ReplicationService;
  }])

  .factory('StagingConfigurationService', ["$q", "EnvironmentConfig", "URLManager", "$resource", "$log", function ($q, EnvironmentConfig, URLManager, $resource, $log) {

    var StagingConfigurationService = this;

    StagingConfigurationService.getStagingConfiguration = function () {
      var q = $q.defer();
      var request = $resource(URLManager.getUrl('stagingConfiguration'), {}, {
        getStagingConfiguration: {
          method: 'GET',
          timeout: EnvironmentConfig.requestTimeout
        }
      });

      function success(configuration) {
        $log.debug("Configuration retrieved");
        q.resolve(configuration);
      }

      function error(error) {
        $log.error("Configuration retrieval failed " + error);
        q.reject(error);
      }

      request.getStagingConfiguration({}, success, error);

      return q.promise;
    };

    return StagingConfigurationService;
  }]).factory('UserPreferenceService', ["$q", "EnvironmentConfig", "URLManager", "$resource", "$log", function ($q, EnvironmentConfig, URLManager, $resource, $log) {

    var UserPreferenceService = this;

    UserPreferenceService.getUserPreference = function (userId) {
      var q = $q.defer();
      var request = $resource(URLManager.getUrl('language'), {}, {
        getUserPreference: {
          method: 'GET',
          timeout: EnvironmentConfig.requestTimeout
        }
      });

      function success(configuration) {
        $log.debug("User Configuration retrieved");
        q.resolve(configuration);
      }

      function error(error) {
        $log.error("User Configuration retrieval failed " + error);
        q.reject(error);
      }

      request.getUserPreference({'userId':userId}, success, error);

      return q.promise;
    };

    UserPreferenceService.setUserPreference = function (userId, preferences) {
      var q = $q.defer();
      var request = $resource(URLManager.getUrl('language'), {'userId':userId}, {
        setUserPreference: {
          method: 'PUT',
          timeout: EnvironmentConfig.requestTimeout
        }
      });

      function success(configuration) {
        $log.debug("User Configuration setted");
        q.resolve(configuration);
      }

      function error(error) {
        $log.error("User Configuration setted failed " + error);
        q.reject(error);
      }

      request.setUserPreference(preferences, success, error);

      return q.promise;
    };

    return UserPreferenceService;
  }])
  .factory('LoggingService', ["URLManager", "EnvironmentConfig", "$q", "$log", "$resource", "$rootScope", "$interval", function (URLManager, EnvironmentConfig, $q, $log, $resource, $rootScope, $interval) {

    var logMessageGrayLog = function (app, context, action, message, result, metadata) {

      var data = {
        version: "1.1",
        host: EnvironmentConfig.env,
        short_message: message,
        //timestamp: (new Date()).toISOString(),
        full_message: JSON.stringify(metadata),
        action: action,
        result: result,
        _environment: app,
        _facility: "G10",
        _context: context
      };

      jQuery.ajax({
        url: URLManager.getUrl('grayLogMessage'),
        type: 'POST',
        data: JSON.stringify(data),

        success: function (response) {
          $log.debug("Log successfully sent");
        },

        error: function (response) {
          $log.debug("Couldn't send log " + JSON.stringify(data));
        }
      });
    };

    // metadata should be a list as [{"key":"attribute","value":"message"},...]
    var logMessage = function (data) {
      var q = $q.defer();
      var request = $resource(URLManager.getUrl('apiLogMessage'), {}, {
        logMessage: {
          method: 'POST',
          timeout: EnvironmentConfig.requestTimeout
        }
      });

      function success(response) {
        $rootScope.logsBlocked = false;
        $log.debug("Log saved");
        q.resolve(response);
      }

      function error(error) {
        $rootScope.logsBlocked = false;
        $log.debug("Error saving log " + error);
        q.reject(error);
      }

      request.logMessage(data, success, error);

      return q.promise;
    };

    var saveLogToSend = function (app, context, action, message, result, metadata) {

      if (!(Object.prototype.toString.call(metadata) === '[object Array]')) {
        metadata = [];
      }

      if (window.cordova) {
        var device = {
          id: window.device.serial,
          android: window.navigator.appVersion
        };
        var deviceMetadata = {
          key: "device",
          value: JSON.stringify(device)
        };

        metadata.push(deviceMetadata);
      }

      var appVersion = $rootScope.appVersion;

      var appVersionMetadata = {
        key: "application_version",
        value: appVersion
      };

      metadata.push(appVersionMetadata);

      metadata.push({
        "key": "message",
        "value": message
      });

      metadata.push({
        "key": "context",
        "value": context
      });
      var data = {
        "host": EnvironmentConfig.env,
        "action": action,
        "result": result,
        "_environment": app,
        "_facility": "OCF",
        "full_message": metadata
      };

      $rootScope.logsToSend.push(data);
    };

    var CONSTANTS = {
      "APP": {
        "OCF_DATA_RECOVER": "OCF_Data_Recover",
        "OCF_LOGIN": "OCF_Login",
        "OCF_APP_SELECTOR":"OCF_App_Selector",
        "OCF_LOCATION_SELECTOR":"OCF_Location_Selector",
        "G10":"G10",
        "G04":"G4"
      },
      CONTEXT: {
        "ON_PAUSE":"On_Pause",
        "ON_RESUME":"On_Resume",
        "ON_DEVICE_READY":"On_Device_Ready",
        "ON_DATA_RECOVERING":"On_Data_Recovering",
        "LOGIN_CONTROLLER":"Login_Controller",
        "LOCATION_CONTROLLER":"Location_Controller",
        "TODAY_ORDER_CONTROLLER" : "Today_Order_Controller",
        "FILL_ORDER_CONTROLLER" : "Fill_Order_Controller",
        "ASSIGN_PALLET_POPUP" : "Assign_Pallet_Popup",
        "REMOVE_PALLET_POPUP" : "Remove_Pallet_Popup",
        "REOPEN_ORDER_POPUP" : "Reopen_Order_Popup",
        "SELECT_ORDER_POPUP" : "Select_Order_Popup",
        "EVENT_HANDLER_SERVICE": "Event_Handler_Service",
        "PUT_AWAY_CONTROLLER": "Put_Away_Controller"
      }
    };

    if(!$rootScope.logsToSend) {
      $rootScope.logsToSend = [];
    }

    $rootScope.logsBlocked = false;

    if(sendLog) {
      $interval.cancel(sendLog);
    }

    var sendLog = $interval(function () {

      if(!$rootScope.logsBlocked && $rootScope.logsToSend.length > 0) {
        $rootScope.logsBlocked = true;

        // Send the first element of the array and remove it
        logMessage($rootScope.logsToSend.shift());
      }

    }, 500);

    return {
      logMessageGrayLog: function (app, context, action, message, result, metadata) {
        logMessageGrayLog(app, context, action, message, result, metadata);
        $log.info(app + " - " + context + " - " + action + " - " + message + " - " + result + " - " + JSON.stringify(metadata));
      },
      logMessage: function (app, context, action, message, result, metadata, toZest) {

        toZest = toZest != undefined ? toZest : true;

        if(toZest) {
          saveLogToSend(app, context, action, message, result, metadata);
        }

        console.log(app + " - " + context + " - " + action + " - " + message + " - " + result + " - " + JSON.stringify(metadata));
      },
      CONSTANTS: CONSTANTS
    };
  }])
  .factory('LockService', ["$log", function($log) {
    var _fields = {};
    var _methods = {};

    _fields.lockList = [];

    _methods.lock = function(lock) {
      if (!_methods.isLocked(lock)) {
        $log.info('LockService | Locking with key [' + lock + ']');
        _fields.lockList.push({ id: lock });
      }
      $log.info('LockService | Lock list [' + JSON.stringify(_fields.lockList) + ']');
    };

    _methods.release = function(lock) {
      $log.info('LockService | Releasing lock with key [' + lock + ']');
      for (var i = 0; i < _fields.lockList.length; i++) {
        if (typeof _fields.lockList[i] == 'object' && typeof _fields.lockList[i].id != 'undefined' && _fields.lockList[i].id == lock) {
          _fields.lockList.splice(i, 1);
        }
      }
      $log.info('LockService | Lock list [' + JSON.stringify(_fields.lockList) + ']');
    };

    _methods.isLocked = function(lock) {
      var lockItem = _.find(_fields.lockList, function(lockLookup) { return lockLookup.id == lock });
      var isLocked = typeof lockItem == 'object' && typeof lockItem.id != 'undefined' && lockItem.id == lock;
      $log.info('LockService | Verifying if key [' + lock + '] is locked | ' + lock + ' [' + isLocked.toString() + ']');
      return isLocked;
    };

    _methods.areLocked = function(lockList) {
      if (!_.isArray(lockList)) {
        return false;
      }
      for (var i = 0; i < lockList.length; i++) {
        if (!_methods.isLocked(lockList[i])) {
          return false;
        }
      }
      return true;
    };

    return {
      lock: _methods.lock,
      release: _methods.release,
      isLocked: _methods.isLocked,
      areLocked: _methods.areLocked
    };
  }])

  .factory('EventHandlerService', ["$timeout", "$log", "LoggingService", function ($timeout, $log, LoggingService) {
    /**
     * event = {
     *      trigger: function() {}, // it should return a promise to be used for the EH
     *      execState: ""
     * }
     */

    var _loggingStates = {
      app: '',
      context: ''
    };
    var _currentState;
    var _queue = [];

    _trigger();

    return {
      setCurrentState: function(currentState) {
        _setCurrentState(currentState);
      },
      enqueue: function(event) {
        _enqueue(event);
      },
      setLoggingState: function (app, context) {
        _setLoggingState(app, context);
      }
    };

    function _enqueue(event) {
      $log.debug('_enqueue', JSON.stringify(event), JSON.stringify(_queue), JSON.stringify(_loggingStates));
      if (event.agnostic) event.execState = _currentState;
      _queue.push(event);
    }

    function _clearQueue() {
      $log.debug('_clearQueue');
      _queue = [];
    }

    function _setCurrentState(currentState) {
      $log.debug('_setCurrentState', 'target:', currentState, 'current:', _currentState, JSON.stringify(_loggingStates));

      if (currentState) {
        _clearQueue();
        _currentState = currentState;
      }
    }

    function _trigger(value) {
      var event = _queue.shift();

      if (event && (angular.isArray(event.execState) && event.execState.indexOf(_currentState) != -1 || event.execState == _currentState)) {
        $log.debug('before event.trigger()', JSON.stringify(event), JSON.stringify(_loggingStates));

        event.trigger()
          .then(_setCurrentState)
          .catch(_setCurrentState)
          .finally(_trigger);

      } else {
        $timeout(_trigger, 64);
      }
    }

    function _setLoggingState(app, context) {
      if (app && context) {
        _loggingStates.app = LoggingService.CONSTANTS.APP[app];
        _loggingStates.context = LoggingService.CONSTANTS.CONTEXT[context];

      } else {
        _loggingStates.app = '';
        _loggingStates.context = '';
      }
    }
  }])

  .factory('TimeoutLockService', ["$log", "" +
    "", "$translate", function($log, toaster, $translate) {
      var _fields = {};
      var _methods = {};
      var message = "Application busy";
      $translate('OCF.APPLICATION_BUSY.MESSAGE').then(function (result) {
        message = result;
      });

      _fields.serviceName = 'TimeoutLockService';
      _fields.lastLock = 0;

      _methods.now = function() {
        return new Date().getTime();
      };

      _methods.getLockTimeout = function() {
        /**
         * Lock timeout in milliseconds
         * @type {number}
         */
        var lockTimeout = 500;
        //TODO: Get lock timeout from configuration

        $log.info(_fields.serviceName + ' | Lock timeout read from configuration [' + lockTimeout + ']');

        return lockTimeout;
      };

      _methods.lock = function() {
        $log.info(_fields.serviceName + ' | Activating locking for ' + _methods.getLockTimeout() + ' milliseconds');
        _fields.lastLock = _methods.now();
      };

      _methods.displayAppBusyToaster = function() {
        $log.debug(_fields.serviceName + ' | Displaying toaster message');
        $translate('OCF.APPLICATION_BUSY.MESSAGE').then(function (result) {
          message = result;
          toaster.pop({
            type: 'error',
            body: message,
            timeout: 5000,
            showCloseButton: true
          });
        });
      };

      _methods.isLocked = function() {
        if ((_fields.lastLock + _methods.getLockTimeout()) >= _methods.now()) {
          // Lock active
          $log.info(_fields.serviceName + ' | Lock is active');
          _methods.displayAppBusyToaster();
          return true;
        } else {
          // Lock not active
          $log.info(_fields.serviceName + ' | Lock is not active');
          _methods.lock();
          return false;
        }
      };

      return {
        isLocked: _methods.isLocked
      };
    }])

  .factory('OCFConfigurationService', ["$resource", "$q", "$rootScope", "$window", "$log", "URLManager", "EnvironmentConfig", function ($resource, $q, $rootScope, $window, $log, URLManager, EnvironmentConfig) {
    var OCFConfigs = $resource(URLManager.getUrl('ocfConfigurations'), {}, {
      getConfigs: {
        method: 'GET',
        timeout: EnvironmentConfig.requestTimeout
      }
    });

    var configs = this;

    configs.retrieveConfigs = _retrieveConfigs;
    configs.getOcfConfigs = _getOcfConfigs;

    return configs;

    /////////////////////////////
    function _retrieveConfigs() {
      return $q(function (resolve, reject) {
        OCFConfigs.getConfigs({}, _success, _fail);

        function _success(ocfConfigs) {
          $window.localStorage.setItem("ocfConfigs", JSON.stringify(ocfConfigs));
          resolve(ocfConfigs);
        }

        function _fail(error) {
          $log.error("OCF Configuration Retrieve failed", error);
          resolve({});
        }
      });
    }

    function _getOcfConfigs() {
      var ocfConfigs = $window.localStorage.getItem("ocfConfigs");

      return ocfConfigs ? JSON.parse(ocfConfigs) : {};
    }
  }])

  .factory('StorageService', ["$resource", "URLManager", "EnvironmentConfig", function ($resource, URLManager,EnvironmentConfig){
    var storageService = {
      validStorageArea: validStorageArea
    };
    function validStorageArea(barCode){
      var request = $resource(URLManager.getUrl('storageAreaValid'), {}, {
        validateStorageArea: {
          method: 'GET',
          timeout: EnvironmentConfig.requestTimeout
        }
      });
      var valid = request.validateStorageArea({'barCode':barCode});

      return valid.$promise;
    };
    return storageService;
  }])

  //
  //.service('ScanService', function ($rootScope, $timeout) {
  //
  //  var ss = {};
  //
  //
  //  //initializes the scan and sets the activity to send the intent to
  //  ss.initialize = function (activityName) {
  //
  //    console.log(window.datawedge);
  //
  //    if (window.datawedge) {
  //      var activity = activityName ? activityName : "com.bluefletch.motorola.datawedge.ACTION"; //default activity name
  //
  //      console.log(activityName);
  //
  //      datawedge.start();
  //
  //      $timeout(function () {
  //        datawedge.registerForBarcode(function (data) {
  //          console.log("dataWedgeScan - broadcast");
  //
  //          $rootScope.$broadcast('dataWedgeScan', data.barcode);
  //        });
  //
  //      }, 300)
  //
  //    }
  //  };
  //
  //  return ss;
  //})


;


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

/* global describe global it global beforeEach global angular global inject global expect */

'use strict';

describe('toasterService', function () {
	var toaster, toasterConfig, rootScope, $compile;

	beforeEach(function () {
		// load dependencies
		module('testApp');
		module('toaster')
		
		// inject the toaster service
        inject(function (_toaster_, _toasterConfig_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			toasterConfig = _toasterConfig_;	
			rootScope = _$rootScope_;
			$compile = _$compile_;
		});
	});
	
	
	it('should create an error method from error icon class', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].error).toBe('toast-error');
		
		toaster.error('test', 'test');
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-error');
	});
	
	it('should create an error method from info icon class', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].info).toBe('toast-info');
		
		toaster.info('test', 'test');
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-info');
	});
	
	it('should create an error method from wait icon class', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].wait).toBe('toast-wait');
		
		toaster.wait('test', 'test');
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-wait');
	});
	
	it('should create an error method from success icon class', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].success).toBe('toast-success');
		
		toaster.success('test', 'test');
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-success');
	});
	
	it('should create an error method from warning icon class', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].warning).toBe('toast-warning');
		
		toaster.warning('test', 'test');
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-warning');
	});
	
	it('should create a  method from the icon class that takes an object', function () {
		var container = angular.element('<toaster-container></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();
		
		expect(scope.toasters.length).toBe(0)
		
		expect(toasterConfig['icon-classes'].error).toBe('toast-error');
		
		toaster.error({ title: 'test', body: 'test'});
		
		rootScope.$digest();
		
		expect(scope.toasters.length).toBe(1)
		expect(scope.toasters[0].type).toBe('toast-error');
	});
});
/* global describe global it global beforeEach global angular global inject global expect */

'use strict';

describe('toasterEventRegistry', function () {
	var toaster, toasterConfig, toasterEventRegistry, rootScope, $compile;

	beforeEach(function () {
		// load dependencies
		module('testApp');
		module('toaster')
		
		// inject the toaster service
        inject(function (_toaster_, _toasterConfig_, _toasterEventRegistry_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			toasterConfig = _toasterConfig_;	
			toasterEventRegistry = _toasterEventRegistry_;
			rootScope = _$rootScope_;
			$compile = _$compile_;
		});
	});
	
	it('unsubscribeToNewToastEvent will throw error if newToastEventSubscribers is empty and deregisterNewToast is not defined', function () {
		var hasError = false;
		
		try {
			toasterEventRegistry.unsubscribeToNewToastEvent(function () {});	
		} catch(e) {
			expect(e.message.indexOf(' is not a function')).toBeGreaterThan(-1);
			hasError = true;
		}
		
		expect(hasError).toBe(true);
	});
	
	it('unsubscribeToNewToastEvent will not splice if index not found and will not throw error', function () {
		var hasError = false;
		var fakeHandler = function (fakeHandlerId) {};
		toasterEventRegistry.subscribeToNewToastEvent(fakeHandler);
		
		try {
			toasterEventRegistry.unsubscribeToNewToastEvent(function () {});	
		} catch(e) {
			hasError = true;
		}
		
		expect(hasError).toBe(false);
	});
	
	it('unsubscribeToClearToastsEvent will throw error if clearToastsEventSubscribers is empty and deregisterClearToasts is not defined', function () {
		var hasError = false;
		
		try {
			toasterEventRegistry.unsubscribeToClearToastsEvent(function () {});	
		} catch(e) {
			expect(e.message.indexOf(' is not a function')).toBeGreaterThan(-1);
			hasError = true;
		}
		
		expect(hasError).toBe(true);
	});
	
	it('unsubscribeToClearToastsEvent will not splice if index not found and will not throw error', function () {
		var hasError = false;
		var fakeHandler = function (fakeHandlerId) {};
		toasterEventRegistry.subscribeToClearToastsEvent(fakeHandler);
		
		try {
			toasterEventRegistry.unsubscribeToClearToastsEvent(function () {});	
		} catch(e) {
			hasError = true;
		}
		
		expect(hasError).toBe(false);
	});
});
/* global describe global it global beforeEach global angular global jasmine global inject global expect global spyOn */

'use strict';

var rootScope, toaster, $compile;

describe('toasterContainer', function () {
	beforeEach(function () {
		module('toaster');
		
		// inject the toaster service
        inject(function (_toaster_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			rootScope = _$rootScope_;
			$compile = _$compile_;
		});
	});

	it('should pop a toast via individual parameters', function () {
		var container = compileContainer();
		var scope = container.scope();
		
		toaster.pop('info', 'test', 'test');
		
		expect(scope.toasters.length).toBe(1);
	});

	it('should unsubscribe events on $destroy if handlers exist', function () {
		var toasterEventRegistry;

		inject(function (_toasterEventRegistry_) {
			toasterEventRegistry = _toasterEventRegistry_;
		});

		var container = compileContainer();
		var scope = container.scope();

		spyOn(toasterEventRegistry, 'unsubscribeToNewToastEvent').and.callThrough();
		spyOn(toasterEventRegistry, 'unsubscribeToClearToastsEvent').and.callThrough();

		scope.$destroy();

		expect(toasterEventRegistry.unsubscribeToNewToastEvent).toHaveBeenCalled();
		expect(toasterEventRegistry.unsubscribeToClearToastsEvent).toHaveBeenCalled();
	});
	
	
	describe('addToast', function () {
		it('should default to icon-class config value if toast.type not found in icon-classes', function () {
			var toasterConfig;
			
			inject(function (_toasterConfig_) {
				toasterConfig = _toasterConfig_;
			});
	
			compileContainer();
			
			expect(toasterConfig['icon-class']).toBe('toast-info'); 
			
			toaster.pop({ type: 'invalid' });
			
			rootScope.$digest();
			
			expect(toaster.toast.type).toBe('toast-info');
		});
	
		it('should allow subsequent duplicates if prevent-duplicates is not set', function () {
			var container = compileContainer();
			var scope = container.scope();
					
			expect(scope.toasters.length).toBe(0);
					
			toaster.pop({ type: 'info', title: 'title', body: 'body' });
			toaster.pop({ type: 'info', title: 'title', body: 'body' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
		});
	
		it('should not allow subsequent duplicates if prevent-duplicates is true without toastId param', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'prevent-duplicates\': true}"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
					
			var scope = container.scope();
					
			expect(scope.toasters.length).toBe(0);
					
			toaster.pop({ type: 'info', title: 'title', body: 'body' });
			toaster.pop({ type: 'info', title: 'title', body: 'body' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(1);
		});
		
		it('should allow subsequent duplicates if prevent-duplicates is true with unique toastId params', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'prevent-duplicates\': true}"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
					
			var scope = container.scope();
					
			expect(scope.toasters.length).toBe(0);
					
			toaster.pop({ type: 'info', title: 'title', body: 'body', toastId: 1 });
			toaster.pop({ type: 'info', title: 'title', body: 'body', toastId: 2 });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
		});
	
		it('should not allow subsequent duplicates if prevent-duplicates is true with identical toastId params', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'prevent-duplicates\': true}"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
					
			var scope = container.scope();
					
			expect(scope.toasters.length).toBe(0);
					
			toaster.pop({ type: 'info', title: 'title', body: 'body', toastId: 1 });
			toaster.pop({ type: 'info', title: 'title', body: 'body', toastId: 1 });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(1);
		});
	
		it('should not render the close button if showCloseButton is false', function () {
			var container = compileContainer();
	
			toaster.pop({ type: 'info', body: 'With a close button' });
	
			rootScope.$digest();
	
			expect(container.find('button')[0]).toBeUndefined();
		});
	
		it('should use the default close html if toast.closeHtml is undefined', function () {
			var container = compileContainer();
	
			toaster.pop({ type: 'info', body: 'With a close button', showCloseButton: true });
	
			rootScope.$digest();
	
			var buttons = container.find('button');
			
			expect(buttons.length).toBe(1);
			expect(buttons[0].outerHTML).toBe('<button class="toast-close-button" type="button">×</button>');
		});
		
		it('should use the toast.closeHtml argument if passed', function () {
			var container = compileContainer();
	
			toaster.pop({ type: 'info', body: 'With a close button', showCloseButton: true,
				closeHtml: '<button>Close</button>'
			});
	
			rootScope.$digest();
	
			var buttons = container.find('button');
			
			expect(buttons.length).toBe(1);
			expect(buttons[0].outerHTML).toBe('<button>Close</button>');
		});
		
		it('should render toast.closeHtml argument if not a button element', function () {
			var container = compileContainer();
	
			toaster.pop({ type: 'info', body: 'With close text', showCloseButton: true,
				closeHtml: '<span>Close</span>'
			});
	
			rootScope.$digest();
	
			var spans = container.find('span');
			
			expect(spans.length).toBe(1);
			expect(spans[0].outerHTML).toBe('<span>Close</span>');
		});
		
		it('should show the close button if mergedConfig close-button is an object set to true for toast-info', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'close-button\': {\'toast-info\': true}}"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
	
			toaster.pop({ type: 'info' });
	
			rootScope.$digest();
	
			var buttons = container.find('button');
			
			expect(buttons.length).toBe(1);
			expect(buttons[0].outerHTML).toBe('<button class="toast-close-button" type="button">×</button>');
		});
		
		it('should not render the close button if mergedConfig close-button type cannot be found', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'close-button\': {\'toast-invalid\': true}}"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
	
			toaster.pop({ type: 'info' });
	
			rootScope.$digest();
	
			var buttons = container.find('button');
			
			expect(buttons.length).toBe(0);
			expect(buttons[0]).toBeUndefined();
		});
		
		it('should not render the close button if mergedConfig close-button is not an object', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'close-button\': 1 }"></toaster-container>');
	
			$compile(container)(rootScope);
			rootScope.$digest();
	
			toaster.pop({ type: 'info' });
	
			rootScope.$digest();
	
			var buttons = container.find('button');
			
			expect(buttons.length).toBe(0);
			expect(buttons[0]).toBeUndefined();
		});
		
		it('should render trustedHtml bodyOutputType', function () {
			var container = compileContainer();
			
			toaster.pop({ bodyOutputType: 'trustedHtml', body: '<section>Body</section>' });
			
			rootScope.$digest();
	
			var body = container.find('section');
			
			expect(body.length).toBe(1);
			expect(body[0].outerHTML).toBe('<section>Body</section>');
		});
		
		it('should render template bodyOutputType when body is passed', function () {
			inject(function($templateCache) {
				$templateCache.put('/templatepath/template.html', '<section>Template</section>');
			});
			
			var container = compileContainer();
			
			toaster.pop({ bodyOutputType: 'template', body: '/templatepath/template.html' });
			
			rootScope.$digest();
	
			expect(toaster.toast.body).toBe('/templatepath/template.html');
	
			var body = container.find('section');
			
			expect(body.length).toBe(1);
			expect(body[0].outerHTML).toBe('<section class="ng-scope">Template</section>');
		});
		
		it('should render default template bodyOutputType when body is not passed', function () {
			inject(function($templateCache) {
				$templateCache.put('toasterBodyTmpl.html', '<section>Template</section>');
			});
			
			var container = compileContainer();
			
			toaster.pop({ bodyOutputType: 'template' });
			
			rootScope.$digest();
	
			expect(toaster.toast.bodyTemplate).toBe('toasterBodyTmpl.html');
	
			var body = container.find('section');
			
			expect(body.length).toBe(1);
			expect(body[0].outerHTML).toBe('<section class="ng-scope">Template</section>');
		});
		
		it('should render templateWithData bodyOutputType when body is passed', function () {
			inject(function($templateCache) {
				$templateCache.put('template.html', '<section>Template {{toaster.data}}</section>');
			});
			
			var container = compileContainer();
			
			toaster.pop({ bodyOutputType: 'templateWithData', body: "{template: 'template.html', data: 123 }" });
			
			rootScope.$digest();
	
			var body = container.find('section');
			
			expect(body.length).toBe(1);
			expect(body[0].outerHTML).toBe('<section class="ng-binding ng-scope">Template 123</section>');
		});
		
		it('should throw exception for default templateWithData bodyOutputType when body is not passed', function () {
			// TODO:  If the default fallback template cannot be parsed to an object
			// composed of template and data, an exception is thrown.  This seems to 
			// be undesirable behavior.  A clearer exception should be thrown, or better
			// handling should be handled, or the fallback option should be removed.
			inject(function($templateCache) {
				$templateCache.put('template.html', '<section>Template {{toaster.data}}</section>');
			});
			
			compileContainer();
			var hasException = false;
			
			try {
				toaster.pop({ bodyOutputType: 'templateWithData' });
			} catch (e) {
				expect(e.message).toBe("Cannot read property 'template' of undefined");
				hasException = true;	
			}
			
			expect(hasException).toBe(true); 
		});
		
		it('should remove first in toast if limit is met and newest-on-top is true', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'limit\': 2, \'newest-on-top\': true }"></toaster-container>');
				
			$compile(container)(rootScope);
			rootScope.$digest();
			
			var scope = container.scope();
			
			toaster.pop({ type: 'info', body: 'first' });
			toaster.pop({ type: 'info', body: 'second' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
			expect(scope.toasters[0].body).toBe('second');
			expect(scope.toasters[1].body).toBe('first');
			
			toaster.pop({ type: 'info', body: 'third' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
			expect(scope.toasters[0].body).toBe('third');
			expect(scope.toasters[1].body).toBe('second');
		});
		
		it('should remove last in toast if limit is met and newest-on-top is false', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{\'limit\': 2, \'newest-on-top\': false }"></toaster-container>');
				
			$compile(container)(rootScope);
			rootScope.$digest();
			
			var scope = container.scope();
			
			toaster.pop({ type: 'info', body: 'first' });
			toaster.pop({ type: 'info', body: 'second' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
			expect(scope.toasters[0].body).toBe('first');
			expect(scope.toasters[1].body).toBe('second');
			
			toaster.pop({ type: 'info', body: 'third' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
			expect(scope.toasters[0].body).toBe('second');
			expect(scope.toasters[1].body).toBe('third');
		});
        
        it('should invoke onShowCallback if it exists when toast is added', function () {
			compileContainer();
			var mock = {
				callback : function () { }
			};
			
			spyOn(mock, 'callback');
			
			toaster.pop({ type: 'info', body: 'toast 1', onShowCallback: mock.callback });
			
			rootScope.$digest();
			
			expect(mock.callback).toHaveBeenCalled();
		});
        
        it('should not invoke onShowCallback if it does not exist when toast is added', function () {
			compileContainer();
			var mock = {
				callback : function () { }
			};
			
			spyOn(mock, 'callback');
			
			toaster.pop({ type: 'info', body: 'toast 1' });
			
			rootScope.$digest();
			
			expect(mock.callback).not.toHaveBeenCalled();
		});
	});
	
	
	describe('removeToast', function () {
		it('should not remove toast if id does not match a toast id', function() {
			var container = compileContainer();
			var scope = container.scope();
			
			toaster.pop({ type: 'info', body: 'toast 1' });
			toaster.pop({ type: 'info', body: 'toast 2' });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
			expect(scope.toasters[0].id).toBe(2)
			expect(scope.toasters[1].id).toBe(1)
			
			scope.removeToast(3);
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(2);
		});
	
		it('should invoke onHideCallback if it exists when toast is removed', function () {
			var container = compileContainer();
			var scope = container.scope();
			
			var mock = {
				callback : function () { }
			};
			
			spyOn(mock, 'callback');
			
			toaster.pop({ type: 'info', body: 'toast 1', onHideCallback: mock.callback });
			
			rootScope.$digest();
			scope.removeToast(1);
			rootScope.$digest();
			
			expect(mock.callback).toHaveBeenCalled();
		});
	});


	describe('scope._onNewTest', function () {
		it('should not add toast if toasterId is passed to scope._onNewToast but toasterId is not set via config', function () {
			var container = compileContainer();
			var scope = container.scope();
	
			expect(scope.config.toasterId).toBeUndefined();
			
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1 });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(0);
		});
		
		it('should add toast if toasterId is passed to scope._onNewToast and toasterId is set via config', function () {
			var container = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 1 }"></toaster-container>');
					
			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
	
			expect(scope.config.toasterId).toBe(1);
			
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1 });
			
			rootScope.$digest();
			
			expect(scope.toasters.length).toBe(1);
		});
	
		it('should add toasts to their respective container based on toasterId', function () {
			var container1 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 1 }"></toaster-container>');
			var container2 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 2 }"></toaster-container>');
					
			$compile(container1)(rootScope);
			$compile(container2)(rootScope);
			rootScope.$digest();
			
			var scope1 = container1.scope();
			var scope2 = container2.scope();
				
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1 });
			toaster.pop({ type: 'info', body: 'toast 2', toasterId: 2 });
				
			rootScope.$digest();
				
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(1);
		});
	});

	describe('scope._onClearToasts', function (){
		it('should remove all toasts from all containers if toasterId is *', function () {
			var container1 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 1 }"></toaster-container>');
			var container2 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 2 }"></toaster-container>');
					
			$compile(container1)(rootScope);
			$compile(container2)(rootScope);
			rootScope.$digest();
			
			var scope1 = container1.scope();
			var scope2 = container2.scope();
				
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1 });
			toaster.pop({ type: 'info', body: 'toast 2', toasterId: 2 });
				
			rootScope.$digest();
				
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(1);
			
			toaster.clear('*');
			
			rootScope.$digest();
			
			expect(scope1.toasters.length).toBe(0);
			expect(scope2.toasters.length).toBe(0); 
		});
		
		it('should remove all toasts from all containers if config.toasterId and toastId are undefined', function () {
			var container1 = angular.element(
				'<toaster-container toaster-options="{ \'close-button\': false }"></toaster-container>');
			var container2 = angular.element(
				'<toaster-container toaster-options="{ \'close-button\': true }" ></toaster-container>');
					
			$compile(container1)(rootScope);
			$compile(container2)(rootScope);
			rootScope.$digest();
			
			var scope1 = container1.scope();
			var scope2 = container2.scope();
				
			toaster.pop({ type: 'info', body: 'toast 1' });
			toaster.pop({ type: 'info', body: 'toast 2' });
				
			rootScope.$digest();
				
			// since there are two separate instances of the container  
			// without a toasterId, both receive the newToast event
			expect(scope1.toasters.length).toBe(2);
			expect(scope2.toasters.length).toBe(2);
			
			toaster.clear();
			
			rootScope.$digest();
			
			expect(scope1.toasters.length).toBe(0);
			expect(scope2.toasters.length).toBe(0);
		});
		
		it('should not remove by toasterId / toastId from the correct container if toast.toasterId is defined and toast.toastId is undefined', function () {
			var container1 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 1 }"></toaster-container>');
			var container2 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 2 }"></toaster-container>');
					
			$compile(container1)(rootScope);
			$compile(container2)(rootScope);
			rootScope.$digest();
			
			var scope1 = container1.scope();
			var scope2 = container2.scope();
			
			// removeAllToasts explicitly looks for toast.uid, which is only set
			// if toastId is passed as a parameter
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1 });
			toaster.pop({ type: 'info', body: 'toast 2', toasterId: 2 });
			toaster.pop({ type: 'info', body: 'toast 3', toasterId: 2 });
				
			rootScope.$digest();
				
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(2);
			
			toaster.clear(2, 1);
			
			rootScope.$digest();
			
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(2);
		});
		
		it('should remove by toasterId / toastId from the correct container if toasterId is defined and toastId is defined', function () {
			var container1 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 1 }"></toaster-container>');
			var container2 = angular.element(
				'<toaster-container toaster-options="{ \'toaster-id\': 2 }"></toaster-container>');
					
			$compile(container1)(rootScope);
			$compile(container2)(rootScope);
			rootScope.$digest();
			
			var scope1 = container1.scope();
			var scope2 = container2.scope();
			
			// removeAllToasts explicitly looks for toast.uid, which is only set
			// if toastId is passed as a parameter
			toaster.pop({ type: 'info', body: 'toast 1', toasterId: 1, toastId: 1 });
			toaster.pop({ type: 'info', body: 'toast 2', toasterId: 2, toastId: 1 });
			toaster.pop({ type: 'info', body: 'toast 3', toasterId: 2, toastId: 2 });
				
			rootScope.$digest();
				
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(2);
			
			toaster.clear(2, 1);
			
			rootScope.$digest();
			
			expect(scope1.toasters.length).toBe(1);
			expect(scope2.toasters.length).toBe(1);
		});
	});
});


describe('toasterContainer', function () {
	var $interval, $intervalSpy;

	inject(function (_$interval_) {
		$interval = _$interval_;
	});

	beforeEach(function () {
		$intervalSpy = jasmine.createSpy('$interval', $interval);

		module('toaster', function ($provide) {
			$provide.value('$interval', $intervalSpy);
		});

		// inject the toaster service
		inject(function (_toaster_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			rootScope = _$rootScope_;
			$compile = _$compile_;
		});
	});

	it('should use the toast.timeout argument if it is a valid number', function () {
		var container = compileContainer();
		var scope = container.scope();

		spyOn(scope, 'configureTimer').and.callThrough();

		toaster.pop({ timeout: 2 });

		expect(scope.configureTimer).toHaveBeenCalled();
		expect(scope.configureTimer.calls.allArgs()[0][0].timeout).toBe(2);
		expect($intervalSpy.calls.first().args[1]).toBe(2)
	});

	it('should not use the toast.timeout argument if not a valid number', function () {
		var container = compileContainer();
		var scope = container.scope();

		spyOn(scope, 'configureTimer').and.callThrough();

		toaster.pop({ timeout: "2" });

		expect(scope.configureTimer).toHaveBeenCalled();
		expect(scope.configureTimer.calls.allArgs()[0][0].timeout).toBe("2");
		expect($intervalSpy.calls.first().args[1]).toBe(5000);
	});

	it('should call scope.removeToast when toast.timeoutPromise expires', function () {
		var container = compileContainer();
		var scope = container.scope();

		spyOn(scope, 'removeToast').and.callThrough();

		toaster.pop({ timeout: 2 });

		$intervalSpy.calls.first().args[0]();

		rootScope.$digest();

		expect(scope.removeToast).toHaveBeenCalled();
	});

	it('should retrieve timeout by toast type if mergedConfig toast-timeout is an object', function () {
		var element = angular.element(
			'<toaster-container toaster-options="{\'time-out\': {\'toast-info\': 5}}"></toaster-container>');

		$compile(element)(rootScope);
		rootScope.$digest();

		toaster.pop({ type: 'info' });

		expect($intervalSpy.calls.first().args[1]).toBe(5);
	});

	it('should not set a timeout if mergedConfig toast-timeout is an object and does not match toast type', function () {
		// TODO: this seems to be a bug in the toast-timeout configuration option.
		// It should fall back to a default value if the toast type configuration
		// does not match the target toast type or throw an exception to warn of an
		// invalid configuration.
		
		var element = angular.element(
			'<toaster-container toaster-options="{\'time-out\': {\'toast-info\': 5}}"></toaster-container>');

		$compile(element)(rootScope);
		rootScope.$digest();

		toaster.pop({ type: 'warning' });

		expect($intervalSpy.calls.all().length).toBe(0);
	});
});


function compileContainer() {
	var element = angular.element('<toaster-container></toaster-container>');
	$compile(element)(rootScope);
	rootScope.$digest();

	return element;
}
/* global describe global it global beforeEach global angular global jasmine global inject global expect global spyOn */

'use strict';

var rootScope, toaster, $compile;

describe('toasterContainer controller', function () {
	beforeEach(function () {
		module('toaster');
		
		// inject the toaster service
        inject(function (_toaster_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			rootScope = _$rootScope_;
			$compile = _$compile_;
		});
	});

	it('should stop timer if config.mouseoverTimer is true', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': true }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		expect(scope.config.mouseoverTimer).toBe(true);

		toaster.pop({ type: 'info' });

		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBeDefined();

		scope.stopTimer(scope.toasters[0]);

		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBe(null);
	});

	it('should do nothing if config.mouseoverTimer is true and stopTimer is called again', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': true }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		expect(scope.config.mouseoverTimer).toBe(true);

		toaster.pop({ type: 'info' });

		rootScope.$digest();

		scope.stopTimer(scope.toasters[0]);
		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBe(null);

		scope.stopTimer(scope.toasters[0]);
		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBe(null);
	});

	it('should not stop timer if config.mouseoverTimer is false', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': false }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		expect(scope.config.mouseoverTimer).toBe(false);

		toaster.pop({ type: 'info' });

		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBeDefined();

		scope.stopTimer(scope.toasters[0]);

		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBeDefined();
	});

	it('should restart timer if config.mouseoverTimer is true and timeoutPromise is falsy', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': true }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		toaster.pop({ type: 'info' });
		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBeDefined();

		scope.stopTimer(scope.toasters[0]);
		expect(scope.toasters[0].timeoutPromise).toBe(null);

		scope.restartTimer(scope.toasters[0]);
		expect(scope.toasters[0].timeoutPromise).toBeDefined();
	});

	it('should not restart timer if config.mouseoverTimer is true and timeoutPromise is truthy', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': true }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		toaster.pop({ type: 'info' });
		rootScope.$digest();

		expect(scope.toasters[0].timeoutPromise).toBeDefined();

		spyOn(scope, 'configureTimer').and.callThrough();

		scope.restartTimer(scope.toasters[0]);
		expect(scope.toasters[0].timeoutPromise).toBeDefined();
		expect(scope.configureTimer).not.toHaveBeenCalled();
	});

	it('should not restart timer and should remove toast if config.mouseoverTimer is not true and timeoutPromise is null', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': 2 }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		toaster.pop({ type: 'info' });
		rootScope.$digest();

		expect(scope.config.mouseoverTimer).toBe(2);

		scope.toasters[0].timeoutPromise = null;

		spyOn(scope, 'configureTimer').and.callThrough();
		spyOn(scope, 'removeToast').and.callThrough();

		scope.restartTimer(scope.toasters[0]);

		expect(scope.configureTimer).not.toHaveBeenCalled();
		expect(scope.removeToast).toHaveBeenCalled();
		expect(scope.toasters.length).toBe(0)
	});

	it('should not restart timer or remove toast if config.mouseoverTimer is not true and timeoutPromise is not null', function () {
		var container = angular.element(
			'<toaster-container toaster-options="{ \'mouseover-timer-stop\': 2 }"></toaster-container>');

		$compile(container)(rootScope);
		rootScope.$digest();
		var scope = container.scope();

		toaster.pop({ type: 'info' });
		rootScope.$digest();

		expect(scope.config.mouseoverTimer).toBe(2);

		spyOn(scope, 'configureTimer').and.callThrough();
		spyOn(scope, 'removeToast').and.callThrough();

		scope.restartTimer(scope.toasters[0]);

		expect(scope.configureTimer).not.toHaveBeenCalled();
		expect(scope.removeToast).not.toHaveBeenCalled();
		expect(scope.toasters.length).toBe(1)
	});

	describe('click', function () {
		it('should do nothing if config.tap is not true and toast.showCloseButton is not true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': false, \'close-button\': false }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(1);
			expect(scope.removeToast).not.toHaveBeenCalled();
		});
		
		it('should do nothing if config.tap is not true and toast.showCloseButton is true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': false, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(1);
			expect(scope.removeToast).not.toHaveBeenCalled();
		});
		
		it('should do nothing if config.tap is not true and isCloseButton is not true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': false, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0], false);
			
			expect(scope.toasters.length).toBe(1);
			expect(scope.removeToast).not.toHaveBeenCalled();
		});
		
		it('should remove toast if config.tap is true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(0);
			expect(scope.removeToast).toHaveBeenCalled();
		});
		
		it('should remove toast if config.tap is true and the click handler function returns true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info', clickHandler: function (toast, isCloseButton) { return true; } });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(0);
			expect(scope.removeToast).toHaveBeenCalled();
		});
		
		it('should not remove toast if config.tap is true and the click handler function does not return true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info', clickHandler: function (toast, isCloseButton) { } });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(1);
			expect(scope.removeToast).not.toHaveBeenCalled();
		});
		
		it('should remove toast if config.tap is true and the click handler exists on the parent returning true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			scope.$parent.clickHandler = function () { return true; };
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info', clickHandler: 'clickHandler' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(0);
			expect(scope.removeToast).toHaveBeenCalled();
		});
		
		it('should not remove toast if config.tap is true and the click handler exists on the parent not returning true', function () {
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			scope.$parent.clickHandler = function () { };
			
			spyOn(scope, 'removeToast').and.callThrough();
			
			toaster.pop({ type: 'info', clickHandler: 'clickHandler' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(1);
			expect(scope.removeToast).not.toHaveBeenCalled();
		});
		
		it('should remove toast if config.tap is true and the click handler does not exist on the parent', function () {
			// TODO: this functionality seems counter-intuitive.  
			// Need to identify use cases to see if this is actually correct.
			
			var container = angular.element(
			'<toaster-container toaster-options="{ \'tap-to-dismiss\': true, \'close-button\': true }"></toaster-container>');

			$compile(container)(rootScope);
			rootScope.$digest();
			var scope = container.scope();
			
			spyOn(scope, 'removeToast').and.callThrough();
			console.log = jasmine.createSpy("log");
			
			toaster.pop({ type: 'info', clickHandler: 'clickHandler' });
			rootScope.$digest();
			
			scope.click(scope.toasters[0]);
			
			expect(scope.toasters.length).toBe(0);
			expect(scope.removeToast).toHaveBeenCalled();
			
    		expect(console.log).toHaveBeenCalledWith("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.");
		});
	});
});
/* global describe global it global beforeEach global angular global inject global expect */

'use strict';

describe('directiveTemplate', function () {
	var toaster, scope, $compile;

	beforeEach(function () {
        createDirectives(); 
        
		// load dependencies
		module('testApp');
		module('toaster');
		
		// inject the toaster service
        inject(function (_toaster_, _$rootScope_, _$compile_) {
			toaster = _toaster_;
			scope = _$rootScope_;
			$compile = _$compile_;
		});
	});

	it('should load and render the referenced directive template text', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'bind-template-only', bodyOutputType: 'directive' });

		expect(container[0].innerText).toBe('here is some great new text! It was brought in via directive!');
	});

	it('should bind directiveData to the directive template', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'bind-template-with-data', bodyOutputType: 'directive', directiveData: { name: 'Bob' } });

		expect(container[0].innerText).toBe('Hello Bob');
	});
	
	it('should parse type string directiveData to an object', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'bind-template-with-data', bodyOutputType: 'directive', directiveData: '{ "name": "Bob" }' });

		expect(container[0].innerText).toBe('Hello Bob');
	});
	
	it('should render type number directiveData', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'bind-template-with-numeric-data', bodyOutputType: 'directive', directiveData: 2 });

		expect(container[0].innerText).toBe('1 + 1 = 2');
	});

	it('should bind Attribute-restricted templates', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'bind-template-only', bodyOutputType: 'directive', directiveData: { name: 'Bob' } });

		expect(container[0].innerText).toBe('here is some great new text! It was brought in via directive!');
	});

	it('should bind unrestricted templates', function () {
		var container = compileContainer();
		pop({ type: 'info', body: 'unrestricted-template', bodyOutputType: 'directive' });

		expect(container[0].innerText).toBe('Unrestricted Template');
	});

	it('should not bind Element-only-restricted templates', function () {
		var hasError = false;
		var container = compileContainer();
        
        try {
		  pop({ type: 'info', body: 'element-template', bodyOutputType: 'directive' });
        } catch(e) {
            var message = 'Directives must be usable as attributes. ' + 
                'Add "A" to the restrict option (or remove the option entirely). Occurred for directive element-template.';
            
            expect(e.message).toBe(message);
            hasError = true;
        }

        expect(hasError).toBe(true);
	});

	it('should not bind Class-only-restricted templates', function () {
        var hasError = false;
		var container = compileContainer();
        
        try {
		  pop({ type: 'info', body: 'class-template', bodyOutputType: 'directive' });
        } catch(e) {
            var message = 'Directives must be usable as attributes. ' + 
                'Add "A" to the restrict option (or remove the option entirely). Occurred for directive class-template.';
            
            expect(e.message).toBe(message);
            hasError = true;
        }

        expect(hasError).toBe(true);
	});

	it('should throw an error if directiveName argument is not passed via body', function () {
		var container = compileContainer();
		var hasError = false;
		
		expect(container[0].innerText).toBe('');
		
		try {
			pop({ type: 'info', bodyOutputType: 'directive' });
		} catch (e) {
			expect(e.message).toBe('A valid directive name must be provided via the toast body argument when using bodyOutputType: directive');
			hasError = true;
		}
		
		expect(container[0].innerText).toBe('');
		expect(hasError).toBe(true);
	});
	
	it('should throw an error if directiveName argument is an empty string', function () {
		var container = compileContainer();
		var hasError = false;
		
		expect(container[0].innerText).toBe('');
		
		try {
			pop({ type: 'info', body: '', bodyOutputType: 'directive' });
		} catch (e) {
			expect(e.message).toBe('A valid directive name must be provided via the toast body argument when using bodyOutputType: directive');
			hasError = true;
		}
		
		expect(container[0].innerText).toBe('');
		expect(hasError).toBe(true);
	});

	it('should throw an error if the directive could not be found', function () {
		var hasError = false;

		compileContainer();

		try {
			pop({ type: 'info', body: 'non-existent-directive', bodyOutputType: 'directive' });
		} catch (e) {
            var message = 'non-existent-directive could not be found. ' + 
                'The name should appear as it exists in the markup,' + 
                ' not camelCased as it would appear in the directive declaration,' +
                ' e.g. directive-name not directiveName.'
            
			expect(e.message).toBe(message);
			hasError = true;
		}

		expect(hasError).toBe(true);
	});
    
    it('should throw an error if the directive uses isolate scope', function () {
        var hasError = false;
		compileContainer();
        
        try {
            pop({ type: 'info', body: 'isolate-scope', bodyOutputType: 'directive' });
        } catch (e) {
            var message = 'Cannot use a directive with an isolated scope.' +
                ' The scope must be either true or falsy (e.g. false/null/undefined). Occurred for directive isolate-scope.';
            
            expect(e.message).toBe(message)
            hasError = true;
        }
        
        expect(hasError).toBe(true);
    })


	function compileContainer() {
		var element = angular.element('<toaster-container></toaster-container>');
		$compile(element)(scope);
		scope.$digest();

		return element;
	}

	function pop(params) {
		toaster.pop(params);
		
		// force new toast to be rendered
		scope.$digest();
	}

	function createDirectives() {
		angular.module('testApp', [])
			.directive('bindTemplateOnly', function () {
				return {
					restrict: 'A',
					template: 'here is some great new text! <span style="color:orange">It was brought in via directive!</span>'
				}
			})
			.directive('bindTemplateWithData', function () {
				return { template: 'Hello {{directiveData.name}}' }
			})
			.directive('bindTemplateWithNumericData', function () {
				return { template: '1 + 1 = {{directiveData}}' }
			})
			.directive('elementTemplate', function () {
				return { restrict: 'E', template: 'Element Template' }
			})
			.directive('classTemplate', function () {
				return { restrict: 'C', template: 'Class Template' }
			})
			.directive('unrestrictedTemplate', function () {
				return { template: 'Unrestricted Template' }
			})
            .directive('isolateScope', function () {
                return { template: 'isolate scope template', scope: {}}
            }); 
	}
})
/**
  * Created by FMG on 27/04/2016.
  */
angular.module('ocf.forgotPassword', ['ui.router'])

  .config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state('ocf.forgotPassword', {
      url: '/forgotPassword',
      views: {
        "ocf": {
          controller: 'ForgotPasswordController',
          templateUrl: 'passwordMgmt/forgotPassword/forgotPassword.html'
        }
      }
    })
  }]);

/**
  * Created by FMG on 27/04/2016.
  */
angular
  .module('ocf.services')
  .service('ForgotPasswordService', ForgotPasswordService);

ForgotPasswordService.$inject = [
  '$q',
  '$resource',
  'URLManager'
];

function ForgotPasswordService($q,
                               $resource,
                               URLManager) {
  var fps = this;

  fps.recoverPassword = recoverPassword;

  return fps;

  /**
   * Calls password_change resource with required parameters
   * @param username
   * @returns {*}
   */
  function recoverPassword(username) {
    var q = $q.defer();

    var user = {
      username: username
    };

    var passwordRecover = $resource(URLManager.getUrl('passwordRecover'), {}, {
      recover: {
        method: 'POST',
        headers: {
          // removing Zest* headers from the request as to avoid errors: { "status": 500, "message": "Bad Headers" }
          //'ZestAppName': undefined,
          'ZestSessionId': undefined
        }
      }
    });

    // Call to action
    passwordRecover.recover(user, q.resolve, q.reject);

    return q.promise;
  }


}

/**
 * Created by FMG on 27/04/2016.
 */
angular
  .module('ocf.forgotPassword',[])
  .controller('ForgotPasswordController', ForgotPasswordController);

ForgotPasswordController.$inject =
  [
    '$scope',
    'navigateTo',
    '$ionicPlatform',
    'ForgotPasswordService',
    'LoadingService',
    '$translate'
  ];

function ForgotPasswordController($scope,
                                  navigateTo,
                                  $ionicPlatform,
                                  ForgotPasswordService,
                                  LoadingService,
                                  $translate) {
  var deregisterGoToPreviousState;
  var defaultPasswordManagement = {
    username: '',
    label: '',
    hasError: false,
    genericError: '',
    successPasswordRecover: false
  };

  $scope.goToPreviousState = goToPreviousState;
  $scope.resetPassword = resetPassword;
  $scope.removeErrors = removeErrors;

  ///////////////
  /// Scope Events
  $scope.$on('$ionicView.beforeEnter', function () {


    deregisterGoToPreviousState = $ionicPlatform.registerBackButtonAction(goToPreviousState, 501);

    if ($scope.heightScreen < 480) {
      document.getElementById("changePasswordInput").addEventListener('touchend', function () {
        $("#changePasswordInput").attr('readonly', 'readonly'); // Force keyboard to hide on input field.
        $("#changePasswordInput").attr('disabled', 'true');

        setTimeout(function () {
          $("#changePasswordInput").blur();  //actually close the keyboard
          // Remove readonly attribute after keyboard is hidden.
          $("#changePasswordInput").removeAttr('readonly');
          $("#changePasswordInput").removeAttr('disabled');
        }, 100);
      });
    }
    $translate('OCF.PASSWORD.FORGOT.USERNAME_PLACEHOLDER').then(function (placeholder) {
      defaultPasswordManagement.label = placeholder;
      // pm for PasswordManagement, shortened for readability
      $scope.pm = angular.copy(defaultPasswordManagement);
    });
  });

  //noinspection JSUnusedAssignment
  $scope.$on('$destroy', deregisterGoToPreviousState);


  ///////////////
  /**
   * Handles the goBack action triggered by menu or HW Back Button
   */
  function goToPreviousState(e) {
    if (!!e) {
      e.preventDefault();
    }

    navigateTo.login();

  }

  /**
   * Sends the request for a password reset
   */
  function resetPassword() {
    if ($scope.pm.username) {
      LoadingService.show("Processing username...");
      ForgotPasswordService.recoverPassword($scope.pm.username)
        .then(function () {
          $scope.pm.successPasswordRecover = true;
        })
        .catch(handleErrors)
        .finally(resetFormStates);
    }
  }

  /**
   * Error processing function to display messages accordingly.
   *
   * Expected errors:
   *  412 - Password rules failed.
   *  500 - Internal Server error (error returned when user:password basic auth isn't correct)
   *    0 - No internet connection
   *
   *  @param fail
   */
  function handleErrors(fail) {
    if (fail.status == 412) {
      // TODO: due to the type of successful message, to inform of an invalid user is not necessary. Success screen will be displayed instead.
      //$scope.pm.label = fail.data.message;
      //$scope.pm.hasError = true;
      $scope.pm.successPasswordRecover = true;
    }

    if (fail.status == 500) {
      $scope.pm.genericError = "Server Error.";
    }

    if (fail.status == 0) {
      $scope.pm.genericError = "No connection available.";
    }
  }


  /**
   * Resets error state
   */
  function removeErrors() {
    $scope.pm.hasError = defaultPasswordManagement.hasError;
    $scope.pm.label = defaultPasswordManagement.label;
  }


  /**
   * Resets passwords and sets to hidden the passwords
   */
  function resetFormStates() {
    $scope.pm.username = defaultPasswordManagement.username;
    LoadingService.hide();
  }
}

/**
* Created by PC-055 on 03/05/2016.
*/
angular
  .module('ocf.changePassword.success',[])
  .controller('ChangePasswordSuccessController', ChangePasswordSuccessController);

ChangePasswordSuccessController.$inject =
  [
    '$scope',
    '$state',
    '$log',
    'navigateTo',
    '$window',
    '$timeout',
    'toaster',
    '$ionicViewSwitcher',
    '$ionicSideMenuDelegate',
    '$ionicPlatform',
    'ChangePasswordService'
  ];

//noinspection JSUnusedLocalSymbols
function ChangePasswordSuccessController($scope,
                                  $state,
                                  $log,
                                  navigateTo,
                                  $window,
                                  $timeout,
                                  toaster,
                                  $ionicViewSwitcher,
                                  $ionicSideMenuDelegate,
                                  $ionicPlatform,
                                  ChangePasswordService) {
  var deregisterGoToPreviousState;

  //$scope.pm = {
  //  passwordRules: {
  //    "minDigit": 1,
  //    "minLength": 8,
  //    "minLowercase": 1,
  //    "minSpecial": 1,
  //    "minUppercase": 1
  //  },
  //  meter: {
  //    value: 0,
  //    max: 4,
  //    description: ["", "Weak", "Moderate", "Moderate", "Strong"]
  //  },
  //  showNewPassword: false,
  //  showConfirmPassword: false,
  //  newError: false,
  //  confirmError: false,
  //  current: '',
  //  new: '',
  //  newConfirm: ''
  //};

  //$scope.changePassword = changePassword;
  $scope.goToPreviousState = goToPreviousState;
  //$scope.togglePasswordVisibility = togglePasswordVisibility;

  ///////////////
  /// Scope Events
  $scope.$on('$ionicView.beforeEnter', function () {
    ChangePasswordService.getPasswordRules()
      .then(function (rules) {
        $scope.pm.passwordRules = rules;
      })
      .catch(function (fail) {
        $log.error(fail.status, fail.message, fail.type);
      });

    $ionicSideMenuDelegate.canDragContent(true);
    deregisterGoToPreviousState = $ionicPlatform.registerBackButtonAction(goToPreviousState, 501);
  });

  //noinspection JSUnusedAssignment
  $scope.$on('$destroy', deregisterGoToPreviousState);

  //$scope.$watch('pm.new', function (password) {
  //  // updates the password strength meter value based on dropbox's library
  //  $scope.pm.meter.value = zxcvbn(password).score;
  //});

  ///////////////
  /**
   * Request to change password
   */
  function changePassword() {
    ChangePasswordService.setNewPassword($scope.pm.current, $scope.pm.new)
      .then(function (s) {
        $log.debug(s);
      })
      .catch(function (f) {
        // Show errors
        $log.debug(f);
      });
  }


  /**
   * Handles the goBack action triggered by menu or HW Back Button
   */
  function goToPreviousState() {
    $ionicViewSwitcher.nextDirection('back');

    if ($scope.cameFromStateName) {
      $state.go($scope.cameFromStateName);

    } else {
      navigateTo.home();

    }
  }

  /**
   * Toggles password visibility
   * @param password
   */
  function togglePasswordVisibility(password) {
    if ('new' == password) {
      $scope.pm.showNewPassword = !$scope.pm.showNewPassword;

    } else if ('confirm' == password) {
      $scope.pm.showConfirmPassword = !$scope.pm.showConfirmPassword;

    }
  }
}

/**
 * Created by FMG on 27/04/2016.
 */
angular.module('ocf.changePassword', ['ui.router'])

  .config(["$stateProvider", function config($stateProvider) {
    $stateProvider
      .state('ocf.changePassword', {
        url: '/changePassword',
        views: {
          "ocf": {
            controller: 'ChangePasswordController',
            templateUrl: 'passwordMgmt/changePassword/changePassword.html'
          }
        }
      })
  }]);

/**
 * Created by FMG on 27/04/2016.
 */
angular
  .module('ocf.services')
  .factory('ChangePasswordService', ChangePasswordService);

ChangePasswordService.$inject = [
  '$q',
  '$resource',
  '$rootScope',
  'EnvironmentConfig',
  'URLManager',
  'encode'
];

function ChangePasswordService($q,
                               $resource,
                               $rootScope,
                               EnvironmentConfig,
                               URLManager,
                               encode) {
  var cps = this;

  cps.info = {
    currentUser: $rootScope.user.username || '',
    organizationId: $rootScope.user.organizationId || 0
  };

  cps.getPasswordRules = getPasswordRules;
  cps.setNewPassword = setNewPassword;

  return cps;

  /**
   * Retrieves password rules for current organization
   */
  function getPasswordRules() {
    var q = $q.defer();
    var passwordChange = $resource(URLManager.getUrl('passwordChange'), {}, {
      passwordChangeRules: {
        method: 'GET',
        timeout: EnvironmentConfig.requestTimeout
      }
    });

    // Call to action
    passwordChange.passwordChangeRules({organizationId: cps.info.organizationId}, q.resolve, passRulesFail);

    function passRulesFail(passwordRulesFail) {
      var failMessage = {
        status: passwordRulesFail.status,
        message: passwordRulesFail.message,
        type: 'passwordRules'
      };

      if (passwordRulesFail.status !== 0) {
        // net::ERR_CONNECTION_TIMED_OUT
        failMessage.message = "No internet connection.";
      }

      q.reject(failMessage);
    }

    return q.promise;

  }

  /**
   * Calls password_change resource with required parameters
   * @param currentPassword
   * @param newPassword
   * @returns {*}
   */
  function setNewPassword(currentPassword, newPassword) {
    var q = $q.defer();

    var encodedCredentials = encode.encodeCredentials({username: cps.info.currentUser, password: currentPassword});
    var userPassword = {
      username: cps.info.currentUser,
      password: newPassword
    };

    var passwordChange = $resource(URLManager.getUrl('passwordChange'), {}, {
      setPassword: {
        method: 'POST',
        headers: {
          'Authorization': "Basic " + encodedCredentials, // Credentials based on password entered by the user
          // removing Zest* headers from the request as to avoid errors: { "status": 500, "message": "Bad Headers" }
          //'ZestAppName': undefined,
          'ZestSessionId': undefined
        }
      }
    });

    // Call to action
    passwordChange.setPassword(userPassword, q.resolve, q.reject);

    return q.promise;
  }
}

/**
 * Created by FMG on 27/04/2016.
 */
angular
  .module('ocf.changePassword')
  .controller('ChangePasswordController', ChangePasswordController);

ChangePasswordController.$inject =
  [
    '$scope',
    '$state',
    '$log',
    'navigateTo',
    'lodash',
    '$ionicViewSwitcher',
    '$ionicPlatform',
    '$translate',
    'ChangePasswordService',
    'LoadingService',
    '$window'
  ];

function ChangePasswordController($scope,
                                  $state,
                                  $log,
                                  navigateTo,
                                  lodash,
                                  $ionicViewSwitcher,
                                  $ionicPlatform,
                                  $translate,
                                  ChangePasswordService,
                                  LoadingService,
                                  $window) {
  var deregisterGoToPreviousState;
  var deregisterPasswordStrengthMeter;

  var processing;
  var legendMust;
  var legendMustNot;
  var legendUsed;
  var dynamicMinDigit;
  var dynamicMinUppercase;
  var dynamicMinLowercase;
  var dynamicMinSpecial;
  var dynamicBeAtLeastMultiple;
  var dynamicContainAtLeast;
  var dynamicAnd;
  var errorInvalidPass;
  var errorIncorrectPass;
  var errorNoMatchPass;
  var errorNoConnection;

  var defaultPasswordManagement = {
    passwordRules: {
      "minDigit": 0,
      "minLength": 0,
      "minLowercase": 0,
      "minSpecial": 0,
      "minUppercase": 0
    },
    passwordRulesErrors: {
      "digit": false,
      "length": false,
      "lowercase": false,
      "special": false,
      "uppercase": false,
      "previously": false,
      "dictionary": false,
      "dictWord": '',
      "genericError": ''
    },
    meter: {
      value: 0,
      max: 4,
      description: ["", "Weak", "Fair", "Fair", "Strong"]
    },
    labels: {
      current: 'Current Password',
      new: 'New Password',
      newConfirm: 'Confirm New Password'
    },
    passwords: {
      current: '',
      new: '',
      newConfirm: ''
    },
    hasError: {
      current: false,
      new: false,
      newConfirm: false
    },
    display: {
      current: false,
      new: false,
      newConfirm: false
    }
  };
  $scope.heightScreen = $window.screen.height;
  $scope.changePassword = changePassword;
  $scope.goToPreviousState = goToPreviousState;
  $scope.removeErrors = removeErrors;
  $scope.togglePasswordVisibility = togglePasswordVisibility;

  ///////////////
  /// Scope Events
  $scope.$on('$ionicView.beforeEnter', function () {
    $scope.dictWord = {errorMessage: ''};
    $scope.pm = angular.copy(defaultPasswordManagement);

    /**
     * Meter
     */
    $translate([
      'OCF.PASSWORD.CHANGE.STRENGTH_METER.WEAK',
      'OCF.PASSWORD.CHANGE.STRENGTH_METER.FAIR',
      'OCF.PASSWORD.CHANGE.STRENGTH_METER.STRONG'
    ]).then(function (meter) {
      $scope.pm.meter.description[1] = meter['OCF.PASSWORD.CHANGE.STRENGTH_METER.WEAK'];
      $scope.pm.meter.description[2] = meter['OCF.PASSWORD.CHANGE.STRENGTH_METER.FAIR'];
      $scope.pm.meter.description[3] = meter['OCF.PASSWORD.CHANGE.STRENGTH_METER.FAIR'];
      $scope.pm.meter.description[4] = meter['OCF.PASSWORD.CHANGE.STRENGTH_METER.STRONG'];
    });

    /**
     * Placeholders
     */
    $translate([
      'OCF.PASSWORD.CHANGE.CURRENT_PLACEHOLDER',
      'OCF.PASSWORD.CHANGE.NEW_PLACEHOLDER',
      'OCF.PASSWORD.CHANGE.CONFIRM_PLACEHOLDER'
    ]).then(function (labels) {
      $scope.pm.labels.current = labels['OCF.PASSWORD.CHANGE.CURRENT_PLACEHOLDER'];
      $scope.pm.labels.new = labels['OCF.PASSWORD.CHANGE.NEW_PLACEHOLDER'];
      $scope.pm.labels.newConfirm = labels['OCF.PASSWORD.CHANGE.CONFIRM_PLACEHOLDER'];

      // Required for resetting object model
      defaultPasswordManagement.labels.current = labels['OCF.PASSWORD.CHANGE.CURRENT_PLACEHOLDER'];
      defaultPasswordManagement.labels.new = labels['OCF.PASSWORD.CHANGE.NEW_PLACEHOLDER'];
      defaultPasswordManagement.labels.newConfirm = labels['OCF.PASSWORD.CHANGE.CONFIRM_PLACEHOLDER'];
    });

    /**
     * Loading service
     */
    $translate('OCF.PASSWORD.CHANGE.PROCESSING').then(function (loading) {
      processing = loading;
    });

    /**
     * Legends
     */
    $translate([
      'OCF.PASSWORD.CHANGE.LEGEND.MUST',
      'OCF.PASSWORD.CHANGE.LEGEND.MUST_NOT',
      'OCF.PASSWORD.CHANGE.LEGEND.USED'/*,
       'OCF.PASSWORD.CHANGE.LEGEND.DICT_WORD'*/
    ]).then(function (legend) {
      legendMust = legend['OCF.PASSWORD.CHANGE.LEGEND.MUST'];
      legendMustNot = legend['OCF.PASSWORD.CHANGE.LEGEND.MUST_NOT'];
      legendUsed = legend['OCF.PASSWORD.CHANGE.LEGEND.USED'];
      //legendDictWord = legend['OCF.PASSWORD.CHANGE.LEGEND.DICT_WORD'];
    });

    /**
     * Dynamic text
     */
    $translate([
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_DIGIT',
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_UPPERCASE',
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_LOWERCASE',
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_SPECIAL',
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.CONTAIN_AT_LEAST',
      'OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.AND'
    ]).then(function (dynamic) {
      dynamicMinDigit = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_DIGIT'];
      dynamicMinUppercase = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_UPPERCASE'];
      dynamicMinLowercase = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_LOWERCASE'];
      dynamicMinSpecial = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.MIN_SPECIAL'];
      dynamicContainAtLeast = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.CONTAIN_AT_LEAST'];
      dynamicAnd = dynamic['OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.AND'];
    });

    /**
     * Dynamic text with variables
     */
    $translate('OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.BE_AT_LEAST_MULTIPLE', {
      number: $scope.pm.passwordRules.minLength
    }).then(function (txt) {
      dynamicBeAtLeastMultiple = txt;
    });

    /**
     * Error Messages
     */
    $translate([
      'OCF.PASSWORD.CHANGE.LEGEND.ERRORS.INVALID_PASSWORD',
      'OCF.PASSWORD.CHANGE.LEGEND.ERRORS.INCORRECT_PASSWORD',
      'OCF.PASSWORD.CHANGE.LEGEND.ERRORS.NO_MATCH_PASSWORD',
      'OCF.PASSWORD.CHANGE.LEGEND.ERRORS.NO_CONNECTION'
    ]).then(function (errors) {
      errorInvalidPass = errors['OCF.PASSWORD.CHANGE.LEGEND.ERRORS.INVALID_PASSWORD'];
      errorIncorrectPass = errors['OCF.PASSWORD.CHANGE.LEGEND.ERRORS.INCORRECT_PASSWORD'];
      errorNoMatchPass = errors['OCF.PASSWORD.CHANGE.LEGEND.ERRORS.NO_MATCH_PASSWORD'];
      errorNoConnection = errors['OCF.PASSWORD.CHANGE.LEGEND.ERRORS.NO_CONNECTION'];
    });

    // pm for PasswordManagement, shortened for readability
    $scope.pm = angular.copy(defaultPasswordManagement);
    $scope.successPasswordChange = false;
    if ($scope.heightScreen < 480){
      $("ion-content").css("height", "auto")
    }
    ChangePasswordService.getPasswordRules()
      .then(function (rules) {
        // Sets rules (removes promises related attributes)
        $scope.pm.pR = JSON.parse(angular.toJson(rules));
        $scope.pm.passwordRules = {minDigit: $scope.pm.pR.minDigit,
          minLength: $scope.pm.pR.minLength,
          minUppercase: $scope.pm.pR.minUppercase,
          minLowercase: $scope.pm.pR.minLowercase,
          minSpecial: $scope.pm.pR.minSpecial
        };
        // Builds the "MUST" message
        buildRules();
      })
      .catch(function (fail) {
        $scope.pm.passwordRulesErrors.genericError = fail.message;
        $log.error(fail.status, fail.message, fail.type);
      });

    deregisterGoToPreviousState = $ionicPlatform.registerBackButtonAction(goToPreviousState, 501);

    deregisterPasswordStrengthMeter = $scope.$watch('pm.passwords.new', function (password) {
      // updates the password strength meter value based on dropbox's library
      var strength = zxcvbn(password).score;
      $scope.pm.meter.value = strength ? strength : password.length ? 1 : 0;
    });
  });

  $scope.$on('$ionicView.beforeLeave', function () {
    deregisterGoToPreviousState();
    deregisterPasswordStrengthMeter();
    $scope.pm = angular.copy(defaultPasswordManagement); // resets pm
  });


  ///////////////
  // Scope Methods
  /**
   * Request to change password
   */
  function changePassword() {
    LoadingService.show(processing);

    // Resets errors
    $scope.pm.passwordRulesErrors = angular.copy(defaultPasswordManagement.passwordRulesErrors);
    // Resets description
    $scope.pm.finalMessage = angular.copy($scope.pm.noErrorsFinalMessage);
    // newConfirm must match new
    $scope.pm.hasError.newConfirm = $scope.pm.passwords.new !== $scope.pm.passwords.newConfirm;

    if (!$scope.pm.hasError.newConfirm) {
      ChangePasswordService.setNewPassword($scope.pm.passwords.current, $scope.pm.passwords.new)
        .then(function () {
          $scope.successPasswordChange = true;
        })
        .catch(handleErrors)
        .finally(resetFormStates);

    } else {
      LoadingService.hide();
      // Error for the new Confirmation password, there's no action to validate
      $scope.pm.passwords = angular.copy(defaultPasswordManagement.passwords); // Cleans passwords
      $scope.pm.labels.newConfirm = errorNoMatchPass;
    }
    if ($scope.heightScreen < 480){
      $("ion-content").css("height", "auto")
    }
    if ($scope.heightScreen < 480){
      $("ion-content").css("height", "auto")
    }
  }

  /**
   * Error processing function to display messages accordingly.
   *
   * Expected errors:
   *  412 - Password rules failed.
   *  401 - Unauthorized. Basic Auth failed. Current username/password does not match.
   *  500 - Internal Server error (error returned when user:password basic auth isn't correct)
   *    0 - No internet connection
   *
   *  @param fail
   */
  function handleErrors(fail) {
    if (fail.status == 412) {
      $scope.pm.hasError.new = true;
      $scope.pm.labels.new = errorInvalidPass;

      var hasErrors = /length|uppercase|lowercase|digit|special|previously|dictionary.*'/g;
      var errors = fail.data.message.match(hasErrors);

      if (errors.length) {
        // Sets corresponding error flags to true
        for (var i = 0; i < errors.length; i++) {
          var error = errors[i];

          if (error.indexOf("dictionary") !== -1) {
            // extracts the dictWord from the sentence
            $scope.pm.passwordRulesErrors.dictionary = true;
            $scope.pm.passwordRulesErrors.dictWord = error.split("'")[1];
            $translate('OCF.PASSWORD.CHANGE.LEGEND.DICT_WORD', {
              dictWord: $scope.pm.passwordRulesErrors.dictWord
            }).then(function (txt) {
              $scope.dictWord.errorMessage = txt;
            });


          } else {
            $scope.pm.passwordRulesErrors[error] = true;

            if (error.indexOf("previously") == -1) {
              $scope.pm.finalMessage = $scope.pm.finalMessage.replace(error, 'error');
            }
          }
        }
      }
    }

    if (fail.status == 401 || fail.status == 500) {
      $scope.pm.hasError.current = true;
      $scope.pm.labels.current = errorIncorrectPass;
    }

    if (fail.status == 0) {
      $scope.pm.passwordRulesErrors.genericError = errorNoConnection;
    }
  }

  /**
   * Handles the goBack action triggered by menu or HW Back Button
   */
  function goToPreviousState(e) {
    if (!!e) {
      e.preventDefault();
    }

    $ionicViewSwitcher.nextDirection('back');

    if ($scope.successPasswordChange) {
      return false;

    } else {
      if ($scope.previousStateName) {
        $state.go($scope.previousStateName, $scope.previousStateParams);

      } else {
        navigateTo.home();
      }
    }
  }

  /**
   * Resets error state for the specified password
   * @param password
   */
  function removeErrors(password) {
    if ('current' == password && $scope.pm.hasError.current) {
      $scope.pm.display.current = defaultPasswordManagement.display.current;
      $scope.pm.hasError.current = defaultPasswordManagement.hasError.current;
      $scope.pm.labels.current = defaultPasswordManagement.labels.current;

    } else if ('new' == password && $scope.pm.hasError.new) {
      $scope.pm.display.new = defaultPasswordManagement.display.new;
      $scope.pm.hasError.new = defaultPasswordManagement.hasError.new;
      $scope.pm.labels.new = defaultPasswordManagement.labels.new;

    } else if ('newConfirm' == password && $scope.pm.hasError.newConfirm) {
      $scope.pm.display.newConfirm = defaultPasswordManagement.display.newConfirm;
      $scope.pm.hasError.newConfirm = defaultPasswordManagement.hasError.newConfirm;
      $scope.pm.labels.newConfirm = defaultPasswordManagement.labels.newConfirm;

    }
  }

  /**
   * Resets passwords and sets to hidden the passwords
   */
  function resetFormStates() {
    LoadingService.hide();
    $scope.pm.passwords = angular.copy(defaultPasswordManagement.passwords);
    $scope.pm.display = angular.copy(defaultPasswordManagement.display);
  }


  /**
   * Toggles password visibility
   * @param password
   */
  function togglePasswordVisibility(password) {
    if ('current' == password) {
      $scope.pm.display.current = !$scope.pm.display.current;

    } else if ('new' == password) {
      $scope.pm.display.new = !$scope.pm.display.new;

    } else if ('newConfirm' == password) {
      $scope.pm.display.newConfirm = !$scope.pm.display.newConfirm;

    }
  }


  /**
   * Builds the rules' based string to inform the user
   */
  function buildRules() {
    var rulesMessageMapper = {
      minDigit: dynamicMinDigit,
      minUppercase: dynamicMinUppercase,
      minLowercase: dynamicMinLowercase,
      minSpecial: dynamicMinSpecial
    };
    var message = [];
    var spanLength = '<span class="length">';

    // Always starts with the minimum length
    if ($scope.pm.passwordRules.minLength > 1) {
      $translate('OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.BE_AT_LEAST_MULTIPLE', {
        number: $scope.pm.passwordRules.minLength
      }).then(function (txt) {
        $scope.$broadcast('minLengthRetrieved', txt);
      });
      // spanLength += 'be at least ' + $scope.pm.passwordRules.minLength + ' characters, ';

    } else {
      $translate('OCF.PASSWORD.CHANGE.LEGEND.DYNAMIC.BE_AT_LEAST_SINGLE')
        .then(function (txt) {
          $scope.$broadcast('minLengthRetrieved', txt);
        });
      // spanLength += 'be at least one character long, ';
    }


    $scope.$on('minLengthRetrieved', finishStringBuild);


    function getPrepend(rule){
      var prepend='';

      switch ($translate.use()){
        case 'es':
          prepend = 'una ';
          if (rule === 'minDigit' || rule === 'minSpecial') {
            prepend = 'un ';
          }
          break;
        default:
        case 'en':
          prepend = 'a ';
          if (rule === 'minUppercase') {
            prepend = 'an ';
          }
          break;
      }
      return prepend;
    }

    //noinspection JSUnusedLocalSymbols
    /**
     * Builds dynamic string after retrieving i18n fragment
     * @param event
     * @param txt
     */
    function finishStringBuild(event, txt) {
      spanLength += txt;
      spanLength += '</span>';
      message.push(spanLength);

      // Recursively adds valid rules
      lodash.forEach($scope.pm.passwordRules, function (value, rule) {
        if (rule != 'minLength') {
          if (value) {
            var span = '<span class="' + rule.split("min")[1].toLocaleLowerCase() + '">';

            if (value > 1) {
              span += value + ' ' + rulesMessageMapper[rule] + 's';

            } else {
              var prepend = getPrepend(rule);
              span += prepend + rulesMessageMapper[rule];
            }

            span += '</span>';
            message.push(span);
          }
        }
      });

      message[1] = dynamicContainAtLeast + " " + message[1];
      message[message.length - 1] = dynamicAnd + " " + message[message.length - 1];

      var finalMessage = message.join(", ");
      finalMessage += ".";

      // converts it to string and copies it to the object that will be binded in the template
      $scope.pm.finalMessage = finalMessage;
      $scope.pm.noErrorsFinalMessage = angular.copy(finalMessage); // useful to recover string status on submit
    }

    // spanLength += '</span><br/>';
    // message.push(spanLength);
    //
    // // Recursively adds valid rules
    // lodash.forEach($scope.pm.passwordRules, function (value, rule) {
    //   if (rule != 'minLength') {
    //     if (value) {
    //       var span = '<span class="' + rule.split("min")[1].toLocaleLowerCase() + '">';
    //
    //       if (value > 1) {
    //         span += value + ' ' + rulesMessageMapper[rule] + 's';
    //
    //       } else {
    //         var prepend ="";
    //         if (rule != "minDigit"){
    //           prepend = 'a ';
    //
    //           if (rule === 'minUppercase') {
    //             prepend = 'an ';
    //           }
    //         }
    //         span += prepend + rulesMessageMapper[rule];
    //       }
    //       span += '</span>';
    //       message.push(span);
    //     }
    //   }
    // });
    //
    // message[1] = " " + message[1];
    // message[message.length - 1] = "and " + message[message.length - 1];
    //
    // message[0] = message[0] + message[1]+", ";
    // message.splice(1,1);
    // message[1] += ",<br/>";
    // var finalMessage = message.join(" ");
    // finalMessage += ".";
    //
    // // converts it to string and copies it to the object that will be binded in the template
    // $scope.pm.finalMessage = finalMessage;
    // $scope.pm.noErrorsFinalMessage = angular.copy(finalMessage); // useful to recover string status on submit
  }
}

angular.module('ocf.login', [
  'ui.router'
])

  .config(["$stateProvider", function config($stateProvider) {
    $stateProvider.state('ocf.login', {
      url: '/login',
      views: {
        "ocf": {
          controller: 'LoginController',
          templateUrl: 'login/templates/login.html'
        }
      },
      resolve: {},
      data: {}
    })
  }])

  .controller('LoginController', [
    '$scope',
    '$timeout',
    '$rootScope',
    'SessionService',
    'navigateTo',
    'ReplicationService',
    'LoadingService',
    'MessageService',
    'CouchDbConfig',
    'encode',
    'URLManager',
    '$resource',
    '$q',
    '$http',
    'DataLayerService',
    'StagingConfigurationService',
    '$ionicPlatform',
    'AutoLogoutPopupService',
    '$log',
    '$window',
    'lodash',
    'LoggingService',
    'OCFConfigurationService',
    'UserPreferenceService',
    '$translate',
    function ($scope,
              $timeout,
              $rootScope,
              SessionService,
              navigateTo,
              ReplicationService,
              LoadingService,
              MessageService,
              CouchDbConfig,
              encode,
              URLManager,
              $resource,
              $q,
              $http,
              DataLayerService,
              StagingConfigurationService,
              $ionicPlatform,
              AutoLogoutPopupService,
              $log,
              $window,
              _,
              LoggingService,
              OCFConfigurationService,
              UserPreferenceService,
              $translate) {

      $scope.goToPreviousState = goToPreviousState;
      var backupUsername = "Username";
      var backupPassword = "Password";

      $scope.form = {
        username: backupUsername,
        password: backupPassword

      };

      var deregisterGoToPreviousState;
      $scope.heightScreen = $window.screen.height;

      $scope.$on('$ionicView.beforeEnter', function () {
        deregisterGoToPreviousState = $ionicPlatform.registerBackButtonAction(goToPreviousState, 501);
        if ($window.localStorage.getItem('sessionExpired') === 'true') {
          $scope.autoLogoutPopup = AutoLogoutPopupService;

          $scope.autoLogoutPopup.create('', {scope: $scope})
            .then(function (success) {
              $log.debug(success);
              LoadingService.hide();
              $scope.autoLogoutPopup.open();
            })
            .catch(function (fail) {
              $log.error(fail);
            });
        }

        $translate([
          'OCF.LOGIN.USERNAME_PLACEHOLDER',
          'OCF.LOGIN.PASSWORD_PLACEHOLDER'
        ]).then(function (placeholders) {
          $scope.form.username = placeholders['OCF.LOGIN.USERNAME_PLACEHOLDER'];
          $scope.form.backupUsername = placeholders['OCF.LOGIN.USERNAME_PLACEHOLDER'];
          $scope.form.password = placeholders['OCF.LOGIN.PASSWORD_PLACEHOLDER'];
          $scope.form.backupPassword = placeholders['OCF.LOGIN.PASSWORD_PLACEHOLDER'];
        });
      });

      $scope.$on('$ionicView.beforeLeave', function () {
        $log.debug('$ionicView.beforeLeave');
        $ionicPlatform.offHardwareBackButton(goToPreviousState);
      });

      $scope.$on('$ionicView.afterEnter', function () {
        if ($scope.heightScreen < 480) {
          var usernameInputBlock = document.getElementById("usernameInput").getBoundingClientRect(); // top, right, bottom, left, width
          var passwordInputBlock = document.getElementById("passwordInput").getBoundingClientRect();
          var arrayInputs = ["usernameInput", "passwordInput"];

          for (var i = 0; i < arrayInputs.length; i++) {
            document.getElementById(arrayInputs[i]).addEventListener('touchend', function (element) {
              var $element = $(element.target);
              $timeout(function () {
                if ($element.attr('id') == "usernameInput") delete $scope.form.username;
                else delete $scope.form.password;
              }, 100);
            });
          }

          document.addEventListener('touchend', _onTouchEnd);

          function _onTouchEnd(event) {
            var touches = event.changedTouches[0]; // clientX, clientY

            // username
            if (_touchesInput(usernameInputBlock, touches)) {
              delete $scope.form.username;
            } else {
              $scope.form.username = backupUsername;
            }

            // password
            if (_touchesInput(passwordInputBlock, touches)) {
              delete $scope.form.password;
            } else {
              $scope.form.password = backupPassword;
            }
          }

          function _touchesInput(inputBoundaries, touches) {
            return inputBoundaries.left <= touches.clientX && inputBoundaries.right >= touches.clientX
              && inputBoundaries.top <= touches.clientY && inputBoundaries.bottom >= touches.clientY;
          }
        }
      });

      $scope.$on('$destroy', function () {
        $log.debug("$destroy");
        deregisterGoToPreviousState();
      });

      /**
       * Function that overrides the hardbackbutton behavior
       */
      function goToPreviousState(e) {
        if (!!e) {
          e.preventDefault();
        }
        return;
      }

      $scope.loginData = {};
      $scope.appVersion = "v";
      $scope.heightScreen = $window.screen.height;
      $scope.forgotPassword = forgotPassword;

      $rootScope.$on('appVersion', function (event, appVersion) {
        $scope.appVersion += appVersion;
      });

      $scope.doLogin = function () {
        MessageService.clear();
        // User name should be always lower case.

        if ($scope.loginData && $scope.loginData.username) {
          $scope.loginData.username = $scope.loginData.username.toLowerCase();
        }

        var successLoginInfo;
        var loginData = angular.copy($scope.loginData);

        LoadingService.show("verifying credentials");

        SessionService.login(loginData)
          .then(function (loginSuccess) {
            successLoginInfo = loginSuccess;

            //set the current user
            $rootScope.user = loginSuccess;
            $rootScope.userRecoverData = {};

            // Only supplier user could login into the app
            if ($rootScope.user.accountTypeId != 2) {
              throw {
                status: 500,
                message: 'The user is not a supplier user.',
                type: 'login'
              };
            }

            $scope.locations = $rootScope.user.locations;

            if (!$scope.locations || !$scope.locations[0].appLocations || $scope.locations[0].appLocations.length == 0) {
              throw {
                status: 500,
                message: 'The user does not have access to any application.',
                type: 'login'
              };
            }

            loginSuccess.username = loginSuccess.username.toUpperCase();

            LoadingService.hide();
            console.log("Logged into Zest's WS");

            if (loginSuccess) {
              SessionService.setUserData(loginSuccess);
            }

            LoggingService.logMessage(
              LoggingService.CONSTANTS.APP.OCF_LOGIN,
              LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
              'login',
              'User successfully logged in',
              'success',
              [{'key': 'user', 'value': JSON.stringify(loginSuccess)}]
            );
          })
          .then(function (applicationsSuccess) {
            var userData = SessionService.getUserData($rootScope.user.id);

            $scope.appsList = userData.locations;
            $rootScope.stagingConfiguration = undefined;

            return StagingConfigurationService.getStagingConfiguration();
          })
          .then(function (response) {
            LoadingService.hide();
            $rootScope.stagingConfiguration = response;

            return SessionService.clearCredentials();
          })
          .then(function () {
            SessionService.setCredentials(loginData, successLoginInfo);

            console.log("setting logged user");
            SessionService.setLoggedUserId($rootScope.user.id);

            //TODO: change the way to save this data
            SessionService.setUserApplications($scope.appsList);

            SessionService.setHeaderCommon();

            //call the WS to retrieve the list of apps available for the user
            return SessionService.getApplicationsList();

          })
          .then(function (applicationsSuccess) {
            $rootScope.appsList = applicationsSuccess;
            $rootScope.userRecoverData.appsList = $rootScope.appsList;
            return UserPreferenceService.getUserPreference($rootScope.user.id);
          })
          .then(function (response) {
            $rootScope.userConfiguration = response;

            if ($rootScope.userConfiguration.preferences.language != undefined) {
              $translate.use($rootScope.userConfiguration.preferences.language);
              switch ($rootScope.userConfiguration.preferences.language) {
                case 'es':
                  $rootScope.selectedLanguage = "Spanish";
                  break;
                case 'en':
                  $rootScope.selectedLanguage = "English";
                  break;
              }
            } else {
              $rootScope.selectedLanguage = "English";
              $translate.use('en');
            }
            return OCFConfigurationService.retrieveConfigs();
          })
          .then(function (ocfConfigs) {
            //Getting configuration
            $rootScope.ocfConfigs = ocfConfigs;

            $scope.checkDevice = !!ocfConfigs.filterAppListByDeviceModel;

            $rootScope.checkDevice = $scope.checkDevice;
            $rootScope.filterAppListByDeviceModel = $scope.filterAppListByDeviceModel;

            if ($scope.locations.length == 1) {
              $rootScope.selectedLocation = angular.copy($scope.locations[0]);

              $scope.subApps = [
                {
                  appName: "Shipping",
                  appCacheName: 'G10',
                  supportedDevice: /^TC7.+/
                },
                {
                  appName: "PutAway",
                  appCacheName: 'G04',
                  supportedDevice: /^MC92N0$/
                }
              ];

              var supplierApps = [];

              _.remove($scope.subApps, function (app) {
                return !_.find($rootScope.appsList, {"appName": app.appCacheName});
              });

              supplierApps = _.map($scope.subApps, 'appCacheName');

              $rootScope.apps = _.filter($rootScope.selectedLocation.appLocations, function (app) {
                return supplierApps.indexOf(app.application) != -1;
              });

              _.forEach($rootScope.apps, function (app, index) {
                var subApp = _.find($scope.subApps, {"appCacheName": app.application});
                $rootScope.apps[index].supportedDevice = subApp.supportedDevice;
              });

              if (!$scope.deviceModel && window.device) {
                $scope.deviceModel = window.device.model;
              }

              // Filters app that do not belong to the current Device
              if ($scope.deviceModel && $scope.checkDevice) _.remove($rootScope.apps, function (app) {
                var isValidApp = new RegExp(app.supportedDevice);
                return !$scope.deviceModel.match(isValidApp);
              });

              if ($rootScope.apps.length != 1) {
                if ($rootScope.apps.length) {
                  $log.debug('Login Screen - More than an app, going to app selection screen', JSON.stringify($rootScope.apps));
                  navigateTo.home();
                } else {
                  $log.debug('Login Screen - No apps available');
                  navigateTo.login();
                }

              } else {
                var availableApp = $rootScope.apps[0];
                var appIndex = _.findIndex($scope.subApps, {"appCacheName": availableApp.application});

                if (appIndex == -1) {
                  $log.debug('Login Screen - No valid app available for the current user');
                  $scope.userLogout();

                } else {
                  $scope.subApps[appIndex].selected = true;
                  $rootScope.app = angular.copy($scope.subApps[appIndex]);
                  $rootScope.app.appCacheName = $rootScope.app.appCacheName.toUpperCase();
                  $rootScope.isPilot = $rootScope.app.appName == "Shipping";
                  $rootScope.appLocationId = availableApp.idUUID;

                  LoggingService.logMessage(
                    LoggingService.CONSTANTS.APP.OCF_LOGIN,
                    LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
                    'auto_select_location',
                    'Only one location, skipping screen',
                    'success',
                    [{'key': 'location', 'value': JSON.stringify($rootScope.selectedLocation)}]
                  );

                  navigateTo[availableApp.application.toLowerCase()]();
                }
              }

            } else {
              LoggingService.logMessage(
                LoggingService.CONSTANTS.APP.OCF_LOGIN,
                LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
                'login',
                'Going to location selector',
                'success',
                {}
              );

              navigateTo.locationSelector();
            }
          })
          .catch(function (error) {
            if (!(error.type === 'remoteStorage' && error.status == 401)) {
              $log.error(error);

              switch (error.status) {
                case 0:
                  MessageService.addErrorMessage("No connection available", true);
                  break;
                case 99:
                  MessageService.addErrorMessage(error.message, true);
                  break;
                default:
                  var readableMessage = error.message + " (code: " + error.status + ")";
                  MessageService.addErrorMessage(readableMessage, true);
                  break;
              }

              LoggingService.logMessage(
                LoggingService.CONSTANTS.APP.OCF_LOGIN,
                LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
                'login',
                'Fail to login',
                'error',
                [
                  {'key': 'error', 'value': JSON.stringify(error)}
                ]
              );
            }
          })
          .finally(function () {
            LoadingService.hide();
            $scope.loginData = {};
          });
      };

      function forgotPassword() {
        LoggingService.logMessage(
          LoggingService.CONSTANTS.APP.OCF_LOGIN,
          LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
          'login',
          'Going to forgot password screen',
          'success',
          {}
        );
        navigateTo.forgotPassword();
      };

      $rootScope.$on('dataRecover', function () {

        var dataRecover = JSON.parse(window.localStorage.getItem("dataRecover"));

        var dataRecoverParam = dataRecover != undefined ? dataRecover : {};

        LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_DATA_RECOVERING, 'onDataRecover callback',
          'Checking if there is data to recover', 'success', [{
            'key': 'dataRecover',
            'value': JSON.stringify(dataRecoverParam)
          }], false);

        if (dataRecover && dataRecover.hasToRecover) {

          dataRecover.hasToRecover = false;

          var user = dataRecover.loginData.user;
          var userRecoverData = dataRecover.loginData.userRecoverData;

          if (user && userRecoverData) {

            $rootScope.user = angular.copy(user);

            user.username = user.username.toUpperCase();

            SessionService.setUserData(user);

            var currentTime = new Date().getTime();
            var pausedDate = new Date(dataRecover.createdDateTime).getTime();
            var logoutTimeoutMilliseconds = dataRecover.loginData.configuration.userInactivityTimeout;
            var timeout = !!logoutTimeoutMilliseconds ? logoutTimeoutMilliseconds : 0;

            $rootScope.stagingConfiguration = dataRecover.loginData.configuration;

            timeout = pausedDate + timeout;

            // User should be logged out as the timeout for background has ended.
            if (currentTime >= timeout) {
              LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_DATA_RECOVERING, 'onDataRecover callback',
                'User should be logged out as the timeout for background has ended', 'success', [{
                  'key': 'dataRecover',
                  'value': JSON.stringify(dataRecover)
                },
                  {'key': 'logoutTimeoutMilliseconds', 'value': logoutTimeoutMilliseconds}], false);

              window.localStorage.setItem("dataRecover", JSON.stringify({}));

              $rootScope.$emit('logout', true);
            } else {
              LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_DATA_RECOVERING, 'onDataRecover callback',
                'Has to recover', 'success', [{'key': 'dataRecover', 'value': JSON.stringify(dataRecover)}], false);

              var selectedLocation = dataRecover.loginData.selectedLocation;
              var selectedApp = dataRecover.loginData.selectedApp;
              var selectedLanguage = dataRecover.loginData.selectedLanguage;
              var locations = dataRecover.loginData.locations;
              var apps = dataRecover.loginData.apps;
              var checkDevice = dataRecover.loginData.checkDevice;
              var filterAppListByDeviceModel = dataRecover.loginData.filterAppListByDeviceModel;
              var userConfiguration = dataRecover.loginData.userConfiguration;

              delete dataRecover.loginData;
              delete dataRecover.hasToRecover;
              delete dataRecover.createdDateTime;

              window.localStorage.setItem("dataRecover", JSON.stringify(dataRecover));

              $rootScope.userRecoverData = userRecoverData;
              $rootScope.appsList = userRecoverData.appsList;
              $rootScope.userConfiguration = userConfiguration;

              $rootScope.ocfConfigs = {
                filterAppListByDeviceModel: filterAppListByDeviceModel
              };

              SessionService.clearCredentials().then(function () {

                var loginData = {
                  username: user.username
                };

                SessionService.setCredentials(loginData, user);
                SessionService.setLoggedUserId(user.id);
                SessionService.setUserApplications(userRecoverData.appsList);
                SessionService.setHeaderCommon();
              });

              $rootScope.selectedLanguage = selectedLanguage;

              if (!selectedLanguage) {
                $rootScope.selectedLanguage = "English";
                $translate.use('en');
              }

              if (selectedLocation || locations.length == 1) {

                var locToSelect = selectedLocation;

                if (!selectedLocation) {
                  locToSelect = locations[0];
                }

                $rootScope.selectedLocation = angular.copy(locToSelect);

                $scope.subApps = [
                  {
                    appName: "Shipping",
                    appCacheName: 'G10',
                    supportedDevice: /^TC7.+/
                  },
                  {
                    appName: "PutAway",
                    appCacheName: 'G04',
                    supportedDevice: /^MC92N0$/
                  }
                ];

                var supplierApps = [];

                _.remove($scope.subApps, function (app) {
                  return !_.find($rootScope.appsList, {"appName": app.appCacheName});
                });

                supplierApps = _.map($scope.subApps, 'appCacheName');

                $rootScope.apps = _.filter($rootScope.selectedLocation.appLocations, function (app) {
                  return supplierApps.indexOf(app.application) != -1;
                });

                _.forEach($rootScope.apps, function (app, index) {
                  var subApp = _.find($scope.subApps, {"appCacheName": app.application});
                  $rootScope.apps[index].supportedDevice = subApp.supportedDevice;
                });

                if (!$scope.deviceModel && window.device) {
                  $scope.deviceModel = window.device.model;
                }

                // Filters app that do not belong to the current Device
                if ($scope.deviceModel && checkDevice) _.remove($rootScope.apps, function (app) {
                  var isValidApp = new RegExp(app.supportedDevice);
                  return !$scope.deviceModel.match(isValidApp);
                });

                if ($rootScope.apps.length != 1 && !selectedApp) {
                  if ($rootScope.apps.length) {
                    $log.debug('Login Screen - More than an app, going to app selection screen', JSON.stringify($rootScope.apps));
                    navigateTo.home();
                  } else {
                    $log.debug('Login Screen - No apps available');
                    navigateTo.login();
                  }

                } else {

                  var selectedAppIndex = selectedApp != undefined ? _.findIndex($rootScope.apps, {"application": selectedApp.appCacheName}) : 0;

                  if(selectedAppIndex != -1) {
                    $rootScope.app = $rootScope.apps[selectedAppIndex];
                  } else {
                    $rootScope.app = $rootScope.apps[0];
                  }

                  var availableApp = $rootScope.app;
                  var appIndex = _.findIndex($scope.subApps, {"appCacheName": availableApp.application});

                  if (appIndex == -1) {
                    $log.debug('Login Screen - No valid app available for the current user');
                    $scope.userLogout();

                  } else {
                    $scope.subApps[appIndex].selected = true;
                    $rootScope.app = angular.copy($scope.subApps[appIndex]);
                    $rootScope.app.appCacheName = $rootScope.app.appCacheName.toUpperCase();
                    $rootScope.isPilot = $rootScope.app.appName == "Shipping";
                    $rootScope.appLocationId = availableApp.idUUID;

                    LoggingService.logMessage(
                      LoggingService.CONSTANTS.APP.OCF_LOGIN,
                      LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
                      'auto_select_location',
                      'Only one location, skipping screen',
                      'success',
                      [{'key': 'location', 'value': JSON.stringify($rootScope.selectedLocation)}]
                    );

                    navigateTo[availableApp.application.toLowerCase()]();
                  }
                }

              } else {
                LoggingService.logMessage(
                  LoggingService.CONSTANTS.APP.OCF_LOGIN,
                  LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
                  'login',
                  'Going to location selector',
                  'success',
                  {}
                );

                navigateTo.locationSelector();
              }
            }
          } else {
            $rootScope.$broadcast('checkNewVersion');
          }
        } else {
          $rootScope.$broadcast('checkNewVersion');
        }
      });

    }
  ])

;

angular
  .module('ocf.services')
  .service('ScanService', ScanService);

ScanService.$inject = ['$rootScope', '$timeout'];

function ScanService($rootScope, $timeout) {

  var ss = this;

  ss.initialize = initialize;

  /**
   * Initializes the scan and sets the activity to send the intent to
   * @param activityName
   */
  function initialize(activityName) {

    console.log(window.datawedge);

    if (window.datawedge) {

      var activity = activityName ? activityName : "com.bluefletch.motorola.datawedge.ACTION"; //default activity name

      console.log(activityName);

      datawedge.start();

      $timeout(function () {

        datawedge.registerForBarcode(function (data) {

          console.log("dataWedgeScan - broadcast");
          $rootScope.$broadcast('dataWedgeScan', data.barcode);

        });

      }, 300)

    }
  }

  return ss;
}


angular
  .module('ocf.services')
  .service('SampleDefinitionService', SampleDefinitionService);

SampleDefinitionService.$inject = ['lodash', 'SessionService', '$rootScope'];

function SampleDefinitionService(lodash, SessionService, $rootScope) {
  var cleanDataModel = {
    isBulkInfo: false,
    groups: [],
    screens: {
      pictures: {
        display: false,
        title: ""
      },
      dataContainer: []
    }
  };

  var dataModel = {
    ds: angular.copy(cleanDataModel)
  };



  dataModel.getSampleDefinitionId = function (product) {

    var configObject = SessionService.ocfManager.getApplicationConfig($rootScope.selectedLocation.locationId, $rootScope.app.appCacheName).config;

    //match the productProfile-sampleDefinition pair with the corresponding sampleDefinition
    if (configObject.lots[0] && configObject.lots[0] && configObject.lots[0].profileLocation && configObject.lots[0].profileLocation.length) {
      var profileLocation =  lodash.find(configObject.lots[0].profileLocation, function (pl) {
        return pl.produceProfileId == product.id;
      });
    }

    if (profileLocation){
      return profileLocation.sampleDefinitionId;
    }
  }

  dataModel.dynamicDataStructure = function (product) {

    var configObject = {};

    configObject = SessionService.ocfManager.getApplicationConfig($rootScope.selectedLocation.locationId, $rootScope.app.appCacheName).config;
    var gc = [];

    //match the productProfile-sampleDefinition pair with the corresponding sampleDefinition
    if (configObject.attributes.length) {
      gc = lodash.find(configObject.attributes, function (attribute) {
        return attribute.sampleDefinitionId == product.sampleDefinitionId;
      });
    }

    var dataObj = {
      title: '',
      group: '',
      name: '',
      value: '',
      screen: '',
      validity: {},
      reference: '',
      default: '',
      adjusted: false,
      optional: false
    };

    var acceptedValidityTypes = ["_enum", "_limit", "range", "enum", 'Eol'];
    var subgroupIndexer = {};
    dataModel.ds.data = [];

    ////for each attribute group, make a new screen/tab
    //for (var i = 0; i < gc.values.length; i++) {
    var screen = gc;

    if (typeof screen.ispicturegroup == "undefined") {
      $rootScope.$broadcast('noAttributes');
      return;
    }

    dataModel.ds.header = {};

    // Picture Screen is defined in the controller after this data initialization
    if (!screen.ispicturegroup) {

      for (var j = 0; j < screen.values.length; j++) {

        var value = screen.values[j];
        var vType = value.type;
        var _index = vType.indexOf("_");
        var valueType = _index !== -1 ? vType.substr(_index).toLocaleLowerCase() : vType.toLocaleLowerCase();
        var data = angular.copy(dataObj);
        var vName = value.name;
        var reference = value.reference;
        var default_value = value.default;
        var options = value.options;

        var s = undefined;
        var adjustedValue = undefined;
        var mode = undefined;
        var isPercentage = false;
        var isOptional = false;

        if (options !== undefined) {
          evalOptions(options);
        }


        if (acceptedValidityTypes.indexOf(valueType) === -1) {
          // count or text
          // Considers the type as a parent of _enum and _limit types
          if (typeof subgroupIndexer[valueType] === "undefined") {
            subgroupIndexer[valueType] = 0;
          }
          data.title = vName;
          data.group = valueType;
          data.name = valueType + "_0";
          data.validity.type = "relatives";
          data.default = default_value;
          data.optional = isOptional;

          //TEMPORAL CODE FOR EOL SUPPORT
          if (valueType == "eol") {

            data.validity.type = "enum";
            data.isEol = true;
            data.eolChecked = false;
            data.validity.options = [
              {"value": "No"},
              {"value": "Yes"}];

            data.reasons = value.descriptors;

            lodash.forEach(data.reasons, function (reason) {
              if (reason.value == data.default) {
                reason.selected = true;
              }
            });

          }

          //if (s != undefined && previousSamples.length > 0) {
          //  data.value = calculateAvg(s, data.name);
          //}
          //else
          if (default_value !== undefined) {
            data.value = Number(default_value);
          }

          if (dataModel.ds.groups.indexOf(valueType) === -1) {
            this.ds.groups.push(valueType);
          }
          dataModel.ds.data.push(data);

        } else if (_index !== -1) {
          // _enum or _limit
          var groupCategory = vType.substr(0, _index).toLocaleLowerCase();

          //check if it needs to add a new index for the group
          if (typeof subgroupIndexer[groupCategory] === "undefined") {
            subgroupIndexer[groupCategory] = 0;
          }

          if (valueType === "_enum") {

            for (var k = 0; k < value.descriptors.length; k++) {
              addEnums(value.descriptors[k].value, ++subgroupIndexer[groupCategory], groupCategory, valueType, reference, value.descriptors[k].default, adjustedValue, s);
            }

          } else {
            data.title = vName;
            //data.screen = screenIndex;
            data.group = groupCategory;
            data.name = groupCategory + "_" + ++subgroupIndexer[groupCategory];
            data.validity.type = valueType;
            data.reference = reference;
            data.default = default_value;
            data.optional = isOptional;
            //
            //if (s != undefined && previousSamples.length > 0) {
            //  data.value = calculateAvg(s, data.name);
            //}
            //else
            if (default_value !== undefined) {
              data.value = Number(default_value);
            }

            dataModel.ds.data.push(data);
          }

        } else {
          data.title = vName;
          //data.screen = screenIndex;
          data.group = "";
          data.name = vName.toLocaleLowerCase();
          data.validity.type = valueType;
          data.optional = isOptional;

          if (valueType == "enum") {
            //enum
            data.validity.options = value.descriptors;

            //if (s != undefined && previousSamples.length > 0) {
            //  data.value = calculateEnumAvg(s, data.name, value.descriptors, mode);
            //}
            //else
            if (default_value !== undefined) {
              data.value = default_value;
            }

          } else {
            //range

            //if (s != undefined && previousSamples.length > 0) {
            //  data.value = calculateAvg(s, data.name);
            //}
            //else
            if (default_value !== undefined) {
              data.value = Number(default_value);
            }

            data.validity.percentage = isPercentage;

            data.validity.range = value.descriptors;
          }

          dataModel.ds.data.push(data);
        }
      }
    }

    /**
     * Eval the given options and set the corresponding parameters
     * @param options
     */
    function evalOptions(options) {

      if (options !== undefined) {

        options.forEach(function (option) {

          var opt = option.split(' ');

          if (opt[0] === 'avg' || opt[0] === 'mode') {
            mode = opt[0];
            s = opt[1];
          }

          if (opt[0] === 'adjust') {
            adjustedValue = opt[1];
          }

          if (opt[0] === 'percentage') {
            isPercentage = true;
          }

          if (opt[0] === 'optional') {
            isOptional = true;
          }

        });
      }
    }

    /**
     * Calculates the average of the given family value using s amount of previous samples
     * @param s
     * @param family
     * @returns {number}
     */
    function calculateAvg(s, family) {

      var total = 0;

      previousSamples.sort(function (a, b) {
        return (new Date(b.creationDate)).getTime() - (new Date(a.creationDate)).getTime()
      });

      for (var i = 0; i <= Math.min(s - 1, previousSamples.length - 1); i++) {
        for (var j = 0; j <= previousSamples[i].properties.length - 1; j++) {
          if (previousSamples[i].properties[j].family !== undefined && previousSamples[i].properties[j].family === family) {
            total = total + previousSamples[i].properties[j].value;
          }
        }
      }

      return Math.round(total / (Math.min(s, previousSamples.length)));
    }

    /**
     * Calculates the average of the given family value using s amount of previous samples
     * @param s
     * @param family
     * @param descriptors
     * @param mode
     * @returns {*}
     */
    function calculateEnumAvg(s, family, descriptors, mode) {

      var i = 0, j = 0, total = 0;
      var totals = [];

      previousSamples.sort(function (a, b) {
        return (new Date(b.creationDate)).getTime() - (new Date(a.creationDate)).getTime()
      });

      //assign a value from 1 to descriptors.length to each enum list's member , then calculates the avg using this value
      if (mode === 'avg') {

        for (i = 0; i <= Math.min(s - 1, previousSamples.length - 1); i++) {
          for (j = 0; j <= previousSamples[i].properties.length - 1; j++) {
            if (previousSamples[i].properties[j].family !== undefined && previousSamples[i].properties[j].family === family) {
              total = total + lodash.findIndex(descriptors, {"value": previousSamples[i].properties[j].value}) + 1;
            }
          }
        }

        return Math.round(total / (Math.min(s, previousSamples.length))) - 1;

      }

      //looks for the most used enum list's member
      if (mode === 'mode') {

        for (i = 0; i <= Math.min(s - 1, previousSamples.length - 1); i++) {
          for (j = 0; j <= previousSamples[i].properties.length - 1; j++) {
            if (previousSamples[i].properties[j].family !== undefined && previousSamples[i].properties[j].family === family) {
              if (totals.map(function (e) {
                  return e[0];
                }).indexOf(previousSamples[i].properties[j].value) == -1) {
                totals.push([previousSamples[i].properties[j].value, 1]);
              }
              else {
                totals[totals.map(function (e) {
                  return e[0];
                }).indexOf(previousSamples[i].properties[j].value)][1]++;
              }
            }
          }
        }

        totals.sort(function (a, b) {
          return b[1] - a[1]
        });
        return lodash.findIndex(descriptors, {"value": totals[0][0]});

      }

    }

    /**
     * Adds an enum value
     * @param value
     * @param groupIndex
     * @param groupCategory
     * @param valueType
     * @param reference
     * @param default_value
     * @param adjustedValue
     * @param s
     */
    function addEnums(value, groupIndex, groupCategory, valueType, reference, default_value, adjustedValue, s) {
      var data = angular.copy(dataObj);
      data.title = value;
      //data.screen = screenIndex;
      data.group = groupCategory;
      data.name = groupCategory + "_" + groupIndex;
      data.validity.type = valueType;
      data.reference = reference;
      data.default = default_value;

      //if (s != undefined && previousSamples.length > 0) {
      //  data.value = calculateAvg(s, data.name);
      //}
      //else
      if (default_value !== undefined) {
        data.value = Number(default_value);
      }

      if (value === adjustedValue) {
        data.adjusted = true;
      }

      dataModel.ds.data.push(data);
    }

  };

  dataModel.getInitialStructure = function (product) {

    this.dynamicDataStructure(product);
    return dataModel.ds;
  };

  dataModel.clearDataModel = function () {
    dataModel.ds = angular.copy(cleanDataModel);
  };

  return dataModel;
}


angular
  .module('ocf.services')
  .service('InputValidationService', InputValidationService);

InputValidationService.$inject = ['$rootScope'];

function InputValidationService() {

  var cs = this;

  cs.isValidInputTag = isValidInputTag;
  cs.isValidScannedTag = isValidScannedTag;
  cs.setMask = setMask;
  cs.setParameters = setParameters;
  cs.removeMask = removeMask;
  cs.isLongScan = isLongScan;
  cs.isShortScan = isShortScan;
  cs.tagMask = undefined;
  cs.tagShortMask = undefined;
  cs.tagValidFormat = undefined;

  function setParameters(tagMask, tagShortMask, tagValidFormat) {
    this.tagMask = tagMask;
    this.tagShortMask = tagShortMask;
    this.tagValidFormat = tagValidFormat;
  }

  function isValidInputTag(value) {

    var isLongFormat = value && value.length == 24 && (value.indexOf(this.tagMask) == 0);
    var isShortFormat = value && value.length == 8;

    return (this.tagValidFormat == 'long' && isLongFormat) || (this.tagValidFormat == 'short' && isShortFormat)
      || (this.tagValidFormat == 'short-long' && (isLongFormat || isShortFormat));
  }

  function isValidScannedTag(value) {

    var isLongFormat = value && value.length == 24 && (value.indexOf(this.tagMask) == 0);
    var isShortFormat = value && value.length == (8 + this.tagShortMask.length) && (value.indexOf(this.tagShortMask) == 0);

    return (this.tagValidFormat == 'long' && isLongFormat) || (this.tagValidFormat == 'short' && isShortFormat)
      || (this.tagValidFormat == 'short-long' && (isLongFormat || isShortFormat));
  }

  function setMask(value) {

    var isScannedShortFormat = value && value.length == (8 + this.tagShortMask.length) && (value.indexOf(this.tagShortMask) == 0);
    var isInputShortFormat = value && value.length == 8;

    if(isInputShortFormat) {
      return this.tagMask + value;
    } else if(isScannedShortFormat) {
      return this.tagMask + this.removeMask(value);
    } else {
      return value;
    }
  }

  function removeMask(value) {
    return value.substr(-8);
  }

  function isLongScan(value) {
    return (value && value.length == 24 && (value.indexOf(this.tagMask) == 0));
  }

  function isShortScan(value) {
    return (value && value.length == (8 + this.tagShortMask.length) && (value.indexOf(this.tagShortMask) == 0));
  }

  return cs;
}

angular
  .module('ocf.services')
  .service('DataLayerService', DataLayerService);

DataLayerService.$inject = ['$q', 'ConfigurationService', '$window', '$log', 'CouchDbConfig', '$rootScope', 'SessionService'];

function DataLayerService($q, ConfigurationService, $window, $log, CouchDbConfig, $rootScope, SessionService) {

  var dls = this;
  var config = ConfigurationService.getLoggedUserConfig();
  var coax = require("coax");

  dls.db = {};
  dls.dbName = "";

  var service = {
    initialize: initialize,
    getAllDocuments: getAllDocuments,
    getDocument: getDocument,
    addDocument: addDocument,
    updateDocument: updateDocument,
    removeDocument: removeDocument,
    addAttachment: addAttachment,
    getAttachment: getAttachment,
    getLocalUrl: getLocalUrl,
    removeAttachment: removeAttachment,
    compact: compact,
    purge: purge,
    sync: sync,
    stopSync: stopSync
  };

  return service;

  function initialize() {
    var q = $q.defer();
    if (config && config.dbName) {
      dls.dbName = config.dbName + $rootScope.user.id;

      if (config.usePouchDB) {
        if (angular.equals(dls.db, {}) || typeof dls.db !== "undefined") {
          var adapter = $window.sqlitePlugin ? {adapter: 'websql'} : {};
          dls.db = new PouchDB(config.dbName, adapter);

          q.resolve();

          //TODO: uncomment this to allow pouchDB sync with Sync Gateway NOT WORKING
          //if(config.autoSync){
          //  $log.debug("Sync enabled");
          //  sync();
          //}
        }
      }
      else {
        function setupConfig(done) {
          // check if CBLite is available
          if (!$window.cblite) {
            return done('Couchbase Lite not installed');
          }

          //get the CBL server url
          cblite.getURL(function (err, url) {
            if (err) {
              return done(err);
            }
            //set the url for coax

            url = url.replace('localhost', '127.0.0.1');

            $window.server = coax(url);

            var db = coax([url, dls.dbName]);
            setupDb(db, function (err, info) {
              if (err) {
                return done(err);
              }
              dls.db = db;
              config.localServerUrl = url;
              config.localDbUrl = url + dls.dbName;
              return done(null, info);
            })
          });

          function setupDb(db, cb) {
            db.get(function (err, res) {
              //couldn't find the db, will try to create
              if (err) {
                if (err.status == 404) {
                  db.put(function (err) {
                    if (err) {
                      return cb(err);
                    }
                    db.get(cb);
                  })
                }
                else {
                  //uncaptured error
                  return cb(err);
                }
              }
              else {
                return cb(null, res);
              }
            })
          }
        }

        setupConfig(function (err, info) {
          if (err) {
            return $log.debug("error: " + JSON.stringify(err));
          }
          else {
            $log.debug("Database created correctly" + info);
            q.resolve();

            if (config.autoSync) {
              $log.debug("Sync enabled");
              sync();
            }
          }
        });
      }
    }
    else {
      $log.debug("error: could not initialize db");
      q.reject();
    }
    return q.promise;
  }


  function getAllDocuments() {
    var q = $q.defer();
    if (config.usePouchDB) {
      dls.db.allDocs({include_docs: true})
        .then(function (docs) {
          $log.debug("All docs retreived");
          q.resolve(docs);
        })
        .catch(function (err) {
          $log.debug("Error retreiving all docs");
          q.reject(err);
        })
    }
    else {
      dls.db.get(['_all_docs', {'include_docs': 'true'}], function (err, docs) {
        if (!err) {
          $log.debug("All docs retreived");
          q.resolve(docs);
        }
        else {
          $log.debug("Error retreiving all docs");
          q.reject(err);
        }
      })
    }

    return q.promise;
  }

  function getDocument(documentId) {
    var q = $q.defer();
    dls.db.get(documentId, function (err, doc) {
      if (!err) {
        q.resolve(doc);
      }
      else {
        q.reject(err);
      }
    });

    return q.promise;
  }

  function addDocument(doc) {
    var q = $q.defer();
    dls.db.post(doc, function (err, ok) {
      if (!err) {
        $log.debug("Doc added: " + ok);
        q.resolve(ok.id);
      }
      else {
        $log.debug("Error adding doc: " + err);
        q.reject(err);
      }
    });

    return q.promise;
  }

  function updateDocument(doc) {
    var q = $q.defer();
    if (config.usePouchDB) {
      getDocument(doc._id)
        .then(function (DBdoc) {
          return dls.db.put(doc, DBdoc._id, DBdoc._rev)
        })
        .then(function (success) {
          $log.debug("Updating doc success: " + success);
          q.resolve(success);
        })
        .catch(function (err) {
          $log.debug("Updating doc failure: " + err);
          q.reject(err);
        })
    }
    else {
      dls.db.put(doc._id, doc, function (err, ok) {
        if (!err) {
          $log.debug("Updating doc success: " + ok);
          q.resolve(ok);
        }
        else {
          $log.debug("Updating doc failure: " + err);
          q.reject(err);
        }
      });
    }
    return q.promise;
  }

  function removeDocument(documentId) {
    var q = $q.defer();
    getDocument(documentId)
      .then(function (doc) {
        doc._deleted = true;
        return updateDocument(doc);
      })
      .then(function (success) {
        $log.debug("Removing doc success: " + success);
        q.resolve(success);
      })
      .catch(function (err) {
        $log.debug("Removing doc failure: " + err);
        q.reject(err);
      });

    return q.promise;
  }

  function addAttachment(documentId, attachment) {
    var q = $q.defer();
    dls.db.get(documentId, function (err, doc) {
      doc._attachments = attachment;
      doc.last_revision = new Date().getTime();

      dls.db.put(documentId, doc, function (err, ok) {
        if (!err) {
          $log.debug("Adding attachment success: " + ok);
          q.resolve();
        }
        else {
          $log.debug("Adding attachment failure: " + err);
          q.reject(err);
        }
      })
    });
    return q.promise;
  }

  function getAttachment(documentId) {
    var q = $q.defer();
    dls.db.get([documentId, {"attachments": "true"}], function (err, doc) {
      if (!err) {
        $log.debug("Retrieving attachment success: " + doc);
        q.resolve(doc._attachments.attachment.data);
        //q.resolve(doc);
      }
      else {
        $log.debug("Retrieving attachment failure: " + err);
        q.reject(err);
      }
    });
    return q.promise;
  }

  function getLocalUrl() {
    return config.localDbUrl || "";
  }

  function removeAttachment(documentId, attachmentName) {
    var q = $q.defer();
    dls.db.get(documentId, function (err, doc) {
      if (!err) {
        delete doc._attachments[attachmentName];
        updateDocument(doc)
          .then(function (success) {
            $log.debug("Removing attachment success: " + success);
            q.resolve();
          })
          .catch(function (error) {
            $log.debug("Removing attachment failure: " + success);
            q.reject(error);
          })
      }
      else {
        q.reject(err);
      }
    });
    return q.promise;
  }

  function compact() {
    var q = $q.defer();

    if (config.usePouchDB) {
      dls.db.compact().then(function (info) {
        $log.debug('Compact result: ' + info.toString());
        q.resolve(info);
      }).catch(function (err) {
        $log.debug('Compact failed: ' + err.toString());
        q.reject(err);
      });
    }
    else {
      dls.db.post(['_compact'], function (err, ok) {
        if (!err) {
          $log.debug('Compact result: ' + ok);
          q.resolve(ok);
        }
        else {
          $log.debug('Compact failed: ' + err);
          q.reject(err);
        }
      })
    }

    return q.promise;
  }

  function purge() {
    var q = $q.defer();
    if (!config.usePouchDB) {
      dls.db.post(['_purge'], function (err, ok) {
        if (!err) {
          $log.debug('Purge result: ' + ok);
          q.resolve(ok);
        }
        else {
          $log.debug('Purge failed: ' + err);
          q.reject(err);
        }
      })
    }
    else {
      $log.debug("Purge not available in PouchDB");
      q.reject("Purge not available in PouchDB");
    }

    return q.promise;
  }

  function sync() {

    if (config.usePouchDB && dls.db.prefix && dls.db.prefix == "_pouch_") {
      if (config.replicateToCouchDB) {

        //TODO: once the login is in place, there should be a cookie to use for authentication
        var cHost = CouchDbConfig.host.split("//");
        var cdb = cHost[0] + "//" + config.username + ":" + config.password + "@" + cHost[1];

        //TODO: once the login is in place, set the correct replication target
        dls.db.replicate.to(cdb + "lotqc_" + config.organizationId,
          {
            live: true
          }).on('error', function (err) {
          $log.debug("Error replicating to CouchDB: " + err);
        });
      }
      else {
        //TODO: once the login is in place, verify the replication parameters
        dls.db.sync(config.syncUrl, {live: true}).on('error', function (err) {
          $log.debug("Error replicating to SG: " + err);
        });
      }
    }
    else {
      triggerSync(function (res) {
        $log.debug("Synced:" + res);
      })
    }

    function triggerSync(cb) {

      var push = {
        source: {
          url: dls.dbName
        },
        target: {
          url: config.syncUrl,
          "headers": {
            "Cookie": 'SyncGatewaySession=' + SessionService.getZestSessionId()
          }
        },
        continuous: true
      };
      var pull = {
        target: dls.dbName,
        source: {
          url: config.syncUrl,
          "headers": {
            "Cookie": 'SyncGatewaySession=' + SessionService.getZestSessionId()
          }
        },
        continuous: true
      };

      dls.pushSync = syncManager(config.localServerUrl, push);
      dls.pullSync = syncManager(config.localServerUrl, pull);

      //push sync catchs
      dls.pushSync.on("error", function (err) {
        $log.debug(err);
      });
      dls.pushSync.on("connected", function () {
        dls.pullSync.start();
      });

      //pull sync catchs
      dls.pullSync.on("error", function (err) {
        $log.debug(err);
      });
      dls.pullSync.on("connected", function () {
        cb(true);
      });
      // setTimeout(function(){
      dls.pushSync.start();
      // }, 10000)
    }

    function syncManager(serverUrl, syncDefinition) {
      var handlers = {};

      function callHandlers(name, data) {
        (handlers[name] || []).forEach(function (h) {
          h(data);
        })
      }

      function doCancelPost(cb) {
        var cancelDef = JSON.parse(JSON.stringify(syncDefinition));
        cancelDef.cancel = true;
        coax.post([serverUrl, "_replicate"], cancelDef, function (err, info) {
          if (err) {
            callHandlers("error", err);
            if (cb) {
              cb(err, info);
            }
          } else {
            callHandlers("cancelled", info);
            if (cb) {
              cb(err, info);
            }
          }
        })
      }

      function doStartPost() {
        var tooLate;

        function pollForStatus(info, wait) {
          if (wait) {
            setTimeout(function () {
              tooLate = true;
            }, wait)
          }
          processTaskInfo(info.session_id, function (done, err) {
            if (!done && !tooLate) {
              setTimeout(function () {
                pollForStatus(info);
              }, 5000)
            } else if (tooLate) {
              callHandlers("error", "timeout");
            }
          })
        }

        var callBack;
        if (syncDefinition.continuous) {
          callBack = function (err, info) {
            //$log.debug("continuous sync callBack", err, info, syncDefinition);
            if (err) {
              callHandlers("error", err);
            } else {
              pollForStatus(info, 10000);
              callHandlers("started", info);
            }
          }
        } else { // non-continuous
          callBack = function (err, info) {
            //$log.debug("sync callBack", err, info, syncDefinition);
            if (err) {
              if (info.status == 401) {
                err.status = info.status;
                callHandlers("auth-challenge", err);
              } else {
                err.status = info.status;
                callHandlers("error", err);
              }
            } else {
              callHandlers("connected", info);
            }

          }
        }
        //$log.debug("start sync" + JSON.stringify(syncDefinition));
        coax.post([serverUrl, "_replicate"], syncDefinition, callBack);
      }

      function processTaskInfo(id, cb) {
        taskInfo(id, function (err, task) {
          if (err) {
            return cb(true, err);
          }
          //check that the task exists
          else if (angular.equals(task, {})) {
            return cb(true, "no task");
          }

          publicAPI.task = task;
          if (task.error && task.error[0] == 400) {
            cb(true, task.error);
            callHandlers("error", {status: 400, error: task.error[1]})
          } else if (task.error && task.error[0] == 401) {
            cb(true, task.error);
            callHandlers("auth-challenge", {status: 401, error: task.error[1]})
          } else if (task.error && task.error[0] == 502) {
            cb(true, task.error);
            callHandlers("auth-challenge", {status: 502, error: task.error[1]})
          } else if (task.status == "Idle" || task.status == "Stopped" || (/Processed/.test(task.status) && !/Processed 0/.test(task.status))) {
            cb(true);
            callHandlers("connected", task)
          } else if (/Processed 0 \/ 0 changes/.test(task.status)) {
            cb(false); // keep polling? (or does this mean we are connected?)
            //cb(true)
            callHandlers("connected", task)
          } else {
            $log.debug("not done")
            cb(false); // not done
          }


        })
      }

      function taskInfo(id, cb) {
        //get the active tasks (replications processes alive)
        coax([serverUrl, "_active_tasks"], function (err, tasks) {
          var me = {};
          for (var i = tasks.length - 1; i >= 0; i--) {
            if (tasks[i].task == id) {
              me = tasks[i];
            }
          }
          cb(false, me);
        })
      }

      var publicAPI = {
        start: doStartPost,
        cancel: doCancelPost,
        on: function (name, cb) {
          handlers[name] = handlers[name] || [];
          handlers[name].push(cb);
        }
      };
      return publicAPI;
    }
  }

  function stopSync() {
    if (dls.pullSync && dls.pushSync) {
      dls.pullSync.cancel();
      dls.pushSync.cancel();
    }
  }

}

angular
  .module('ocf.services')
  .service('ConfigurationService', ConfigurationService);

ConfigurationService.$inject = ['$rootScope', 'CouchBaseConfig', 'URLManager', 'EnvironmentConfig'];

function ConfigurationService($rootScope, CouchBaseConfig, URLManager, EnvironmentConfig) {

  var cs = this;

  cs.getLoggedUserConfig = getLoggedUserConfig;
  cs.setLoggedUserConfig = setLoggedUserConfig;

  function setLoggedUserConfig(userId, configObject) {
    //TODO
  }

  function getLoggedUserConfig() {
    //TODO: return a real config
    /*********************************************************************************
    /* WARNING, CBLite databases names should always begin with a lowercase letter  **
    *********************************************************************************/
    return {
      "dbName": "user_",
      "syncUrl": CouchBaseConfig.host + CouchBaseConfig.name, //sync gateway url
      "usePouchDB": true,
      "autoSync": true,
      "tagMask": ['330C4DE261100280']
    };
  }



  return cs;
}

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

angular
  .module('ocf.controllers')
  .controller('LocationSelectorController', LocationSelectorController);

LocationSelectorController.$inject = [
  '$scope',
  'SessionService',
  'navigateTo',
  '$rootScope',
  'lodash',
  '$log',
  'LoggingService',
  '$translate',
  'LoadingService'
];

function LocationSelectorController($scope,
                                    SessionService,
                                    navigateTo,
                                    $rootScope,
                                    _,
                                    $log,
                                    LoggingService,
                                    $translate,
                                    LoadingService) {
  $scope.locations = SessionService.getUserLocations($rootScope.user.id);

  $scope.loadingMessage = "loading";

  $scope.$on('$ionicView.beforeEnter', function () {
    $log.debug('Location Selector - $ionicView.beforeEnter');

    $translate('OCF.MESSAGES.LOADING').then(function (result) {
      $scope.loadingMessage = result;
    });

    LoggingService.logMessage(
      LoggingService.CONSTANTS.APP.OCF_LOGIN,
      LoggingService.CONSTANTS.CONTEXT.LOCATION_CONTROLLER,
      'entering_location_screen',
      'Location screen displayed',
      'success',
      {}
    );

    var locationSelected = _.find($scope.locations, {selected: true});

    if (!locationSelected) {
      $scope.locations[0].selected = true;
    }

    $scope.checkDevice = !!$rootScope.ocfConfigs.filterAppListByDeviceModel;

    if ($scope.locations.length == 1) {
      $scope.selectLocation();
    }

  });

  $scope.selectLocation = function () {
    LoadingService.show($scope.loadingMessage);
    $rootScope.selectedLocation = _.find($scope.locations, {"selected": true});

    $scope.subApps = [
      {
        appName: "Shipping",
        appCacheName: 'G10',
        supportedDevice: /^TC7.+/
      },
      {
        appName: "PutAway",
        appCacheName: 'G04',
        supportedDevice: /^MC92N0$/
      }
    ];

    var supplierApps = [];

    _.remove($scope.subApps, function (app) {
      return !_.find($rootScope.appsList, {"appName": app.appCacheName});
    });

    supplierApps =_.map($scope.subApps, 'appCacheName');

    $rootScope.apps = _.filter($rootScope.selectedLocation.appLocations, function (app) {
      return supplierApps.indexOf(app.application) != -1;
    });

    _.forEach($rootScope.apps, function (app, index) {
      var subApp = _.find($scope.subApps, {"appCacheName": app.application});
      $rootScope.apps[index].supportedDevice = subApp.supportedDevice;
    });

    if (!$scope.deviceModel && window.device){
      $scope.deviceModel = window.device.model;
    }

    // Filters app that do not belong to the current Device
    if ($scope.deviceModel && $scope.checkDevice) _.remove($rootScope.apps, function (app) {
      var isValidApp = new RegExp(app.supportedDevice);
      return !$scope.deviceModel.match(isValidApp);
    });

    if ($rootScope.apps.length != 1) {
      if ($rootScope.apps.length) {
        $log.debug('Location Selector - More than an app, going to app selection screen', JSON.stringify($rootScope.apps));
        navigateTo.home();
      } else {
        $log.debug('Location Selector - No apps available');
        $scope.userLogout();
      }
    } else {
      var availableApp = $rootScope.apps[0];
      var appIndex = _.findIndex($scope.subApps, {"appCacheName": availableApp.application});

      if (appIndex == -1) {
        $log.debug('Location Selector - No valid app available for the current user');
        $scope.userLogout();

      } else {
        $scope.subApps[appIndex].selected = true;
        $rootScope.app = angular.copy($scope.subApps[appIndex]);
        $rootScope.app.appCacheName = $rootScope.app.appCacheName.toUpperCase();
        $rootScope.isPilot = $rootScope.app.appName == "Shipping";
        $rootScope.appLocationId = availableApp.idUUID;

        LoggingService.logMessage(
          LoggingService.CONSTANTS.APP.OCF_LOGIN,
          LoggingService.CONSTANTS.CONTEXT.LOGIN_CONTROLLER,
          'auto_select_location',
          'Only one location, skipping screen',
          'success',
          [{'key': 'location', 'value': JSON.stringify($rootScope.selectedLocation)}]
        );

        navigateTo[availableApp.application.toLowerCase()]();
      }
    }

    LoggingService.logMessage(
      LoggingService.CONSTANTS.APP.OCF_LOGIN,
      LoggingService.CONSTANTS.CONTEXT.LOCATION_CONTROLLER,
      'location_selection',
      'Selected location',
      'success',
      [{'key': 'location', 'value': JSON.stringify($rootScope.selectedLocation)}]
    );
  };

  $scope.selectListLocationItem = function (item, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] == item) {
        if (!list[i].selected) {
          list[i].selected = true;
        }
      }
      else {
        list[i].selected = false;
      }
    }
  };
}

require = (function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a)return a(o, !0);
        if (i)return i(o, !0);
        throw new Error("Cannot find module '" + o + "'")
      }
      var f = n[o] = {exports: {}};
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e)
      }, f, f.exports, e, t, n, r)
    }
    return n[o].exports
  }

  var i = typeof require == "function" && require;
  for (var o = 0; o < r.length; o++)s(r[o]);
  return s
})({
  "ZeJ/60": [function (require, module, exports) {
    /*
     * coax
     * https://github.com/jchris/coax
     *
     * Copyright (c) 2013 Chris Anderson
     * Licensed under the Apache license.
     */
    var pax = require("pax"),
      hoax = require("hoax");

    var coaxPax = pax();

    coaxPax.extend("getQuery", function (params) {
      params = JSON.parse(JSON.stringify(params));
      var key, keys = ["key", "startkey", "endkey", "start_key", "end_key"];
      for (var i = 0; i < keys.length; i++) {
        key = keys[i];
        if (params[key]) {
          params[key] = JSON.stringify(params[key]);
        }
      }
      return params;
    });

    var Coax = module.exports = hoax.makeHoax(coaxPax());

    Coax.extend("changes", function (opts, cb) {
      if (typeof opts === "function") {
        cb = opts;
        opts = {};
      }
      var self = this;
      opts = opts || {};


      if (opts.feed == "continuous") {
        var listener = self(["_changes", opts], function (err, ok) {
          if (err && err.code == "ETIMEDOUT") {
            return self.changes(opts, cb); // TODO retry limit?
          } else if (err) {
            return cb(err);
          }
        });
        listener.on("data", function (data) {
          var sep = "\n";

          // re-emit chunked json data
          eom = data.toString().indexOf(sep)
          msg = data.toString().substring(0, eom)
          remaining = data.toString().substring(eom + 1, data.length)
          if (remaining.length > 0) {
            // console.log(data.toString())
            listener.emit("data", remaining)
          }

          var json = JSON.parse(msg);
          cb(false, json)
        })
        return listener;
      } else {
        opts.feed = "longpoll";
        // opts.since = opts.since || 0;
        // console.log("change opts "+JSON.stringify(opts));
        return self(["_changes", opts], function (err, ok) {
          if (err && err.code == "ETIMEDOUT") {
            return self.changes(opts, cb); // TODO retry limit?
          } else if (err) {
            return cb(err);
          }
          // console.log("changes", ok)
          ok.results.forEach(function (row) {
            cb(null, row);
          });
          opts.since = ok.last_seq;
          self.changes(opts, cb);
        });
      }
    });

    Coax.extend("forceSave", function (doc, cb) {
      var api = this(doc._id);
      // console.log("forceSave "+api.pax);
      api.get(function (err, old) {
        if (err && err.error !== "not_found") {
          return cb(err);
        }
        if (!err) {
          doc._rev = old._rev;
        }
        // console.log("forceSave put", api.pax, doc._rev)
        api.put(doc, cb);
      });
    });


    Coax.extend("channels", function (channels, opts) {
      var self = this;
      var opts = opts || {};

      opts.filter = "sync_gateway/bychannel";
      opts.feed = "continuous"
      opts.channels = channels.join(',')

      // console.log(self.pax.toString())
      var x = function () {
      };
      x.request = true;
      var changes = self(['_changes', opts], x);
      changes.on("data", function (data) {
        var json;
        try {
          var json = JSON.parse(data.toString())
        } catch (e) {
          console.log("not json", data.toString())
        }
        if (json) {
          changes.emit("json", json)
        }
      })
      return changes;
    });

  }, {"hoax": 6, "pax": 3}], "coax": [function (require, module, exports) {
    module.exports = require('ZeJ/60');
  }, {}], 3: [function (require, module, exports) {
    /*
     * pax
     * https://github.com/jchris/pax
     *
     * Copyright (c) 2013 Chris Anderson
     * Licensed under the APL license.
     */

    function objToQuery(q) {
      var k, ks = Object.keys(q), v, query = [];
      for (k = 0; k < ks.length; k++) {
        v = q[ks[k]];
        query.push(encodeURIComponent(ks[k]) + '=' + encodeURIComponent(v.toString()));
      }
      return query.join('&');
    }

// if there is an object in the new path,
// pluck it out and put it on the pax instance;

    function processPath(path) {
      var query;
      if (path && path.pop && path.length) {
        if (typeof path[path.length - 1] === 'object') {
          path.query = path.pop();
        }
        return path;
      } else if (typeof path === "object") { // options
        var empty = [];
        empty.query = path;
        return empty;
      } else if (path) { // string
        return [path];
      } else {
        return [];
      }
    }

    function merge(target, source) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = source[key];
        }
      }
      return target;
    }

    function mergePaths(path, newPath) {
      var k, merged = path.concat(newPath);
      merged.methods = {};
      if (path.query) {
        merged.query = merge({}, path.query);
      }
      if (newPath.query) {
        merged.query = merge(merged.query || {}, newPath.query);
      }
      if (typeof path.getQuery !== 'undefined') {
        merged.getQuery = path.getQuery;
      }
      for (k in path.methods) {
        merged.methods[k] = path.methods[k];
      }

      // if (typeof newPath.getQuery !== 'undefined') {
      //   merged.getQuery = newPath.getQuery;
      // }
      return merged;
    }

    function makeToString(path) {
      var first = true,
        encoded = path.map(function (p) {
          if (first) {
            first = false;
            if (/^http/.test(p)) {
              if (/\/$/.test(p)) {
                return p.substring(0, p.length - 1);
              } else {
                return p;
              }
            }
          }
          return encodeURIComponent(p);
        });

      return function () {
        if (path.query) {
          var qobj;
          if (path.getQuery || this.getQuery) {
            qobj = (path.getQuery || this.getQuery)(path.query);
          } else {
            qobj = path.query;
          }
          return encoded.join('/') + '?' + objToQuery(qobj);
        } else {
          return encoded.join('/');
        }
      };
    }

    function extenderizer(path) {
      path.methods = path.methods || {};
      return function (name, fun) {
        path.methods[name] = fun;
        this[name] = fun;
      };
    }

    function addExtensions(pax, path) {
      var k;
      for (k in path.methods) {
        pax[k] = path.methods[k];
      }
    }

    var growPax;

    function makeNextPathFun(path) {
      var nextPax = function (nextPath) {
        // console.log("nextPax",nextPax);
        if (typeof nextPax.getQuery !== 'undefined') {
          path.getQuery = nextPax.getQuery;
        }
        if (arguments.length > 1) {
          return growPax(path, [].map.call(arguments, function (arg) {
            return arg;
          }));
        } else {
          return growPax(path, nextPath);
        }
      };
      addExtensions(nextPax, path);
      nextPax.extend = extenderizer(path);
      // console.log(["pax", path, path.query]);
      nextPax.toString = makeToString(path);
      // console.log(["paxs", nextPax.toString()]);
      return nextPax;
    }

    function growPax(path, newPath) {
      newPath = processPath(newPath);
      path = mergePaths(path, newPath);
      return makeNextPathFun(path);
    }

    module.exports = makeNextPathFun([]);


  }, {}], "T81WCk": [function (require, module, exports) {
    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @version 0.6.11
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specificed layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     */
    function FastClick(layer) {
      'use strict';
      var oldOnClick, self = this;


      /**
       * Whether a click is currently being tracked.
       *
       * @type boolean
       */
      this.trackingClick = false;


      /**
       * Timestamp for when when click tracking started.
       *
       * @type number
       */
      this.trackingClickStart = 0;


      /**
       * The element being tracked for a click.
       *
       * @type EventTarget
       */
      this.targetElement = null;


      /**
       * X-coordinate of touch start event.
       *
       * @type number
       */
      this.touchStartX = 0;


      /**
       * Y-coordinate of touch start event.
       *
       * @type number
       */
      this.touchStartY = 0;


      /**
       * ID of the last touch, retrieved from Touch.identifier.
       *
       * @type number
       */
      this.lastTouchIdentifier = 0;


      /**
       * Touchmove boundary, beyond which a click will be cancelled.
       *
       * @type number
       */
      this.touchBoundary = 10;


      /**
       * The FastClick layer.
       *
       * @type Element
       */
      this.layer = layer;

      if (!layer || !layer.nodeType) {
        throw new TypeError('Layer must be a document node');
      }

      /** @type function() */
      this.onClick = function () {
        return FastClick.prototype.onClick.apply(self, arguments);
      };

      /** @type function() */
      this.onMouse = function () {
        return FastClick.prototype.onMouse.apply(self, arguments);
      };

      /** @type function() */
      this.onTouchStart = function () {
        return FastClick.prototype.onTouchStart.apply(self, arguments);
      };

      /** @type function() */
      this.onTouchMove = function () {
        return FastClick.prototype.onTouchMove.apply(self, arguments);
      };

      /** @type function() */
      this.onTouchEnd = function () {
        return FastClick.prototype.onTouchEnd.apply(self, arguments);
      };

      /** @type function() */
      this.onTouchCancel = function () {
        return FastClick.prototype.onTouchCancel.apply(self, arguments);
      };

      if (FastClick.notNeeded(layer)) {
        return;
      }

      // Set up event handlers as required
      if (this.deviceIsAndroid) {
        layer.addEventListener('mouseover', this.onMouse, true);
        layer.addEventListener('mousedown', this.onMouse, true);
        layer.addEventListener('mouseup', this.onMouse, true);
      }

      layer.addEventListener('click', this.onClick, true);
      layer.addEventListener('touchstart', this.onTouchStart, false);
      layer.addEventListener('touchmove', this.onTouchMove, false);
      layer.addEventListener('touchend', this.onTouchEnd, false);
      layer.addEventListener('touchcancel', this.onTouchCancel, false);

      // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
      // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
      // layer when they are cancelled.
      if (!Event.prototype.stopImmediatePropagation) {
        layer.removeEventListener = function (type, callback, capture) {
          var rmv = Node.prototype.removeEventListener;
          if (type === 'click') {
            rmv.call(layer, type, callback.hijacked || callback, capture);
          } else {
            rmv.call(layer, type, callback, capture);
          }
        };

        layer.addEventListener = function (type, callback, capture) {
          var adv = Node.prototype.addEventListener;
          if (type === 'click') {
            adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                if (!event.propagationStopped) {
                  callback(event);
                }
              }), capture);
          } else {
            adv.call(layer, type, callback, capture);
          }
        };
      }

      // If a handler is already declared in the element's onclick attribute, it will be fired before
      // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
      // adding it as listener.
      if (typeof layer.onclick === 'function') {

        // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
        // - the old one won't work if passed to addEventListener directly.
        oldOnClick = layer.onclick;
        layer.addEventListener('click', function (event) {
          oldOnClick(event);
        }, false);
        layer.onclick = null;
      }
    }


    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0(+?) requires the target element to be manually derived
     *
     * @type boolean
     */
    FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
      'use strict';
      switch (target.nodeName.toLowerCase()) {

        // Don't send a synthetic click to disabled inputs (issue #62)
        case 'button':
        case 'select':
        case 'textarea':
          if (target.disabled) {
            return true;
          }

          break;
        case 'input':

          // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
          if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
            return true;
          }

          break;
        case 'label':
        case 'video':
          return true;
      }

      return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
      'use strict';
      switch (target.nodeName.toLowerCase()) {
        case 'textarea':
          return true;
        case 'select':
          return !this.deviceIsAndroid;
        case 'input':
          switch (target.type) {
            case 'button':
            case 'checkbox':
            case 'file':
            case 'image':
            case 'radio':
            case 'submit':
              return false;
          }

          // No point in attempting to focus disabled inputs
          return !target.disabled && !target.readOnly;
        default:
          return (/\bneedsfocus\b/).test(target.className);
      }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
      'use strict';
      var clickEvent, touch;

      // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
      if (document.activeElement && document.activeElement !== targetElement) {
        document.activeElement.blur();
      }

      touch = event.changedTouches[0];

      // Synthesise a click event, with an extra attribute so it can be tracked
      clickEvent = document.createEvent('MouseEvents');
      clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
      clickEvent.forwardedTouchEvent = true;
      targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {
      'use strict;'

      //Issue #159: Android Chrome Select Box does not open with a synthetic click event
      if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
        return 'mousedown';
      }

      return 'click';
    }


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
      'use strict';
      var length;

      // Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
      if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
        length = targetElement.value.length;
        targetElement.setSelectionRange(length, length);
      } else {
        targetElement.focus();
      }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
      'use strict';
      var scrollParent, parentElement;

      scrollParent = targetElement.fastClickScrollParent;

      // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
      // target element was moved to another parent.
      if (!scrollParent || !scrollParent.contains(targetElement)) {
        parentElement = targetElement;
        do {
          if (parentElement.scrollHeight > parentElement.offsetHeight) {
            scrollParent = parentElement;
            targetElement.fastClickScrollParent = parentElement;
            break;
          }

          parentElement = parentElement.parentElement;
        } while (parentElement);
      }

      // Always update the scroll top tracker if possible.
      if (scrollParent) {
        scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
      }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {
      'use strict';

      // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
      if (eventTarget.nodeType === Node.TEXT_NODE) {
        return eventTarget.parentNode;
      }

      return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
      'use strict';
      var targetElement, touch, selection;

      // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
      if (event.targetTouches.length > 1) {
        return true;
      }

      targetElement = this.getTargetElementFromEventTarget(event.target);
      touch = event.targetTouches[0];

      if (this.deviceIsIOS) {

        // Only trusted events will deselect text on iOS (issue #49)
        selection = window.getSelection();
        if (selection.rangeCount && !selection.isCollapsed) {
          return true;
        }

        if (!this.deviceIsIOS4) {

          // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
          // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
          // with the same identifier as the touch event that previously triggered the click that triggered the alert.
          // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
          // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
          if (touch.identifier === this.lastTouchIdentifier) {
            event.preventDefault();
            return false;
          }

          this.lastTouchIdentifier = touch.identifier;

          // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
          // 1) the user does a fling scroll on the scrollable layer
          // 2) the user stops the fling scroll with another tap
          // then the event.target of the last 'touchend' event will be the element that was under the user's finger
          // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
          // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
          this.updateScrollParent(targetElement);
        }
      }

      this.trackingClick = true;
      this.trackingClickStart = event.timeStamp;
      this.targetElement = targetElement;

      this.touchStartX = touch.pageX;
      this.touchStartY = touch.pageY;

      // Prevent phantom clicks on fast double-tap (issue #36)
      if ((event.timeStamp - this.lastClickTime) < 200) {
        event.preventDefault();
      }

      return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
      'use strict';
      var touch = event.changedTouches[0], boundary = this.touchBoundary;

      if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
        return true;
      }

      return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
      'use strict';
      if (!this.trackingClick) {
        return true;
      }

      // If the touch has moved, cancel the click tracking
      if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
        this.trackingClick = false;
        this.targetElement = null;
      }

      return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {
      'use strict';

      // Fast path for newer browsers supporting the HTML5 control attribute
      if (labelElement.control !== undefined) {
        return labelElement.control;
      }

      // All browsers under test that support touch events also support the HTML5 htmlFor attribute
      if (labelElement.htmlFor) {
        return document.getElementById(labelElement.htmlFor);
      }

      // If no for attribute exists, attempt to retrieve the first labellable descendant element
      // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
      return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
      'use strict';
      var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

      if (!this.trackingClick) {
        return true;
      }

      // Prevent phantom clicks on fast double-tap (issue #36)
      if ((event.timeStamp - this.lastClickTime) < 200) {
        this.cancelNextClick = true;
        return true;
      }

      // Reset to prevent wrong click cancel on input (issue #156).
      this.cancelNextClick = false;

      this.lastClickTime = event.timeStamp;

      trackingClickStart = this.trackingClickStart;
      this.trackingClick = false;
      this.trackingClickStart = 0;

      // On some iOS devices, the targetElement supplied with the event is invalid if the layer
      // is performing a transition or scroll, and has to be re-detected manually. Note that
      // for this to function correctly, it must be called *after* the event target is checked!
      // See issue #57; also filed as rdar://13048589 .
      if (this.deviceIsIOSWithBadTarget) {
        touch = event.changedTouches[0];

        // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
        targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
        targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
      }

      targetTagName = targetElement.tagName.toLowerCase();
      if (targetTagName === 'label') {
        forElement = this.findControl(targetElement);
        if (forElement) {
          this.focus(targetElement);
          if (this.deviceIsAndroid) {
            return false;
          }

          targetElement = forElement;
        }
      } else if (this.needsFocus(targetElement)) {

        // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
        // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
        if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
          this.targetElement = null;
          return false;
        }

        this.focus(targetElement);

        // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
        if (!this.deviceIsIOS4 || targetTagName !== 'select') {
          this.targetElement = null;
          event.preventDefault();
        }

        return false;
      }

      if (this.deviceIsIOS && !this.deviceIsIOS4) {

        // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
        // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
        scrollParent = targetElement.fastClickScrollParent;
        if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
          return true;
        }
      }

      // Prevent the actual click from going though - unless the target node is marked as requiring
      // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
      if (!this.needsClick(targetElement)) {
        event.preventDefault();
        this.sendClick(targetElement, event);
      }

      return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
      'use strict';
      this.trackingClick = false;
      this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {
      'use strict';

      // If a target element was never set (because a touch event was never fired) allow the event
      if (!this.targetElement) {
        return true;
      }

      if (event.forwardedTouchEvent) {
        return true;
      }

      // Programmatically generated events targeting a specific element should be permitted
      if (!event.cancelable) {
        return true;
      }

      // Derive and check the target element to see whether the mouse event needs to be permitted;
      // unless explicitly enabled, prevent non-touch click events from triggering actions,
      // to prevent ghost/doubleclicks.
      if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

        // Prevent any user-added listeners declared on FastClick element from being fired.
        if (event.stopImmediatePropagation) {
          event.stopImmediatePropagation();
        } else {

          // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
          event.propagationStopped = true;
        }

        // Cancel the event
        event.stopPropagation();
        event.preventDefault();

        return false;
      }

      // If the mouse event is permitted, return true for the action to go through.
      return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
      'use strict';
      var permitted;

      // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
      if (this.trackingClick) {
        this.targetElement = null;
        this.trackingClick = false;
        return true;
      }

      // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
      if (event.target.type === 'submit' && event.detail === 0) {
        return true;
      }

      permitted = this.onMouse(event);

      // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
      if (!permitted) {
        this.targetElement = null;
      }

      // If clicks are permitted, return true for the action to go through.
      return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
      'use strict';
      var layer = this.layer;

      if (this.deviceIsAndroid) {
        layer.removeEventListener('mouseover', this.onMouse, true);
        layer.removeEventListener('mousedown', this.onMouse, true);
        layer.removeEventListener('mouseup', this.onMouse, true);
      }

      layer.removeEventListener('click', this.onClick, true);
      layer.removeEventListener('touchstart', this.onTouchStart, false);
      layer.removeEventListener('touchmove', this.onTouchMove, false);
      layer.removeEventListener('touchend', this.onTouchEnd, false);
      layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
      'use strict';
      var metaViewport;

      // Devices that don't support touch don't need FastClick
      if (typeof window.ontouchstart === 'undefined') {
        return true;
      }

      if ((/Chrome\/[0-9]+/).test(navigator.userAgent)) {

        // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
        if (FastClick.prototype.deviceIsAndroid) {
          metaViewport = document.querySelector('meta[name=viewport]');
          if (metaViewport && metaViewport.content.indexOf('user-scalable=no') !== -1) {
            return true;
          }

          // Chrome desktop doesn't need FastClick (issue #15)
        } else {
          return true;
        }
      }

      // IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
      if (layer.style.msTouchAction === 'none') {
        return true;
      }

      return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.attach = function (layer) {
      'use strict';
      return new FastClick(layer);
    };


    if (typeof define !== 'undefined' && define.amd) {

      // AMD. Register as an anonymous module.
      define(function () {
        'use strict';
        return FastClick;
      });
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = FastClick.attach;
      module.exports.FastClick = FastClick;
    } else {
      window.FastClick = FastClick;
    }

  }, {}], "fastclick": [function (require, module, exports) {
    module.exports = require('T81WCk');
  }, {}], 6: [function (require, module, exports) {
    var core = require("./hoax-core"),
      request = require("browser-request");

    request.log.debug = function () {
    };

    module.exports = core(request);

  }, {"./hoax-core": 7, "browser-request": 8}], 7: [function (require, module, exports) {
    /*
     * hoax
     * https://github.com/jchris/hoax
     *
     * Copyright (c) 2013 Chris Anderson
     * Licensed under the Apache license.
     */

    module.exports = function (request) {
      var pax = require("pax");

      function makeHoaxCallback(cb, verb) {
        return function (err, res, body) {
          // console.log("hoax cb", verb||"get", err, res.statusCode, body);
          if (err && err !== "error") {
            cb(err, res, body);
          } else {
            if (res.statusCode >= 400 || err === "error") {
              cb(body || res.statusCode, res);
            } else {
              cb(null, body);
            }
          }
        };
      }

      function processArguments(myPax, urlOrOpts, data, cb, verb) {
        var opts = {}, newPax = myPax;
        if (typeof urlOrOpts === 'function') {
          cb = urlOrOpts;
          data = null;
          urlOrOpts = null;
        } else {
          if (urlOrOpts.uri || urlOrOpts.url) {
            newPax = myPax(urlOrOpts.uri || urlOrOpts.url);
          } else {
            if (typeof data === 'function') {
              // we have only 2 args
              // the first is data if it is not an array
              // and the verb is put or post
              cb = data;
              data = null;
              if ((verb === "put" || verb === "post") &&
                (typeof urlOrOpts !== "string" &&
                Object.prototype.toString.call(urlOrOpts) !== '[object Array]')) {
                data = urlOrOpts;
              } else {
                newPax = myPax(urlOrOpts);
              }
            } else {
              newPax = myPax(urlOrOpts);
            }
          }
        }
        opts.headers = {'content-type': 'application/json'};
        opts.json = true;
        opts.uri = newPax.toString();
        if (data) {
          opts.body = JSON.stringify(data);
        }
        return [opts, cb, newPax];
      }

      function extenderizer(oldHoax) {
        return function (name, fun) {
          this.methods = this.methods || {};
          this.methods[name] = fun;
          this[name] = fun;
        };
      }

      function addExtensions(newHoax, oldHoax) {
        if (oldHoax && oldHoax.methods) {
          var k;
          for (k in oldHoax.methods) {
            newHoax[k] = oldHoax.methods[k];
          }
        }
      }

      function makeHoax(myPax, verb, oldHoax) {
        var newHoax = function (opts, data, xcb) {
          var args = processArguments(myPax, opts, data, xcb, verb),
            reqOpts = args[0], // includes uri, body
            cb = args[1],
            newPax = args[2];
          if (cb) {
            // console.log(["hoax", verb||"get", reqOpts]);
            if (verb) {
              if (verb == "del") {
                reqOpts.method = "DELETE";
              } else {
                reqOpts.method = verb.toUpperCase();
              }
              return request(reqOpts, makeHoaxCallback(cb, verb));
            } else {
              return request(reqOpts, makeHoaxCallback(cb));
            }
          } else {
            // console.log("new hoax", newPax);
            return makeHoax(newPax, verb, newHoax);
          }
        };
        if (!verb) {
          "get put post head del".split(" ").forEach(function (v) {
            newHoax[v] = makeHoax(myPax, v, newHoax);
          });
        }
        addExtensions(newHoax, oldHoax);
        // should this be extenderizer(newHoax) ?
        newHoax.extend = extenderizer(oldHoax);
        newHoax.pax = myPax; // deprecated
        newHoax.url = myPax;
        return newHoax;
      }

      var Hoax = makeHoax(pax());
      Hoax.makeHoax = makeHoax;

      return Hoax;
    };

  }, {"pax": 9}], 8: [function (require, module, exports) {
// Browser Request
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

    var XHR = XMLHttpRequest
    if (!XHR) throw new Error('missing XMLHttpRequest')

    module.exports = request
    request.log = {
      'trace': noop, 'debug': noop, 'info': noop, 'warn': noop, 'error': noop
    }

    var DEFAULT_TIMEOUT = 3 * 60 * 1000 // 3 minutes

//
// request
//

    function request(options, callback) {
      // The entry-point to the API: prep the options object and pass the real work to run_xhr.
      if (typeof callback !== 'function')
        throw new Error('Bad callback given: ' + callback)

      if (!options)
        throw new Error('No options given')

      var options_onResponse = options.onResponse; // Save this for later.

      if (typeof options === 'string')
        options = {'uri': options};
      else
        options = JSON.parse(JSON.stringify(options)); // Use a duplicate for mutating.

      options.onResponse = options_onResponse // And put it back.

      if (options.verbose) request.log = getLogger();

      if (options.url) {
        options.uri = options.url;
        delete options.url;
      }

      if (!options.uri && options.uri !== "")
        throw new Error("options.uri is a required argument");

      if (typeof options.uri != "string")
        throw new Error("options.uri must be a string");

      var unsupported_options = ['proxy', '_redirectsFollowed', 'maxRedirects', 'followRedirect']
      for (var i = 0; i < unsupported_options.length; i++)
        if (options[unsupported_options[i]])
          throw new Error("options." + unsupported_options[i] + " is not supported")

      options.callback = callback
      options.method = options.method || 'GET';
      options.headers = options.headers || {};
      options.body = options.body || null
      options.timeout = options.timeout || request.DEFAULT_TIMEOUT

      if (options.headers.host)
        throw new Error("Options.headers.host is not supported");

      if (options.json) {
        options.headers.accept = options.headers.accept || 'application/json'
        if (options.method !== 'GET')
          options.headers['content-type'] = 'application/json'

        if (typeof options.json !== 'boolean')
          options.body = JSON.stringify(options.json)
        else if (typeof options.body !== 'string')
          options.body = JSON.stringify(options.body)
      }

      // If onResponse is boolean true, call back immediately when the response is known,
      // not when the full request is complete.
      options.onResponse = options.onResponse || noop
      if (options.onResponse === true) {
        options.onResponse = callback
        options.callback = noop
      }

      // XXX Browsers do not like this.
      //if(options.body)
      //  options.headers['content-length'] = options.body.length;

      // HTTP basic authentication
      if (!options.headers.authorization && options.auth)
        options.headers.authorization = 'Basic ' + b64_enc(options.auth.username + ':' + options.auth.password);

      return run_xhr(options)
    }

    var req_seq = 0

    function run_xhr(options) {
      var xhr = new XHR
        , timed_out = false
        , is_cors = is_crossDomain(options.uri)
        , supports_cors = ('withCredentials' in xhr)

      req_seq += 1
      xhr.seq_id = req_seq
      xhr.id = req_seq + ': ' + options.method + ' ' + options.uri
      xhr._id = xhr.id // I know I will type "_id" from habit all the time.

      if (is_cors && !supports_cors) {
        var cors_err = new Error('Browser does not support cross-origin request: ' + options.uri)
        cors_err.cors = 'unsupported'
        return options.callback(cors_err, xhr)
      }

      xhr.timeoutTimer = setTimeout(too_late, options.timeout)
      function too_late() {
        timed_out = true
        var er = new Error('ETIMEDOUT')
        er.code = 'ETIMEDOUT'
        er.duration = options.timeout

        request.log.error('Timeout', {'id': xhr._id, 'milliseconds': options.timeout})
        return options.callback(er, xhr)
      }

      // Some states can be skipped over, so remember what is still incomplete.
      var did = {'response': false, 'loading': false, 'end': false}

      xhr.onreadystatechange = on_state_change
      xhr.open(options.method, options.uri, true) // asynchronous
      if (is_cors)
        xhr.withCredentials = !!options.withCredentials
      xhr.send(options.body)
      return xhr

      function on_state_change(event) {
        if (timed_out)
          return request.log.debug('Ignoring timed out state change', {'state': xhr.readyState, 'id': xhr.id})

        request.log.debug('State change', {'state': xhr.readyState, 'id': xhr.id, 'timed_out': timed_out})

        if (xhr.readyState === XHR.OPENED) {
          request.log.debug('Request started', {'id': xhr.id})
          for (var key in options.headers)
            xhr.setRequestHeader(key, options.headers[key])
        }

        else if (xhr.readyState === XHR.HEADERS_RECEIVED)
          on_response()

        else if (xhr.readyState === XHR.LOADING) {
          on_response()
          on_loading()
        }

        else if (xhr.readyState === XHR.DONE) {
          on_response()
          on_loading()
          on_end()
        }
      }

      function on_response() {
        if (did.response)
          return

        did.response = true
        request.log.debug('Got response', {'id': xhr.id, 'status': xhr.status})
        clearTimeout(xhr.timeoutTimer)
        xhr.statusCode = xhr.status // Node request compatibility

        // Detect failed CORS requests.
        if (is_cors && xhr.statusCode == 0) {
          var cors_err = new Error('CORS request rejected: ' + options.uri)
          cors_err.cors = 'rejected'

          // Do not process this request further.
          did.loading = true
          did.end = true

          return options.callback(cors_err, xhr)
        }

        options.onResponse(null, xhr)
      }

      function on_loading() {
        if (did.loading)
          return

        did.loading = true
        request.log.debug('Response body loading', {'id': xhr.id})
        // TODO: Maybe simulate "data" events by watching xhr.responseText
      }

      function on_end() {
        if (did.end)
          return

        did.end = true
        request.log.debug('Request done', {'id': xhr.id})

        xhr.body = xhr.responseText
        if (options.json) {
          try {
            xhr.body = JSON.parse(xhr.responseText)
          }
          catch (er) {
            return options.callback(er, xhr)
          }
        }

        options.callback(null, xhr, xhr.body)
      }

    } // request

    request.withCredentials = false;
    request.DEFAULT_TIMEOUT = DEFAULT_TIMEOUT;

//
// defaults
//

    request.defaults = function (options, requester) {
      var def = function (method) {
        var d = function (params, callback) {
          if (typeof params === 'string')
            params = {'uri': params};
          else {
            params = JSON.parse(JSON.stringify(params));
          }
          for (var i in options) {
            if (params[i] === undefined) params[i] = options[i]
          }
          return method(params, callback)
        }
        return d
      }
      var de = def(request)
      de.get = def(request.get)
      de.post = def(request.post)
      de.put = def(request.put)
      de.head = def(request.head)
      return de
    }

//
// HTTP method shortcuts
//

    var shortcuts = ['get', 'put', 'post', 'head'];
    shortcuts.forEach(function (shortcut) {
      var method = shortcut.toUpperCase();
      var func = shortcut.toLowerCase();

      request[func] = function (opts) {
        if (typeof opts === 'string')
          opts = {'method': method, 'uri': opts};
        else {
          opts = JSON.parse(JSON.stringify(opts));
          opts.method = method;
        }

        var args = [opts].concat(Array.prototype.slice.apply(arguments, [1]));
        return request.apply(this, args);
      }
    })

//
// CouchDB shortcut
//

    request.couch = function (options, callback) {
      if (typeof options === 'string')
        options = {'uri': options}

      // Just use the request API to do JSON.
      options.json = true
      if (options.body)
        options.json = options.body
      delete options.body

      callback = callback || noop

      var xhr = request(options, couch_handler)
      return xhr

      function couch_handler(er, resp, body) {
        if (er)
          return callback(er, resp, body)

        if ((resp.statusCode < 200 || resp.statusCode > 299) && body.error) {
          // The body is a Couch JSON object indicating the error.
          er = new Error('CouchDB error: ' + (body.error.reason || body.error.error))
          for (var key in body)
            er[key] = body[key]
          return callback(er, resp, body);
        }

        return callback(er, resp, body);
      }
    }

//
// Utility
//

    function noop() {
    }

    function getLogger() {
      var logger = {}
        , levels = ['trace', 'debug', 'info', 'warn', 'error']
        , level, i

      for (i = 0; i < levels.length; i++) {
        level = levels[i]

        logger[level] = noop
        if (typeof console !== 'undefined' && console && console[level])
          logger[level] = formatted(console, level)
      }

      return logger
    }

    function formatted(obj, method) {
      return formatted_logger

      function formatted_logger(str, context) {
        if (typeof context === 'object')
          str += ' ' + JSON.stringify(context)

        return obj[method].call(obj, str)
      }
    }

// Return whether a URL is a cross-domain request.
    function is_crossDomain(url) {
      var rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/

      // jQuery #8138, IE may throw an exception when accessing
      // a field from window.location if document.domain has been set
      var ajaxLocation
      try {
        ajaxLocation = location.href
      }
      catch (e) {
        // Use the href attribute of an A element since IE will modify it given document.location
        ajaxLocation = document.createElement("a");
        ajaxLocation.href = "";
        ajaxLocation = ajaxLocation.href;
      }

      var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || []
        , parts = rurl.exec(url.toLowerCase())

      var result = !!(
        parts &&
        (  parts[1] != ajaxLocParts[1]
          || parts[2] != ajaxLocParts[2]
          || (parts[3] || (parts[1] === "http:" ? 80 : 443)) != (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? 80 : 443))
        )
      )

      //console.debug('is_crossDomain('+url+') -> ' + result)
      return result
    }

// MIT License from http://phpjs.org/functions/base64_encode:358
    function b64_enc(data) {
      // Encodes string using MIME base64 algorithm
      var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = "", tmp_arr = [];

      if (!data) {
        return data;
      }

      // assume utf8 data
      // data = this.utf8_encode(data+'');

      do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
      } while (i < data.length);

      enc = tmp_arr.join('');

      switch (data.length % 3) {
        case 1:
          enc = enc.slice(0, -2) + '==';
          break;
        case 2:
          enc = enc.slice(0, -1) + '=';
          break;
      }

      return enc;
    }

  }, {}], 9: [function (require, module, exports) {
    module.exports = require(3)
  }, {}], "mustache": [function (require, module, exports) {
    module.exports = require('4JMXRT');
  }, {}], "4JMXRT": [function (require, module, exports) {
    /*!
     * mustache.js - Logic-less {{mustache}} templates with JavaScript
     * http://github.com/janl/mustache.js
     */

    /*global define: false*/

    (function (root, factory) {
      if (typeof exports === "object" && exports) {
        module.exports = factory; // CommonJS
      } else if (typeof define === "function" && define.amd) {
        define(factory); // AMD
      } else {
        root.Mustache = factory; // <script>
      }
    }(this, (function () {

      var exports = {};

      exports.name = "mustache.js";
      exports.version = "0.7.2";
      exports.tags = ["{{", "}}"];

      exports.Scanner = Scanner;
      exports.Context = Context;
      exports.Writer = Writer;

      var whiteRe = /\s*/;
      var spaceRe = /\s+/;
      var nonSpaceRe = /\S/;
      var eqRe = /\s*=/;
      var curlyRe = /\s*\}/;
      var tagRe = /#|\^|\/|>|\{|&|=|!/;

      // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
      // See https://github.com/janl/mustache.js/issues/189
      function testRe(re, string) {
        return RegExp.prototype.test.call(re, string);
      }

      function isWhitespace(string) {
        return !testRe(nonSpaceRe, string);
      }

      var isArray = Array.isArray || function (obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };

      function escapeRe(string) {
        return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      }

      var entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': '&quot;',
        "'": '&#39;',
        "/": '&#x2F;'
      };

      function escapeHtml(string) {
        return String(string).replace(/[&<>"'\/]/g, function (s) {
          return entityMap[s];
        });
      }

      // Export the escaping function so that the user may override it.
      // See https://github.com/janl/mustache.js/issues/244
      exports.escape = escapeHtml;

      function Scanner(string) {
        this.string = string;
        this.tail = string;
        this.pos = 0;
      }

      /**
       * Returns `true` if the tail is empty (end of string).
       */
      Scanner.prototype.eos = function () {
        return this.tail === "";
      };

      /**
       * Tries to match the given regular expression at the current position.
       * Returns the matched text if it can match, the empty string otherwise.
       */
      Scanner.prototype.scan = function (re) {
        var match = this.tail.match(re);

        if (match && match.index === 0) {
          this.tail = this.tail.substring(match[0].length);
          this.pos += match[0].length;
          return match[0];
        }

        return "";
      };

      /**
       * Skips all text until the given regular expression can be matched. Returns
       * the skipped string, which is the entire tail if no match can be made.
       */
      Scanner.prototype.scanUntil = function (re) {
        var match, pos = this.tail.search(re);

        switch (pos) {
          case -1:
            match = this.tail;
            this.pos += this.tail.length;
            this.tail = "";
            break;
          case 0:
            match = "";
            break;
          default:
            match = this.tail.substring(0, pos);
            this.tail = this.tail.substring(pos);
            this.pos += pos;
        }

        return match;
      };

      function Context(view, parent) {
        this.view = view;
        this.parent = parent;
        this.clearCache();
      }

      Context.make = function (view) {
        return (view instanceof Context) ? view : new Context(view);
      };

      Context.prototype.clearCache = function () {
        this._cache = {};
      };

      Context.prototype.push = function (view) {
        return new Context(view, this);
      };

      Context.prototype.lookup = function (name) {
        var value = this._cache[name];

        if (!value) {
          if (name === ".") {
            value = this.view;
          } else {
            var context = this;

            while (context) {
              if (name.indexOf(".") > 0) {
                var names = name.split("."), i = 0;

                value = context.view;

                while (value && i < names.length) {
                  value = value[names[i++]];
                }
              } else {
                value = context.view[name];
              }

              if (value != null) {
                break;
              }

              context = context.parent;
            }
          }

          this._cache[name] = value;
        }

        if (typeof value === "function") {
          value = value.call(this.view);
        }

        return value;
      };

      function Writer() {
        this.clearCache();
      }

      Writer.prototype.clearCache = function () {
        this._cache = {};
        this._partialCache = {};
      };

      Writer.prototype.compile = function (template, tags) {
        var fn = this._cache[template];

        if (!fn) {
          var tokens = exports.parse(template, tags);
          fn = this._cache[template] = this.compileTokens(tokens, template);
        }

        return fn;
      };

      Writer.prototype.compilePartial = function (name, template, tags) {
        var fn = this.compile(template, tags);
        this._partialCache[name] = fn;
        return fn;
      };

      Writer.prototype.compileTokens = function (tokens, template) {
        var fn = compileTokens(tokens);
        var self = this;

        return function (view, partials) {
          if (partials) {
            if (typeof partials === "function") {
              self._loadPartial = partials;
            } else {
              for (var name in partials) {
                self.compilePartial(name, partials[name]);
              }
            }
          }

          return fn(self, Context.make(view), template);
        };
      };

      Writer.prototype.render = function (template, view, partials) {
        return this.compile(template)(view, partials);
      };

      Writer.prototype._section = function (name, context, text, callback) {
        var value = context.lookup(name);

        switch (typeof value) {
          case "object":
            if (isArray(value)) {
              var buffer = "";

              for (var i = 0, len = value.length; i < len; ++i) {
                buffer += callback(this, context.push(value[i]));
              }

              return buffer;
            }

            return value ? callback(this, context.push(value)) : "";
          case "function":
            var self = this;
            var scopedRender = function (template) {
              return self.render(template, context);
            };

            var result = value.call(context.view, text, scopedRender);
            return result != null ? result : "";
          default:
            if (value) {
              return callback(this, context);
            }
        }

        return "";
      };

      Writer.prototype._inverted = function (name, context, callback) {
        var value = context.lookup(name);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          return callback(this, context);
        }

        return "";
      };

      Writer.prototype._partial = function (name, context) {
        if (!(name in this._partialCache) && this._loadPartial) {
          this.compilePartial(name, this._loadPartial(name));
        }

        var fn = this._partialCache[name];

        return fn ? fn(context) : "";
      };

      Writer.prototype._name = function (name, context) {
        var value = context.lookup(name);

        if (typeof value === "function") {
          value = value.call(context.view);
        }

        return (value == null) ? "" : String(value);
      };

      Writer.prototype._escaped = function (name, context) {
        return exports.escape(this._name(name, context));
      };

      /**
       * Low-level function that compiles the given `tokens` into a function
       * that accepts three arguments: a Writer, a Context, and the template.
       */
      function compileTokens(tokens) {
        var subRenders = {};

        function subRender(i, tokens, template) {
          if (!subRenders[i]) {
            var fn = compileTokens(tokens);
            subRenders[i] = function (writer, context) {
              return fn(writer, context, template);
            };
          }

          return subRenders[i];
        }

        return function (writer, context, template) {
          var buffer = "";
          var token, sectionText;

          for (var i = 0, len = tokens.length; i < len; ++i) {
            token = tokens[i];

            switch (token[0]) {
              case "#":
                sectionText = template.slice(token[3], token[5]);
                buffer += writer._section(token[1], context, sectionText, subRender(i, token[4], template));
                break;
              case "^":
                buffer += writer._inverted(token[1], context, subRender(i, token[4], template));
                break;
              case ">":
                buffer += writer._partial(token[1], context);
                break;
              case "&":
                buffer += writer._name(token[1], context);
                break;
              case "name":
                buffer += writer._escaped(token[1], context);
                break;
              case "text":
                buffer += token[1];
                break;
            }
          }

          return buffer;
        };
      }

      /**
       * Forms the given array of `tokens` into a nested tree structure where
       * tokens that represent a section have two additional items: 1) an array of
       * all tokens that appear in that section and 2) the index in the original
       * template that represents the end of that section.
       */
      function nestTokens(tokens) {
        var tree = [];
        var collector = tree;
        var sections = [];

        var token;
        for (var i = 0, len = tokens.length; i < len; ++i) {
          token = tokens[i];
          switch (token[0]) {
            case '#':
            case '^':
              sections.push(token);
              collector.push(token);
              collector = token[4] = [];
              break;
            case '/':
              var section = sections.pop();
              section[5] = token[2];
              collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
              break;
            default:
              collector.push(token);
          }
        }

        return tree;
      }

      /**
       * Combines the values of consecutive text tokens in the given `tokens` array
       * to a single token.
       */
      function squashTokens(tokens) {
        var squashedTokens = [];

        var token, lastToken;
        for (var i = 0, len = tokens.length; i < len; ++i) {
          token = tokens[i];
          if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
            lastToken[1] += token[1];
            lastToken[3] = token[3];
          } else {
            lastToken = token;
            squashedTokens.push(token);
          }
        }

        return squashedTokens;
      }

      function escapeTags(tags) {
        return [
          new RegExp(escapeRe(tags[0]) + "\\s*"),
          new RegExp("\\s*" + escapeRe(tags[1]))
        ];
      }

      /**
       * Breaks up the given `template` string into a tree of token objects. If
       * `tags` is given here it must be an array with two string values: the
       * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
       * course, the default is to use mustaches (i.e. Mustache.tags).
       */
      exports.parse = function (template, tags) {
        template = template || '';
        tags = tags || exports.tags;

        if (typeof tags === 'string') tags = tags.split(spaceRe);
        if (tags.length !== 2) {
          throw new Error('Invalid tags: ' + tags.join(', '));
        }

        var tagRes = escapeTags(tags);
        var scanner = new Scanner(template);

        var sections = [];     // Stack to hold section tokens
        var tokens = [];       // Buffer to hold the tokens
        var spaces = [];       // Indices of whitespace tokens on the current line
        var hasTag = false;    // Is there a {{tag}} on the current line?
        var nonSpace = false;  // Is there a non-space char on the current line?

        // Strips all whitespace tokens array for the current line
        // if there was a {{#tag}} on it and otherwise only space.
        function stripSpace() {
          if (hasTag && !nonSpace) {
            while (spaces.length) {
              tokens.splice(spaces.pop(), 1);
            }
          } else {
            spaces = [];
          }

          hasTag = false;
          nonSpace = false;
        }

        var start, type, value, chr;
        while (!scanner.eos()) {
          start = scanner.pos;
          value = scanner.scanUntil(tagRes[0]);

          if (value) {
            for (var i = 0, len = value.length; i < len; ++i) {
              chr = value.charAt(i);

              if (isWhitespace(chr)) {
                spaces.push(tokens.length);
              } else {
                nonSpace = true;
              }

              tokens.push(["text", chr, start, start + 1]);
              start += 1;

              if (chr === "\n") {
                stripSpace(); // Check for whitespace on the current line.
              }
            }
          }

          start = scanner.pos;

          // Match the opening tag.
          if (!scanner.scan(tagRes[0])) {
            break;
          }

          hasTag = true;
          type = scanner.scan(tagRe) || "name";

          // Skip any whitespace between tag and value.
          scanner.scan(whiteRe);

          // Extract the tag value.
          if (type === "=") {
            value = scanner.scanUntil(eqRe);
            scanner.scan(eqRe);
            scanner.scanUntil(tagRes[1]);
          } else if (type === "{") {
            var closeRe = new RegExp("\\s*" + escapeRe("}" + tags[1]));
            value = scanner.scanUntil(closeRe);
            scanner.scan(curlyRe);
            scanner.scanUntil(tagRes[1]);
            type = "&";
          } else {
            value = scanner.scanUntil(tagRes[1]);
          }

          // Match the closing tag.
          if (!scanner.scan(tagRes[1])) {
            throw new Error('Unclosed tag at ' + scanner.pos);
          }

          // Check section nesting.
          if (type === '/') {
            if (sections.length === 0) {
              throw new Error('Unopened section "' + value + '" at ' + start);
            }

            var section = sections.pop();

            if (section[1] !== value) {
              throw new Error('Unclosed section "' + section[1] + '" at ' + start);
            }
          }

          var token = [type, value, start, scanner.pos];
          tokens.push(token);

          if (type === '#' || type === '^') {
            sections.push(token);
          } else if (type === "name" || type === "{" || type === "&") {
            nonSpace = true;
          } else if (type === "=") {
            // Set the tags for the next time around.
            tags = value.split(spaceRe);

            if (tags.length !== 2) {
              throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
            }

            tagRes = escapeTags(tags);
          }
        }

        // Make sure there are no open sections when we're done.
        var section = sections.pop();
        if (section) {
          throw new Error('Unclosed section "' + section[1] + '" at ' + scanner.pos);
        }

        return nestTokens(squashTokens(tokens));
      };

      // The high-level clearCache, compile, compilePartial, and render functions
      // use this default writer.
      var _writer = new Writer();

      /**
       * Clears all cached templates and partials in the default writer.
       */
      exports.clearCache = function () {
        return _writer.clearCache();
      };

      /**
       * Compiles the given `template` to a reusable function using the default
       * writer.
       */
      exports.compile = function (template, tags) {
        return _writer.compile(template, tags);
      };

      /**
       * Compiles the partial with the given `name` and `template` to a reusable
       * function using the default writer.
       */
      exports.compilePartial = function (name, template, tags) {
        return _writer.compilePartial(name, template, tags);
      };

      /**
       * Compiles the given array of tokens (the output of a parse) to a reusable
       * function using the default writer.
       */
      exports.compileTokens = function (tokens, template) {
        return _writer.compileTokens(tokens, template);
      };

      /**
       * Renders the `template` with the given `view` and `partials` using the
       * default writer.
       */
      exports.render = function (template, view, partials) {
        return _writer.render(template, view, partials);
      };

      // This is here for backwards compatibility with 0.4.x.
      exports.to_html = function (template, view, partials, send) {
        var result = exports.render(template, view, partials);

        if (typeof send === "function") {
          send(result);
        } else {
          return result;
        }
      };

      return exports;

    }())));

  }, {}]
}, {}, [])
;

/**
 * Created by FMG on 10/03/2016.
 */
angular
  .module('limitStringFilter', [])
  .filter("limitString", function () {
    return LimitString
  });


/**
 * Returns the input value shrunken up to 'limit', counting from right.
 * @return {string}
 */
function LimitString(input, limit) {
  var inputString = input + ""; // cast to string
  var prepend = "&hellip;";
  var inputLength = inputString.length;
  var outputString = inputString;

  limit = limit.toString();

  if (limit.indexOf("-") != -1) {
    var formatter = limit.split("-");
    limit = formatter[0];
    prepend = formatter[1];
  }

  if (inputLength > limit) {
    return prepend + inputString.substring(inputLength - limit, inputLength);
  }

  return outputString;

}

/**
 * Created by PC040 on 03/05/2016.
 */

angular.module('ocf.interceptors', [])

.factory('httpRequestInterceptor', ["$q", "$rootScope", function ($q, $rootScope) {
  return {
    'responseError': function(rejection) {
      // do something on error
      if(rejection && rejection.data && rejection.data.message == 'Session Expired') {
        $rootScope.$broadcast('logout', true);
        rejection = 'Session Expired';
      }

      return $q.reject(rejection);
    }
  };
}]);

angular.module('ocf.filters', [])

  .filter('cutStringStart', function () {
    return function (text, length, start) {
      if (isNaN(length)) {
        length = 4;
      }

      if (start === undefined) {
        start = "...";
      }

      if (!text) {
        return "N/A";
      }
      if (text.length <= length) {
        return text;

      } else {
        return start + String(text).substr(-length, length);
      }
    };
  })

  .filter('cutEPCStart', function () {
    return function (text, length, start) {
      if (isNaN(length)) {
        length = 4;
      }

      if (start === undefined) {
        start = "xx";
      }

      if (!text) {
        return "N/A";
      }
      if (text.length <= length) {
        return text;

      } else {
        return start + String(text).substr(-length, length);
      }
    };
  })

  .filter('cutStringEnd', function () {
    return function (text, length, end) {
      if (isNaN(length)) {
        length = 4;
      }

      if (end === undefined) {
        end = "...";
      }

      if (!text) {
        return "N/A";
      }
      if (text.length <= length) {
        return text;

      } else {
        return String(text).substr(0, length) + end;
      }
    };
  })


  .filter('toTrusted', ['$sce', function ($sce) {
    return function (text) {
      return $sce.trustAsHtml(text);
    };
  }])

  .filter('cutStringSize', function () {
    return function (text, font, fontSize, maxSize) {
      if (isNaN(fontSize)) {
        fontSize = 12;
      }
      if (isNaN(maxSize)) {
        maxSize = 50;
      }
      var end = "...";
      if (font == null || font==undefined){
        font = "roboto";
      }
      if (!text) {
        return "N/A";
      }
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext("2d");
      ctx.font = fontSize+"px "+font;
      var width = ctx.measureText(text).width;

      var newText = text;
      var count = 0;
      while(width >= maxSize){
        newText = String(text).substr(0, newText.length - count++) + end;
        width = ctx.measureText(newText).width;
      }
      return newText;
    };
  });

;

angular.module('ocf.directives', [])

  .directive('messages', function () {
    return {
      scope: {
        messages: '='
      },
      restrict: 'E',
      templateUrl: 'commons/templates/message-service.html',
      link: function ($scope, iElm, iAttrs, controller) {
      }
    };
  })

  .directive('ionPager', function () {
    return {
      priority: 0,
      link: function ($scope, $element, $attr, slideBox) {
        var range = function (start, rangeLength) {
          return Array.apply(null, Array(rangeLength)).map(function (_, i) {return i+start;})
        };

        $scope.currentPage = 1;

        $scope.belongsToCurrentPage = function (index) {
          var currPageRange = range(($scope.currentPage-1)*5, 5);
          if (currPageRange.indexOf(index) !== -1) {
            return true;
          }
        };

        var selectImage = function (index) {
          var i, j;
          var children = $element[0].children[0].children;
          var length = children.length;

          for (i = 0, j = 1; i < length; i++) {
            // applies the page location class
            var pIndex = (i+1)%5 ? j : j++;

            if (i == index) {
              $scope.currentPage = pIndex;
              children[i].classList.add('active');
            } else {
              children[i].classList.remove('active');
            }
          }
        };

        $scope.pagerClick = function (index) {
          slideBox.onPagerClick(index);
        };

        $scope.numSlides = function () {
          return new Array(slideBox.slidesCount());
        };

        $scope.$watch('currentSlide', function (v) {
          selectImage(v);
        });

        $scope.isFirstPage = function () {
          return ($scope.currentPage === 1);
        };

        $scope.isLastPage = function (total) {
          return ($scope.currentPage === Math.ceil(total / 5));
        };

        $scope.prevGalleryPage = function () {
          if (!$scope.isFirstPage()) {
            $scope.currentPage--;
          }
        };

        $scope.nextGalleryPage = function (total) {
          if (!$scope.isLastPage(total)) {
            $scope.currentPage++;
          }
        };
      }
    };

  })

  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function(){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  })

  //.directive('newSampleSubHeader', function () {
  //  return {
  //    scope: {
  //      productName: '=',
  //      productCount: '='
  //    },
  //    restrict: 'E',
  //    templateURL: 'apps/E30/Sample/templates/NewSampleSubHeader.html'
  //  };
  //})

;

angular.module('ocf.constants', [])
.constant('EnvironmentConfig', {"host":"https://dev3.zestdataservices.com/","apiPath":"api/1/","version":"1.0.${env.BUILD_NUMBER}","envName":"${ENV_NAME}","requestTimeout":30000,"requestTimeoutLong":120000})
.constant('OCFConfig', {"host":"https://dev3.zestdataservices.com/","apiPath":"ocf-manager/1/","servicePath":"services/","configObject":"configObject","applications":"applications/","access":"access"})
.constant('SessionConfig', {"cookieName":"zest_6220137ea63256c1ba1014724b94144c","userInformation":"userInformation","cookieLifeTime":1,"cookiePath":"/ocf","userApplications":"userApplications"})
.constant('CouchDbConfig', {"host":"https://dev3.zestdataservices.com:6985/","name":"zest_ocf"})
.constant('CouchBaseConfig', {"host":"https://dev3.zestdataservices.com:4986/","name":"dev3"})
.constant('PersistenceConfig', {"daysToLive":2})
.constant('PouchConfig', {"pouchdbName":"pouch_ocf","replicationRetries":3})
.constant('StagingConfig', {"host":"https://dev3.zestdataservices.com/","apiPath":"zest-order-staging-api/1/","version":"1.0.${env.BUILD_NUMBER}","envName":"${ENV_NAME}","requestTimeout":30000,"requestTimeoutLong":120000})
.constant('PutAwayConfig', {"host":"https://dev3.zestdataservices.com/","apiPath":"fpms-put-away-process/1/","version":"1.0.${env.BUILD_NUMBER}","envName":"${ENV_NAME}","requestTimeout":30000,"requestTimeoutLong":120000});

/*
 * AngularJS Toaster
 * Version: 1.2.0
 *
 * Copyright 2013-2016 Jiri Kavulak.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
 */
!function(t,e){"use strict";angular.module("toaster",[]).constant("toasterConfig",{limit:0,"tap-to-dismiss":!0,"close-button":!1,"close-html":'<button class="toast-close-button" type="button">&times;</button>',"newest-on-top":!0,"time-out":5e3,"icon-classes":{error:"toast-error",info:"toast-info",wait:"toast-wait",success:"toast-success",warning:"toast-warning"},"body-output-type":"","body-template":"toasterBodyTmpl.html","icon-class":"toast-info","position-class":"toast-top-right","title-class":"toast-title","message-class":"toast-message","prevent-duplicates":!1,"mouseover-timer-stop":!0}).service("toaster",["$rootScope","toasterConfig",function(t,e){function o(t){return function(e,o,s,i,a,n,r,c,l){angular.isString(e)?this.pop(t,e,o,s,i,a,n,r,c,l):this.pop(angular.extend(e,{type:t}))}}this.pop=function(e,o,s,i,a,n,r,c,l,u){if(angular.isObject(e)){var d=e;this.toast={type:d.type,title:d.title,body:d.body,timeout:d.timeout,bodyOutputType:d.bodyOutputType,clickHandler:d.clickHandler,showCloseButton:d.showCloseButton,closeHtml:d.closeHtml,uid:d.toastId,onShowCallback:d.onShowCallback,onHideCallback:d.onHideCallback,directiveData:d.directiveData},l=d.toastId,r=d.toasterId}else this.toast={type:e,title:o,body:s,timeout:i,bodyOutputType:a,clickHandler:n,showCloseButton:c,uid:l,onHideCallback:u};t.$emit("toaster-newToast",r,l)},this.clear=function(e,o){t.$emit("toaster-clearToasts",e,o)};for(var s in e["icon-classes"])this[s]=o(s)}]).factory("toasterEventRegistry",["$rootScope",function(t){var e,o=null,s=null,i=[],a=[];return e={setup:function(){o||(o=t.$on("toaster-newToast",function(t,e,o){for(var s=0,a=i.length;a>s;s++)i[s](t,e,o)})),s||(s=t.$on("toaster-clearToasts",function(t,e,o){for(var s=0,i=a.length;i>s;s++)a[s](t,e,o)}))},subscribeToNewToastEvent:function(t){i.push(t)},subscribeToClearToastsEvent:function(t){a.push(t)},unsubscribeToNewToastEvent:function(t){var e=i.indexOf(t);e>=0&&i.splice(e,1),0===i.length&&(o(),o=null)},unsubscribeToClearToastsEvent:function(t){var e=a.indexOf(t);e>=0&&a.splice(e,1),0===a.length&&(s(),s=null)}},{setup:e.setup,subscribeToNewToastEvent:e.subscribeToNewToastEvent,subscribeToClearToastsEvent:e.subscribeToClearToastsEvent,unsubscribeToNewToastEvent:e.unsubscribeToNewToastEvent,unsubscribeToClearToastsEvent:e.unsubscribeToClearToastsEvent}}]).directive("directiveTemplate",["$compile","$injector",function(t,e){return{restrict:"A",scope:{directiveName:"@directiveName",directiveData:"@directiveData"},replace:!0,link:function(o,s,i){o.$watch("directiveName",function(a){if(angular.isUndefined(a)||a.length<=0)throw new Error("A valid directive name must be provided via the toast body argument when using bodyOutputType: directive");var n;try{n=e.get(i.$normalize(a)+"Directive")}catch(r){throw new Error(a+" could not be found. The name should appear as it exists in the markup, not camelCased as it would appear in the directive declaration, e.g. directive-name not directiveName.")}var c=n[0];if(c.scope!==!0&&c.scope)throw new Error("Cannot use a directive with an isolated scope. The scope must be either true or falsy (e.g. false/null/undefined). Occurred for directive "+a+".");if(c.restrict.indexOf("A")<0)throw new Error('Directives must be usable as attributes. Add "A" to the restrict option (or remove the option entirely). Occurred for directive '+a+".");o.directiveData&&(o.directiveData=angular.fromJson(o.directiveData));var l=t("<div "+a+"></div>")(o);s.append(l)})}}}]).directive("toasterContainer",["$parse","$rootScope","$interval","$sce","toasterConfig","toaster","toasterEventRegistry",function(t,e,o,s,i,a,n){return{replace:!0,restrict:"EA",scope:!0,link:function(e,r,c){function l(t,s){t.timeoutPromise=o(function(){e.removeToast(t.id)},s,1)}function u(o,i){if(o.type=v["icon-classes"][o.type],o.type||(o.type=v["icon-class"]),v["prevent-duplicates"]===!0)if(p(i)){if(e.toasters.length>0&&e.toasters[e.toasters.length-1].body===o.body)return}else{var a,n;for(a=0,n=e.toasters.length;n>a;a++)e.toasters[a].uid===i&&(d(a),a--,n=e.toasters.length)}o.id=++f,p(i)||(o.uid=i);var r=v["close-button"];if("boolean"==typeof o.showCloseButton);else if("boolean"==typeof r)o.showCloseButton=r;else if("object"==typeof r){var c=r[o.type];"undefined"!=typeof c&&null!==c&&(o.showCloseButton=c)}else o.showCloseButton=!1;switch(o.showCloseButton&&(o.closeHtml=s.trustAsHtml(o.closeHtml||e.config.closeHtml)),o.bodyOutputType=o.bodyOutputType||v["body-output-type"],o.bodyOutputType){case"trustedHtml":o.html=s.trustAsHtml(o.body);break;case"template":o.bodyTemplate=o.body||v["body-template"];break;case"templateWithData":var l=t(o.body||v["body-template"]),u=l(e);o.bodyTemplate=u.template,o.data=u.data;break;case"directive":o.html=o.body}e.configureTimer(o),v["newest-on-top"]===!0?(e.toasters.unshift(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.pop()):(e.toasters.push(o),v.limit>0&&e.toasters.length>v.limit&&e.toasters.shift()),angular.isFunction(o.onShowCallback)&&o.onShowCallback()}function d(t){var s=e.toasters[t];s.timeoutPromise&&o.cancel(s.timeoutPromise),e.toasters.splice(t,1),angular.isFunction(s.onHideCallback)&&s.onHideCallback()}function m(t){for(var o=e.toasters.length-1;o>=0;o--)p(t)?d(o):e.toasters[o].uid==t&&d(o)}function p(t){return angular.isUndefined(t)||null===t}var v,f=0;v=angular.extend({},i,e.$eval(c.toasterOptions)),e.config={toasterId:v["toaster-id"],position:v["position-class"],title:v["title-class"],message:v["message-class"],tap:v["tap-to-dismiss"],closeButton:v["close-button"],closeHtml:v["close-html"],animation:v["animation-class"],mouseoverTimer:v["mouseover-timer-stop"]},e.$on("$destroy",function(){n.unsubscribeToNewToastEvent(e._onNewToast),n.unsubscribeToClearToastsEvent(e._onClearToasts)}),e.configureTimer=function(t){var e=angular.isNumber(t.timeout)?t.timeout:v["time-out"];"object"==typeof e&&(e=e[t.type]),e>0&&l(t,e)},e.removeToast=function(t){var o,s;for(o=0,s=e.toasters.length;s>o;o++)if(e.toasters[o].id===t){d(o);break}},e.toasters=[],e._onNewToast=function(t,o,s){(p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&u(a.toast,s)},e._onClearToasts=function(t,o,s){("*"==o||p(e.config.toasterId)&&p(o)||!p(e.config.toasterId)&&!p(o)&&e.config.toasterId==o)&&m(s)},n.setup(),n.subscribeToNewToastEvent(e._onNewToast),n.subscribeToClearToastsEvent(e._onClearToasts)},controller:["$scope","$element","$attrs",function(t,e,s){t.stopTimer=function(e){t.config.mouseoverTimer===!0&&e.timeoutPromise&&(o.cancel(e.timeoutPromise),e.timeoutPromise=null)},t.restartTimer=function(e){t.config.mouseoverTimer===!0?e.timeoutPromise||t.configureTimer(e):null===e.timeoutPromise&&t.removeToast(e.id)},t.click=function(e,o){if(t.config.tap===!0||e.showCloseButton===!0&&o===!0){var s=!0;e.clickHandler&&(angular.isFunction(e.clickHandler)?s=e.clickHandler(e,o):angular.isFunction(t.$parent.$eval(e.clickHandler))?s=t.$parent.$eval(e.clickHandler)(e,o):console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.")),s&&t.removeToast(e.id)}}}],template:'<div id="toast-container" ng-class="[config.position, config.animation]"><div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)"><div ng-if="toaster.showCloseButton" ng-click="click(toaster, true)" ng-bind-html="toaster.closeHtml"></div><div ng-class="config.title">{{toaster.title}}</div><div ng-class="config.message" ng-switch on="toaster.bodyOutputType"><div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div><div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div><div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div><div ng-switch-default >{{toaster.body}}</div></div></div></div>'}}])}(window,document);
/* global angular */
(function (window, document) {
    'use strict';

    /*
     * AngularJS Toaster
     * Version: 1.2.0
     *
     * Copyright 2013-2016 Jiri Kavulak.
     * All Rights Reserved.
     * Use, reproduction, distribution, and modification of this code is subject to the terms and
     * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
     *
     * Author: Jiri Kavulak
     * Related to project of John Papa, Hans Fjällemark and Nguyễn Thiện Hùng (thienhung1989)
     */

    angular.module('toaster', []).constant(
        'toasterConfig', {
            'limit': 0,                   // limits max number of toasts
            'tap-to-dismiss': true,

            /* Options:
             - Boolean false/true
             'close-button': true
             - object if not a boolean that allows you to
             override showing the close button for each
             icon-class value
             'close-button': { 'toast-error': true, 'toast-info': false }
             */
            'close-button': false,
            'close-html': '<button class="toast-close-button" type="button">&times;</button>',
            'newest-on-top': true, 
            //'fade-in': 1000,            // done in css
            //'on-fade-in': undefined,    // not implemented
            //'fade-out': 1000,           // done in css
            //'on-fade-out': undefined,   // not implemented
            //'extended-time-out': 1000,  // not implemented
            'time-out': 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
            'icon-classes': {
                error: 'toast-error',
                info: 'toast-info',
                wait: 'toast-wait',
                success: 'toast-success',
                warning: 'toast-warning'
            },
            'body-output-type': '', // Options: '', 'trustedHtml', 'template', 'templateWithData', 'directive'
            'body-template': 'toasterBodyTmpl.html',
            'icon-class': 'toast-info',
            'position-class': 'toast-top-right', // Options (see CSS):
            // 'toast-top-full-width', 'toast-bottom-full-width', 'toast-center',
            // 'toast-top-left', 'toast-top-center', 'toast-top-right',
            // 'toast-bottom-left', 'toast-bottom-center', 'toast-bottom-right',
            'title-class': 'toast-title',
            'message-class': 'toast-message',
            'prevent-duplicates': false,
            'mouseover-timer-stop': true // stop timeout on mouseover and restart timer on mouseout
        }
        ).service(
        'toaster', [
            '$rootScope', 'toasterConfig', function ($rootScope, toasterConfig) {
                this.pop = function (type, title, body, timeout, bodyOutputType, clickHandler, toasterId, showCloseButton, toastId, onHideCallback) {
                    if (angular.isObject(type)) {
                        var params = type; // Enable named parameters as pop argument
                        this.toast = {
                            type: params.type,
                            title: params.title,
                            body: params.body,
                            timeout: params.timeout,
                            bodyOutputType: params.bodyOutputType,
                            clickHandler: params.clickHandler,
                            showCloseButton: params.showCloseButton,
                            closeHtml: params.closeHtml,
                            uid: params.toastId,
                            onShowCallback: params.onShowCallback,
                            onHideCallback: params.onHideCallback,
                            directiveData: params.directiveData
                        };
                        toastId = params.toastId;
                        toasterId = params.toasterId;
                    } else {
                        this.toast = {
                            type: type,
                            title: title,
                            body: body,
                            timeout: timeout,
                            bodyOutputType: bodyOutputType,
                            clickHandler: clickHandler,
                            showCloseButton: showCloseButton,
                            uid: toastId,
                            onHideCallback: onHideCallback
                        };
                    }
                    $rootScope.$emit('toaster-newToast', toasterId, toastId);
                };

                this.clear = function (toasterId, toastId) {
                    $rootScope.$emit('toaster-clearToasts', toasterId, toastId);
                };

                // Create one method per icon class, to allow to call toaster.info() and similar
                for (var type in toasterConfig['icon-classes']) {
                    this[type] = createTypeMethod(type);
                }

                function createTypeMethod(toasterType) {
                    return function (title, body, timeout, bodyOutputType, clickHandler, toasterId, showCloseButton, toastId, onHideCallback) {
                        if (angular.isString(title)) {
                            this.pop(
                                toasterType,
                                title,
                                body,
                                timeout,
                                bodyOutputType,
                                clickHandler,
                                toasterId,
                                showCloseButton,
                                toastId,
                                onHideCallback);
                        } else { // 'title' is actually an object with options
                            this.pop(angular.extend(title, { type: toasterType }));
                        }
                    };
                }
            }]
        ).factory(
        'toasterEventRegistry', [
            '$rootScope', function ($rootScope) {
                var deregisterNewToast = null, deregisterClearToasts = null, newToastEventSubscribers = [], clearToastsEventSubscribers = [], toasterFactory;

                toasterFactory = {
                    setup: function () {
                        if (!deregisterNewToast) {
                            deregisterNewToast = $rootScope.$on(
                                'toaster-newToast', function (event, toasterId, toastId) {
                                    for (var i = 0, len = newToastEventSubscribers.length; i < len; i++) {
                                        newToastEventSubscribers[i](event, toasterId, toastId);
                                    }
                                });
                        }

                        if (!deregisterClearToasts) {
                            deregisterClearToasts = $rootScope.$on(
                                'toaster-clearToasts', function (event, toasterId, toastId) {
                                    for (var i = 0, len = clearToastsEventSubscribers.length; i < len; i++) {
                                        clearToastsEventSubscribers[i](event, toasterId, toastId);
                                    }
                                });
                        }
                    },

                    subscribeToNewToastEvent: function (onNewToast) {
                        newToastEventSubscribers.push(onNewToast);
                    },
                    subscribeToClearToastsEvent: function (onClearToasts) {
                        clearToastsEventSubscribers.push(onClearToasts);
                    },
                    unsubscribeToNewToastEvent: function (onNewToast) {
                        var index = newToastEventSubscribers.indexOf(onNewToast);
                        if (index >= 0) {
                            newToastEventSubscribers.splice(index, 1);
                        }

                        if (newToastEventSubscribers.length === 0) {
                            deregisterNewToast();
                            deregisterNewToast = null;
                        }
                    },
                    unsubscribeToClearToastsEvent: function (onClearToasts) {
                        var index = clearToastsEventSubscribers.indexOf(onClearToasts);
                        if (index >= 0) {
                            clearToastsEventSubscribers.splice(index, 1);
                        }

                        if (clearToastsEventSubscribers.length === 0) {
                            deregisterClearToasts();
                            deregisterClearToasts = null;
                        }
                    }
                };
                return {
                    setup: toasterFactory.setup,
                    subscribeToNewToastEvent: toasterFactory.subscribeToNewToastEvent,
                    subscribeToClearToastsEvent: toasterFactory.subscribeToClearToastsEvent,
                    unsubscribeToNewToastEvent: toasterFactory.unsubscribeToNewToastEvent,
                    unsubscribeToClearToastsEvent: toasterFactory.unsubscribeToClearToastsEvent
                };
            }]
        )
        .directive('directiveTemplate', ['$compile', '$injector', function($compile, $injector) {
            return {
                restrict: 'A',
                scope: {
                    directiveName: '@directiveName',
                    directiveData: '@directiveData'
                },
                replace: true,   
                link: function (scope, elm, attrs) {
                    scope.$watch('directiveName', function (directiveName) {
                        if (angular.isUndefined(directiveName) || directiveName.length <= 0)
                            throw new Error('A valid directive name must be provided via the toast body argument when using bodyOutputType: directive');
                        
                        var directive;
                        
                        try {
                            directive = $injector.get(attrs.$normalize(directiveName) + 'Directive');
                        } catch(e) {
                            throw new Error(directiveName + ' could not be found. ' +
                                 'The name should appear as it exists in the markup, not camelCased as it would appear in the directive declaration,' +
                                 ' e.g. directive-name not directiveName.');
                        }
                        
                        
                        var directiveDetails = directive[0];
                            
                        if (directiveDetails.scope !== true && directiveDetails.scope) {
                            throw new Error('Cannot use a directive with an isolated scope. ' + 
                                'The scope must be either true or falsy (e.g. false/null/undefined). ' + 
                                'Occurred for directive ' + directiveName + '.');
                        }
                        
                        if (directiveDetails.restrict.indexOf('A') < 0) {
                            throw new Error('Directives must be usable as attributes. ' +
                              'Add "A" to the restrict option (or remove the option entirely). Occurred for directive ' + 
                              directiveName + '.');
                        }
                            
                        if (scope.directiveData)
                            scope.directiveData = angular.fromJson(scope.directiveData);
                        
                        var template = $compile('<div ' + directiveName + '></div>')(scope);

                        elm.append(template);
                    });
                }
            };
        }])
        .directive(
        'toasterContainer', [
            '$parse', '$rootScope', '$interval', '$sce', 'toasterConfig', 'toaster', 'toasterEventRegistry',
            function ($parse, $rootScope, $interval, $sce, toasterConfig, toaster, toasterEventRegistry) {
                return {
                    replace: true,
                    restrict: 'EA',
                    scope: true, // creates an internal scope for this directive (one per directive instance)
                    link: function (scope, elm, attrs) {
                        var id = 0, mergedConfig;

                        // Merges configuration set in directive with default one
                        mergedConfig = angular.extend({}, toasterConfig, scope.$eval(attrs.toasterOptions));

                        scope.config = {
                            toasterId: mergedConfig['toaster-id'],
                            position: mergedConfig['position-class'],
                            title: mergedConfig['title-class'],
                            message: mergedConfig['message-class'],
                            tap: mergedConfig['tap-to-dismiss'],
                            closeButton: mergedConfig['close-button'],
                            closeHtml: mergedConfig['close-html'],
                            animation: mergedConfig['animation-class'],
                            mouseoverTimer: mergedConfig['mouseover-timer-stop']
                        };

                        scope.$on(
                            "$destroy", function () {
                                toasterEventRegistry.unsubscribeToNewToastEvent(scope._onNewToast);
                                toasterEventRegistry.unsubscribeToClearToastsEvent(scope._onClearToasts);
                            }
                            );

                        function setTimeout(toast, time) {
                            toast.timeoutPromise = $interval(
                                function () {
                                    scope.removeToast(toast.id);
                                }, time, 1
                                );
                        }

                        scope.configureTimer = function (toast) {
                            var timeout = angular.isNumber(toast.timeout) ? toast.timeout : mergedConfig['time-out'];
                            if (typeof timeout === "object") timeout = timeout[toast.type];
                            if (timeout > 0) {
                                setTimeout(toast, timeout);
                            }
                        };

                        function addToast(toast, toastId) {
                            toast.type = mergedConfig['icon-classes'][toast.type];
                            if (!toast.type) {
                                toast.type = mergedConfig['icon-class'];
                            }

                            if (mergedConfig['prevent-duplicates'] === true) {
                                // Prevent adding duplicate toasts if it's set
                                if (isUndefinedOrNull(toastId)) {
                                    if (scope.toasters.length > 0 && scope.toasters[scope.toasters.length - 1].body === toast.body) {
                                        return;
                                    }
                                } else {
                                    var i, len;
                                    for (i = 0, len = scope.toasters.length; i < len; i++) {
                                        if (scope.toasters[i].uid === toastId) {
                                            removeToast(i);
                                            // update loop
                                            i--;
                                            len = scope.toasters.length;
                                        }
                                    }
                                }
                            }

                            toast.id = ++id;
                            // Sure uid defined
                            if (!isUndefinedOrNull(toastId)) {
                                toast.uid = toastId;
                            }

                            // set the showCloseButton property on the toast so that
                            // each template can bind directly to the property to show/hide
                            // the close button
                            var closeButton = mergedConfig['close-button'];

                            // if toast.showCloseButton is a boolean value,
                            // it was specifically overriden in the pop arguments
                            if (typeof toast.showCloseButton === "boolean") {

                            } else if (typeof closeButton === "boolean") {
                                toast.showCloseButton = closeButton;
                            } else if (typeof closeButton === "object") {
                                var closeButtonForType = closeButton[toast.type];

                                if (typeof closeButtonForType !== "undefined" && closeButtonForType !== null) {
                                    toast.showCloseButton = closeButtonForType;
                                }
                            } else {
                                // if an option was not set, default to false.
                                toast.showCloseButton = false;
                            }
                            
                            if (toast.showCloseButton) {
                                toast.closeHtml = $sce.trustAsHtml(toast.closeHtml || scope.config.closeHtml);
                            }
                             
                            // Set the toast.bodyOutputType to the default if it isn't set
                            toast.bodyOutputType = toast.bodyOutputType || mergedConfig['body-output-type'];
                            switch (toast.bodyOutputType) {
                                case 'trustedHtml':
                                    toast.html = $sce.trustAsHtml(toast.body);
                                    break;
                                case 'template':
                                    toast.bodyTemplate = toast.body || mergedConfig['body-template'];
                                    break;
                                case 'templateWithData':
                                    var fcGet = $parse(toast.body || mergedConfig['body-template']);
                                    var templateWithData = fcGet(scope);
                                    toast.bodyTemplate = templateWithData.template;
                                    toast.data = templateWithData.data;
                                    break;
                                case 'directive':
                                    toast.html = toast.body;
                                    break;
                            }

                            scope.configureTimer(toast);
                            
                            if (mergedConfig['newest-on-top'] === true) {
                                scope.toasters.unshift(toast);
                                if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                                    scope.toasters.pop();
                                }
                            } else {
                                scope.toasters.push(toast);
                                if (mergedConfig['limit'] > 0 && scope.toasters.length > mergedConfig['limit']) {
                                    scope.toasters.shift();
                                }
                            }
                            
                            if (angular.isFunction(toast.onShowCallback)) {
                                toast.onShowCallback();
                            }
                        }

                        scope.removeToast = function (id) {
                            var i, len;
                            for (i = 0, len = scope.toasters.length; i < len; i++) {
                                if (scope.toasters[i].id === id) {
                                    removeToast(i);
                                    break;
                                }
                            }
                        };

                        function removeToast(toastIndex) {
                            var toast = scope.toasters[toastIndex];
                            
                            // toast is always defined since the index always has a match
                            if (toast.timeoutPromise) {
                                $interval.cancel(toast.timeoutPromise);
                            }
                            scope.toasters.splice(toastIndex, 1);

                            if (angular.isFunction(toast.onHideCallback)) {
                                toast.onHideCallback();
                            }
                        }

                        function removeAllToasts(toastId) {
                            for (var i = scope.toasters.length - 1; i >= 0; i--) {
                                if (isUndefinedOrNull(toastId)) {
                                    removeToast(i);
                                } else {
                                    if (scope.toasters[i].uid == toastId) {
                                        removeToast(i);
                                    }
                                }
                            }
                        }

                        scope.toasters = [];

                        function isUndefinedOrNull(val) {
                            return angular.isUndefined(val) || val === null;
                        }

                        scope._onNewToast = function (event, toasterId, toastId) {
                            // Compatibility: if toaster has no toasterId defined, and if call to display
                            // hasn't either, then the request is for us

                            if ((isUndefinedOrNull(scope.config.toasterId) && isUndefinedOrNull(toasterId)) || (!isUndefinedOrNull(scope.config.toasterId) && !isUndefinedOrNull(toasterId) && scope.config.toasterId == toasterId)) {
                                addToast(toaster.toast, toastId);
                            }
                        };
                        scope._onClearToasts = function (event, toasterId, toastId) {
                            // Compatibility: if toaster has no toasterId defined, and if call to display
                            // hasn't either, then the request is for us
                            if (toasterId == '*' || (isUndefinedOrNull(scope.config.toasterId) && isUndefinedOrNull(toasterId)) || (!isUndefinedOrNull(scope.config.toasterId) && !isUndefinedOrNull(toasterId) && scope.config.toasterId == toasterId)) {
                                removeAllToasts(toastId);
                            }
                        };

                        toasterEventRegistry.setup();

                        toasterEventRegistry.subscribeToNewToastEvent(scope._onNewToast);
                        toasterEventRegistry.subscribeToClearToastsEvent(scope._onClearToasts);
                    },
                    controller: [
                        '$scope', '$element', '$attrs', function ($scope, $element, $attrs) {
                            // Called on mouseover
                            $scope.stopTimer = function (toast) {
                                if ($scope.config.mouseoverTimer === true) {
                                    if (toast.timeoutPromise) {
                                        $interval.cancel(toast.timeoutPromise);
                                        toast.timeoutPromise = null;
                                    }
                                }
                            };

                            // Called on mouseout
                            $scope.restartTimer = function (toast) {
                                if ($scope.config.mouseoverTimer === true) {
                                    if (!toast.timeoutPromise) {
                                        $scope.configureTimer(toast);
                                    }
                                } else if (toast.timeoutPromise === null) {
                                    $scope.removeToast(toast.id);
                                }
                            };

                            $scope.click = function (toast, isCloseButton) {
                                if ($scope.config.tap === true || (toast.showCloseButton === true && isCloseButton === true)) {
                                    var removeToast = true;
                                    if (toast.clickHandler) {
                                        if (angular.isFunction(toast.clickHandler)) {
                                            removeToast = toast.clickHandler(toast, isCloseButton);
                                        } else if (angular.isFunction($scope.$parent.$eval(toast.clickHandler))) {
                                            removeToast = $scope.$parent.$eval(toast.clickHandler)(toast, isCloseButton);
                                        } else {
                                            console.log("TOAST-NOTE: Your click handler is not inside a parent scope of toaster-container.");
                                        }
                                    }
                                    if (removeToast) {
                                        $scope.removeToast(toast.id);
                                    }
                                }
                            };
                        }],
                    template: 
                        '<div id="toast-container" ng-class="[config.position, config.animation]">' + 
                            '<div ng-repeat="toaster in toasters" class="toast" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)" ng-mouseout="restartTimer(toaster)">' + 
                                '<div ng-if="toaster.showCloseButton" ng-click="click(toaster, true)" ng-bind-html="toaster.closeHtml"></div>' + 
                                '<div ng-class="config.title">{{toaster.title}}</div>' + 
                                '<div ng-class="config.message" ng-switch on="toaster.bodyOutputType">' + 
                                    '<div ng-switch-when="trustedHtml" ng-bind-html="toaster.html"></div>' + 
                                    '<div ng-switch-when="template"><div ng-include="toaster.bodyTemplate"></div></div>' + 
                                    '<div ng-switch-when="templateWithData"><div ng-include="toaster.bodyTemplate"></div></div>' +
                                    '<div ng-switch-when="directive"><div directive-template directive-name="{{toaster.html}}" directive-data="{{toaster.directiveData}}"></div></div>' + 
                                    '<div ng-switch-default >{{toaster.body}}</div>' + 
                                '</div>' + 
                            '</div>' + 
                        '</div>'
                };
            }]
        );
})(window, document);
require("./toaster.js");
module.exports = "toaster";

/**
  * Created by FMG on 11/03/2016.
  */
angular
  .module('ocf.services')
  .service('NoConnectivityPopupService', NoConnectivityPopupService);

NoConnectivityPopupService.$inject = [
  '$q',
  '$ionicModal',
  'lodash',
  '$log',
  '$rootScope',
  '$timeout',
  '$ionicBackdrop',
  '$translate'
];

function NoConnectivityPopupService($q,
                                    $ionicModal,
                                    lodash,
                                    $log,
                                    $rootScope,
                                    $timeout,
                                    $ionicBackdrop,
                                    $translate) {
  var asps = this;

  asps.close = close;
  asps.retry = retry;
  asps.create = create;
  asps.destroy = destroy;
  asps.open = open;
  asps.isShown = isShown;


  asps.noConnectivity = undefined;
  asps.noConnectivityTemplate = 'noConnectivityPopUp/noConnectivityPopup.html';
  asps.noConnectivityPopupOptions = {
    animation: 'none',
    focusFirstInput: false,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  };

  return asps;

  ////////////////////
  /**
   * Closes the popup
   */
  function close() {
    asps.noConnectivity.hide();
    $timeout(function() {
      $ionicBackdrop.release();
      $('body').removeClass('modal-open');
    }, 1000);
    $rootScope.$broadcast('noConnectivityClose', true);
    $log.debug("No Connectivity Close button clicked");
  }


  /**
   * Confirm button clicked
   */
  function retry() {
    asps.noConnectivity.hide();
    $timeout(function() {
      $ionicBackdrop.release();
      $('body').removeClass('modal-open');
    }, 1000);
    $rootScope.$broadcast('noConnectivityRetry', true);
    $log.debug("No Connectivity retry button clicked");
  }


  /**
   * Creates template and stores the pointer to it
   * @param template {String}
   * @param {Object} [options]
   */
  function create(template, options) {
    var q = $q.defer();
    template = template || asps.noConnectivityTemplate;

    if (options) {
      lodash.merge(asps.noConnectivityPopupOptions, options);
    }

    $ionicModal.fromTemplateUrl(template, asps.noConnectivityPopupOptions)
      .then(function (popup) {
        $log.debug("No Connectivity Popup created", popup);
        asps.noConnectivity = popup;
        q.resolve("Popup Created");
      })
      .catch(function (fail) {
        $log.error("No Connectivity Popup failed to load", fail);
        q.reject(fail);
      });

    return q.promise;
  }


  /**
   * Removes popup from DOM
   */
  function destroy() {
    $timeout(function() {
      $ionicBackdrop.release();
    }, 1000);
    asps.noConnectivity.remove();
    $log.debug("No Connectivity removed from DOM");
  }


  /**
   * Called when open is needed
   */
  function open() {
    $timeout(function() {
      asps.noConnectivity.show();
      $ionicBackdrop.retain();
    }, 1000);
    $log.debug("No Connectivitye Open button clicked");
  }

  function isShown() {
    return  asps.noConnectivity.isShown();
  }
}

angular
  .module('ocf.controllers')
  .controller('HomeController', HomeController);

HomeController.$inject = [
  'SessionService',
  'navigateTo',
  '$rootScope',
  '$scope',
  '$ionicPlatform',
  '$log',
  'lodash',
  'LoggingService',
  '$ionicViewSwitcher',
  '$ionicSideMenuDelegate',
  '$translate',
  'LoadingService'
];

function HomeController(SessionService,
                        navigateTo,
                        $rootScope,
                        $scope,
                        $ionicPlatform,
                        $log,
                        _,
                        LoggingService,
                        $ionicViewSwitcher,
                        $ionicSideMenuDelegate,
                        $translate,
                        LoadingService) {
  $scope.goToPreviousState = goToPreviousState;
  var deregisterGoToPreviousState;
  $scope.loadingMessage = "loading";
  $scope.$on('$ionicView.beforeEnter', function () {
    LoadingService.hide();
  });


  $scope.$on('$ionicView.beforeEnter', function () {

    $translate('OCF.MESSAGES.LOADING').then(function (result) {
      $scope.loadingMessage = result;
    });

    $scope.checkDevice = !!$rootScope.ocfConfigs.filterAppListByDeviceModel;

    deregisterGoToPreviousState = $ionicPlatform.registerBackButtonAction(goToPreviousState, 501);

    $rootScope.app = null;
    $rootScope.isPilot = false;

    $scope.locations = SessionService.getUserLocations($rootScope.user.id);
    $scope.hideBackButton = $scope.locations.length == 1;
    $scope.subApps = [
      {
        appName: "Shipping",
        appCacheName: 'G10',
        selected: false
      },
      {
        appName: "Put Away",
        appCacheName: 'G04',
        selected: false
      }
    ];

    var appPosition = _.findIndex($scope.subApps, {"appCacheName": $rootScope.lastApp});

    if (appPosition == -1) {
      $scope.subApps[0].selected = true;
    } else {
      $scope.subApps[appPosition].selected = true;
    }

    var supplierApps = [];

    _.remove($scope.subApps, function (app) {
      return !_.find($rootScope.appsList, {"appName": app.appCacheName});
    });

    supplierApps =_.map($scope.subApps, 'appCacheName');

    $rootScope.apps = _.filter($rootScope.selectedLocation.appLocations, function (app) {
      return supplierApps.indexOf(app.application) != -1;
    });

    _.forEach($rootScope.apps, function (app, index) {
      var subApp = _.find($scope.subApps, {"appCacheName": app.application});
      $rootScope.apps[index].supportedDevice = subApp.supportedDevice;
    });

    if (!$scope.deviceModel && window.device){
      $scope.deviceModel = window.device.model;
    }

    // Filters app that do not belong to the current Device
    if ($scope.deviceModel && $scope.checkDevice) _.remove($rootScope.apps, function (app) {
      var isValidApp = new RegExp(app.supportedDevice);
      return !$scope.deviceModel.match(isValidApp);
    });

    if ($rootScope.apps.length == 1) {
      var availableApp = $rootScope.apps[0];
      var appIndex = _.findIndex($scope.subApps, {"appCacheName": availableApp.application});
      $scope.subApps[appIndex].selected = true;
      $rootScope.app = angular.copy($scope.subApps[appIndex]);
      $rootScope.app.appCacheName = $rootScope.app.appCacheName.toUpperCase();
      $rootScope.isPilot = $rootScope.app.appName == "Shipping";
      $rootScope.appLocationId = availableApp.idUUID;

      LoggingService.logMessage(
        LoggingService.CONSTANTS.APP.OCF_LOGIN,
        LoggingService.CONSTANTS.CONTEXT.OCF_APP_SELECTOR,
        'auto_select_application',
        'Only one application, skipping screen',
        'success',
        [{'key': 'application', 'value': JSON.stringify(availableApp)}]
      );

      navigateTo[availableApp.application.toLowerCase()]();
    }
  });

  $scope.$on('$ionicView.beforeLeave', function () {
    $log.debug('$ionicView.beforeLeave');
    $ionicPlatform.offHardwareBackButton(goToPreviousState);
  });

  $scope.selectApp = function () {

    LoadingService.show($scope.loadingMessage);

    $rootScope.app = _.find($scope.subApps, {"selected": true});

    var availableApp = _.find($rootScope.selectedLocation.appLocations, {"application": $rootScope.app.appCacheName});
    $rootScope.app.appCacheName = $rootScope.app.appCacheName.toUpperCase();
    $rootScope.isPilot = $rootScope.app.appName == "Shipping";
    $rootScope.appLocationId = availableApp.idUUID;
    $rootScope.lastApp = $rootScope.app.appCacheName;
    LoggingService.logMessage(
      LoggingService.CONSTANTS.APP.OCF_LOGIN,
      LoggingService.CONSTANTS.CONTEXT.OCF_APP_SELECTOR,
      'auto_select_application',
      'Only one application, skipping screen',
      'success',
      [{'key': 'application', 'value': JSON.stringify(availableApp)}]
    );

    navigateTo[availableApp.application.toLowerCase()]();
  };

  $scope.selectListAppItem = function (item, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i] == item) {
        if (!list[i].selected) {
          list[i].selected = true;
        }
      } else {
        list[i].selected = false;
      }
    }
  };

  $scope.$on('$destroy', function () {
    $log.debug("$destroy");
    deregisterGoToPreviousState();
  });

  /**
   * Function that overrides the hardware back button behavior
   */
  function goToPreviousState() {
    $ionicViewSwitcher.nextDirection('back');

    if ($ionicSideMenuDelegate.isOpen()) {
      $ionicSideMenuDelegate.toggleRight(false);
    }
  }
}


/**
 * Created by FMG on 11/03/2016.
 */
angular
  .module('ocf.services')
  .service('AutoLogoutPopupService', AutoLogoutPopupService);

AutoLogoutPopupService.$inject = ['$q', '$ionicModal', 'lodash', '$log', '$rootScope', '$ionicBackdrop', '$window'];

function AutoLogoutPopupService($q, $ionicModal, lodash, $log, $rootScope, $ionicBackdrop, $window) {
  var asps = this;

  asps.close = close;
  asps.create = create;
  asps.destroy = destroy;
  asps.open = open;
  asps.isShown = isShown;

  asps.autoLogout = undefined;
  asps.autoLogoutTemplate = 'autoLogoutPopUp/autoLogoutPopup.html';
  asps.autoLogoutPopupOptions = {
    animation: 'none',
    focusFirstInput: false,
    backdropClickToClose: false,
    hardwareBackButtonClose: false
  };

  return asps;

  ////////////////////
  /**
   * Closes the popup
   */
  function close() {
    asps.autoLogout.remove();
    $ionicBackdrop.release();
    $rootScope.$broadcast('autoLogoutClose', true);

    $window.localStorage.setItem('sessionExpired', 'false');
  }

  /**
   * Creates template and stores the pointer to it
   * @param template {String}
   * @param {Object} [options]
   */
  function create(template, options) {
    var q = $q.defer();
    template = template || asps.autoLogoutTemplate;

    if (options) {
      lodash.merge(asps.autoLogoutPopupOptions, options);
    }

    $ionicModal.fromTemplateUrl(template, asps.autoLogoutPopupOptions)
      .then(function (popup) {
        $log.debug("AutoLogout Popup created", popup);
        asps.autoLogout = popup;
        q.resolve("Popup Created");
      })
      .catch(function (fail) {
        $log.error("AutoLogout Popup failed to load", fail);
        q.reject(fail);
      });

    return q.promise;
  }

  /**
   * Removes popup from DOM
   */
  function destroy() {
    asps.autoLogout.remove();
    $log.debug("AutoLogout removed from DOM");
  }

  /**
   * Called when open is needed
   */
  function open() {
    asps.autoLogout.show();
    $ionicBackdrop.retain();
    $log.debug("AutoLogout Open button clicked");
  }

  function isShown() {
    return asps.autoLogout.isShown();
  }
}

// Ionic Starter App
var translateProvider;
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('ocf', [
  'ionic',
  'ngCordova',
  'ngResource',
  'ocf.templates',
  'ocf.constants',
  'ocf.services',
  'ocf.directives',
  'ocf.interceptors',
  'ocf.filters',
  'ocf.login',
  'ocf.forgotPassword',
  'ocf.changePassword',
  'ocf.controllers',
/*  'supplier.controllers',*/
  /*'supplier.menu',*/
  'ngLodash',
  'pouchdb',
  'pascalprecht.translate',
  'limitStringFilter',
  'ngMockE2E'
  ])


  .run(["$rootScope", "$state", "$interval", "$ionicPlatform", "$cordovaKeyboard", "EnvironmentConfig", "LoadingService", "SessionService", "navigateTo", "ScanService", "$log", "$translate", "DataLayerService", "$window", "LoggingService", "$httpBackend", "StagingConfig", "URLManager", "EventHandlerService", function ($rootScope,
                 $state,
                 $interval,
                 $ionicPlatform,
                 $cordovaKeyboard,
                 EnvironmentConfig,
                 LoadingService,
                 SessionService,
                 navigateTo,
                 ScanService,
                 $log,
                 $translate,
                 DataLayerService,
                 $window,
                 LoggingService,
                 $httpBackend,
                 StagingConfig,
                 URLManager,
                 EventHandlerService) {
    EventHandlerService.setCurrentState('ocf.run');
    var debugging = false;

    if (debugging) {
      var storageAreas = [
        {
          id: 1,
          barcode: "SA01",
          name: "SA01",
          headerColor: "#62a539",
          bodyColor: "#6db33f"
        },
        {
          id: 2,
          barcode: "SA02",
          name: "Storage Area 02",
          headerColor: "#62a539",
          bodyColor: "#6db33f"

        },
        {
          id: 3,
          barcode: "SA03",
          name: "SA03",
          headerColor: "#c4161c",
          bodyColor: "#ed1c24"
        },
        {
          id: 4,
          barcode: "SA04",
          name: "Storage Area 04",
          headerColor: "darkorange",
          bodyColor: "orange"
        },
        {
          id: 5,
          barcode: "SA05",
          name: "Storage Area 05",
          headerColor: "#2b0a4b",
          bodyColor: "rebeccapurple"
        },
        {
          id: 6,
          barcode: "SA06",
          name: "Storage Area 06",
          headerColor: "#62a539",
          bodyColor: "#6db33f"
        }
      ];

      var palletInfo = {
        pallet: {
          tagEpc: "330C4DE26110028099998001",
          product: {
            id: 23,
            product: "Romaine Lettuce"
          },
          ziprCode: "16-330",
          putAway: true,
          storageArea: {}
        },
        storageAreaValidation: false
      };

      var restMessages = {
        G04201: {code: 200, message: "G04-201"},
        G04202: {code: 200, message: "G04-202"},
        G04401: {status: 400, data: {defaultErrorMessage: "", errorCode: "G04-401"}},
        G04402: {status: 400, data: {defaultErrorMessage: "", errorCode: "G04-402"}}
      };

      $httpBackend.whenGET(/.+storage\/area\/assign\/pallet.+/).respond(function (method, url, data) {
        var extract_epc_phId = /pallet\/(.+)\/packhouse\/(.+)$/;
        var epc_phId = extract_epc_phId.exec(url);

        palletInfo.pallet.storageAreaValidation = epc_phId[1].indexOf("1111") != -1;
        palletInfo.pallet.tagEpc = epc_phId[1];
        palletInfo.pallet.storageArea = storageAreas[Math.floor(Math.random() * 6)];

        return [200, palletInfo];
      });

      $httpBackend.whenPOST(URLManager.getUrl('confirmSA')).respond(function (method, url, data) {
        var obj = JSON.parse(data);

        if (!navigator.onLine) return  [0, {}];

        if (_(storageAreas).find({"barcode": obj.storageArea})) {
          return [restMessages.G04201.code, restMessages.G04201];
        } else {
          return [restMessages.G04402.code, restMessages.G04402.data];
        }
      });

      $httpBackend.whenPOST(URLManager.getUrl('unassignSA')).respond(function (method, url, data) {
        var obj = JSON.parse(data);

        if (obj.tagEpc) {
          return [200, {code: 200, message: "G04-202"}];
        } else {
          return [400, {code: 400, message: "G04-401"}];
        }
      });
    }

    angular.forEach(['GET', 'DELETE', 'JSONP', 'HEAD', 'PUT', 'POST', 'PATCH'], function (method) {
      $httpBackend.when(method).passThrough();
    });

    $ionicPlatform.ready(function () {
      $rootScope.translateProvider = translateProvider;

      $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
        $translate.refresh();
      });

      $translate.use('en'); // FORCES 'en' as default language, regarding the browser definition

      if (window.StatusBar) {
        StatusBar.hide();
      }

      if (window.cordova) {
        window.addEventListener('native.keyboardshow', function(){
          document.body.classList.add('keyboard-open');
        });

        var removeKeyboardOpen = function(){
          setTimeout(function () {
            document.body.classList.remove('keyboard-open');
          }, 1000);
        };

        window.addEventListener('native.keyboardhide', removeKeyboardOpen);

        $rootScope.$watch(function () {
          return $cordovaKeyboard.isVisible();
        }, function (value) {
          $rootScope.$broadcast("keyboard.open", value);
        });

        if (window.cordova.plugins && window.cordova.plugins.autoStart) {
          window.cordova.plugins.autoStart.enable();
        }

        //initialize the native scanner on the TC-55 if it exists
        ScanService.initialize();

        if (window.hockeyapp) {
          window.hockeyapp.start(function (message) {
            $log.debug(message);
          }, function (message) {
            console.error(message);
          }, "9f3c70eff11ea8481da53c438fd2ec18");
        }

        if (window.cordova.plugins.Keyboard) {
          $cordovaKeyboard.hideAccessoryBar(true);
        }

        if (window.cordova.getAppVersion) {
          window.cordova.getAppVersion(function (version) {
            if (version == "N/A") {
              version = "Version Unavailable";
            }

            $rootScope.appVersion = version;
            $rootScope.$broadcast('appVersion', version);
          });
        }

        if (window.cordova.plugins.backgroundMode) {
          // Enable background mode
          cordova.plugins.backgroundMode.enable();

          var timer = 0;
          var stop;

          // Called when background mode has been activated
          cordova.plugins.backgroundMode.onactivate = function () {
            $log.debug("Went background");

            if ($rootScope.user && $rootScope.user.id) {
              var timeout = $rootScope.stagingConfiguration.userInactivityTimeout;
              timeout = !!timeout ? timeout : 0;

              var today = new Date();
              var now = today.getTime();

              if (timeout) {
                timeout = now + timeout;
              }

              var timeout_date = new Date(timeout);
              $log.debug('Background Time: ' + today + ' Log out at: ' + timeout_date);

              stop = $interval(function () {
                var today_interval = new Date();
                var now_interval = today_interval.getTime();

                $log.debug('trying logout at date: ' + today_interval);
                //check if it should be logged out
                if (now_interval >= timeout) {
                  //stop any ongoing replication if it exists
                  if (!!$rootScope.replicationHandler) {
                    $log.debug("Cancelling replication");
                    $rootScope.replicationHandler.cancel();
                  }

                  //force a logout
                  SessionService.destroy();
                  $log.debug("User logged out successfully");
                  $window.localStorage.setItem('sessionExpired', 'true');
                  document.location = "index.html"; // forces memory data cleanup
                  SessionService.clearCredentials();
                  //navigateTo.login();
                }
              }, 10000);
            }
          };

          cordova.plugins.backgroundMode.ondeactivate = function () {
            $log.debug("Went foreground");

            $rootScope.$broadcast('background', true);

            timer = 0;
            $interval.cancel(stop);
            stop = undefined;

          };
        }
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
        window.addEventListener('native.keyboardhide', function () {
          window.StatusBar.hide();
        });
        window.addEventListener('native.keyboardshow', function () {
          window.StatusBar.hide();
        });
      }

      //The default status is online, as it is the login
      $rootScope.isOnline = true;

      //Network status indicators
      document.addEventListener("online",
        function(){
        $rootScope.isOnline = true;
          $log.debug("Went Online");
        }, false);

      document.addEventListener("offline",
        function(){
          $rootScope.isOnline = false;
          $log.debug("Went Offline");
        }, false);

      $rootScope.onPauseEvent = function(event) {

        if ($rootScope.user) {
          var dataRecover = {};

          if (window.localStorage.getItem("dataRecover")) {
            dataRecover = JSON.parse(window.localStorage.getItem("dataRecover"));
          }

          var loginData = {
            user: $rootScope.user,
            configuration: $rootScope.stagingConfiguration,
            userConfiguration: $rootScope.userConfiguration,
            selectedLanguage: $rootScope.selectedLanguage,
            checkDevice: $rootScope.checkDevice,
            filterAppListByDeviceModel: $rootScope.filterAppListByDeviceModel,
            selectedLocation: $rootScope.selectedLocation,
            locations: $rootScope.user.locations,
            selectedApp: $rootScope.app,
            userRecoverData: $rootScope.userRecoverData
          };

          dataRecover.loginData = loginData;
          dataRecover.hasToRecover = true;
          dataRecover.createdDateTime = (new Date()).toISOString();

          LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_PAUSE, 'onPause callback', 'Saving Data recover', 'success',
            [{'key': 'dataRecover', 'value': JSON.stringify(dataRecover)}], $rootScope.user != undefined);

          window.localStorage.setItem("dataRecover", JSON.stringify(dataRecover));

          /*if ($rootScope.onPause) {

           LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_PAUSE, 'onPause callback', 'Calling onPause override method', 'success',
           [], $rootScope.user != undefined);

           $rootScope.onPause();
           }*/
        }
      };

      $rootScope.onResumeEvent = function(event) {

        $rootScope.appResumed = true;

        LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_RESUME, 'onResume callback', 'Checking Data recover', 'success',
          [], $rootScope.user != undefined);

        if ($rootScope.user) {

          var dataRecover = undefined;

          LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_RESUME, 'onResume callback', 'There is no data to recover', 'success',
            [{'key': 'hasToRecover', 'value': false}], true);

          if (window.localStorage.getItem("dataRecover")) {
            window.localStorage.setItem("dataRecover", JSON.stringify({}));
          }
        } else {

          LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_RESUME, 'onResume callback',
            'There is data to recover, firing dataRecover event', 'success', [], false);

          $rootScope.$broadcast("dataRecover", event);
        }

      };

      $rootScope.onDeviceReadyEvent = function() {
        console.log('deviceready');

        window.navigationbar.setUp(true);

        LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_DEVICE_READY, 'onDeviceReady callback',
          'checking Data recover', 'success', [], false);

        if (!$rootScope.appResumed) {

          LoggingService.logMessage(LoggingService.CONSTANTS.APP.OCF_DATA_RECOVER, LoggingService.CONSTANTS.CONTEXT.ON_DEVICE_READY, 'onDeviceReady callback',
            'There is data to recover, firing dataRecover event', 'success', [], false);

          $rootScope.$broadcast("dataRecover", event);
        }
      };

      //Add Pause event listener
      document.addEventListener("pause", $rootScope.onPauseEvent, false);

      //Add Resume event listener for autolock
      document.addEventListener("resume", $rootScope.onResumeEvent, false);

      document.addEventListener('deviceready', $rootScope.onDeviceReadyEvent, false);

      var isMC = new RegExp(/^MC92N0$/);

      if (window.device && window.device.model.match(isMC)){
        document.addEventListener('touchcancel', function (cancelEvent) {
          handleTouch(cancelEvent);
        });

        document.addEventListener('touchmove', function (moveEvent) {
          handleTouch(moveEvent);
        });
      }

      function handleTouch(event){
        if ($rootScope.lastMove + 100 < event.timeStamp ){

          var touch = event.changedTouches[0];
          var Xpos = event.changedTouches[0].screenX;
          var Ypos = event.changedTouches[0].screenY;

          if ($(touch.target).is("input")){
            $(touch.target).focus();
            cordova.plugins.Keyboard.show();
          }else if($(touch.target).parent().is("input")){
            $(touch.target).parent().focus();
            cordova.plugins.Keyboard.show();
          }else if ($(touch.target).children().is("input")){
            $(touch.target).children().focus();
            cordova.plugins.Keyboard.show();
          }else if($(touch.target).is("button")){
            $(touch.target).click();
            cordova.plugins.Keyboard.close();
          }else if ($(document.elementFromPoint(Xpos , Ypos)).attr('ng-click') != undefined){
            angular.element(document.elementFromPoint(Xpos , Ypos )).triggerHandler('click');
            cordova.plugins.Keyboard.close();
          } else if ($($(document.elementFromPoint(Xpos , Ypos)).parent()).attr('ng-click') != undefined){
            angular.element($(document.elementFromPoint(Xpos , Ypos )).parent()).triggerHandler('click');
            cordova.plugins.Keyboard.close();
          }else if ($($(document.elementFromPoint(Xpos , Ypos)).children()).attr('ng-click') != undefined){
            angular.element($(document.elementFromPoint(Xpos , Ypos )).children()).triggerHandler('click');
            cordova.plugins.Keyboard.close();
          }
          if (event.type == "touchcancel"){
            event.preventDefault();
          }
        }
        $rootScope.lastMove = event.timeStamp;
      }

    });
  }])

  .config(["$stateProvider", "$provide", "$urlRouterProvider", "$ionicConfigProvider", "$compileProvider", "$httpProvider", "$translatePartialLoaderProvider", "$translateProvider", function ($stateProvider, $provide, $urlRouterProvider, $ionicConfigProvider, $compileProvider, $httpProvider, $translatePartialLoaderProvider, $translateProvider) {
    translateProvider = $translateProvider;

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $compileProvider.debugInfoEnabled(false);
    $ionicConfigProvider.views.maxCache(2);
    //this disables the iOS native swipeBack scrolling
    $ionicConfigProvider.views.swipeBackEnabled(false);
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.tabs.style("standard");
    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.navBar.alignTitle('center');

    // Translation configuration
    $translatePartialLoaderProvider.addPart('ocf/locales');
    $translateProvider
      .useLoader('$translatePartialLoader', {
        urlTemplate: '{part}/{lang}.json'
      })
      .registerAvailableLanguageKeys(['en', 'es'], {
        'en_*': 'en',
        'es_*': 'es'
      })
      .preferredLanguage('en')
      .fallbackLanguage('en')
      .determinePreferredLanguage();

    //$q.allSettled implementation
    //allows to wait for multiple promises and don't reject if one fails
    $provide.decorator('$q', ['$delegate', function ($delegate) {
      var $q = $delegate;

      // Extention for q
      $q.allSettled = $q.allSettled || function (promises) {
          var deferred = $q.defer();
          if (angular.isArray(promises)) {
            var states = [];
            var results = [];
            var didAPromiseFail = false;

            // First create an array for all promises setting their state to false (not completed)
            angular.forEach(promises, function (promise, key) {
              states[key] = false;
            });

            // Helper to check if all states are finished
            var checkStates = function (states, results, deferred, failed) {
              var allFinished = true;
              angular.forEach(states, function (state, key) {
                if (!state) {
                  allFinished = false;
                  return;
                }
              });
              if (allFinished) {
                if (failed) {
                  deferred.reject(results);
                } else {
                  deferred.resolve(results);
                }
              }
            };

            // Loop through the promises
            // a second loop to be sure that checkStates is called when all states are set to false first
            angular.forEach(promises, function (promise, key) {
              $q.when(promise).then(function (result) {
                states[key] = true;
                results[key] = result;
                checkStates(states, results, deferred, didAPromiseFail);
              }, function (reason) {
                states[key] = true;
                results[key] = reason;
                didAPromiseFail = true;
                checkStates(states, results, deferred, didAPromiseFail);
              });
            });
          } else {
            throw 'allSettled can only handle an array of promises (for now)';
          }

          return deferred.promise;
        };

      return $q;
    }]);

    $provide.decorator('ionPagerDirective', ["$delegate", function ($delegate) {
      var delegate = $delegate[0];

      delegate.template = '' +
        '<div class="slider-pager">' +
        ' <ul>' +
        '   <li class="slider-pager-page"' +
        '       ng-repeat="slide in numSlides() track by $index"' +
        '       ng-class="{active: $index == currentSlide}"' +
        '       ng-click="pagerClick($index, numSlides().length)"' +
        '       ng-show="belongsToCurrentPage($index)">' +
        '     <div></div>' +
        '   </li>' +
        ' </ul>' +
        ' <div class="gallery-nav-buttons bottom">' +
        '   <div class="nav-button left" ng-click="prevGalleryPage()" ng-if="!isFirstPage()">' +
        '     <i class="icon ion-chevron-left"></i>' +
        '   </div>' +
        '   <div class="nav-button right" ng-click="nextGalleryPage(numSlides().length)" ng-if="!isLastPage(numSlides().length)">' +
        '     <i class="icon ion-chevron-right"></i>' +
        '   </div>' +
        ' </div>' +
        '</div>';
      return $delegate;
    }]);

    // Removed default backdrop in modals
    $provide.decorator('ionModalDirective', ["$delegate", function ($delegate) {
      var delegate = $delegate[0];
      delegate.template = '' +
        '<div class="modal-backdrop">' +
        ' <div class="modal-wrapper" ng-transclude></div>' +
        '</div>';
      return $delegate;
    }]);

    $stateProvider
    // Login screen
      .state('ocf', {
        url: "",
        abstract: true,
        template: '<ion-view view-title="OCF"><ion-nav-view name="ocf"></ion-nav-view></ion-view> ',
        controller: 'AppCtrl'
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  }])

  .controller('AppCtrl', ["$rootScope", "$ionicHistory", "$scope", "encode", "$state", "$ionicModal", "$ionicPopup", "$ionicLoading", "$ionicSlideBoxDelegate", "$timeout", "$log", "SessionService", "SessionConfig", "ReplicationService", "navigateTo", "$q", "MessageService", "CouchDbConfig", "lodash", "InitializationService", "LoadingService", "$cordovaDialogs", "$cordovaBarcodeScanner", "$ionicViewSwitcher", "$ionicBackdrop", "DataLayerService", "$window", "NoConnectivityPopupService", "LanguageSelectorService", function ($rootScope,
                                   $ionicHistory,
                                   $scope,
                                   encode,
                                   $state,
                                   $ionicModal,
                                   $ionicPopup,
                                   $ionicLoading,
                                   $ionicSlideBoxDelegate,
                                   $timeout,
                                   $log,
                                   SessionService,
                                   SessionConfig,
                                   ReplicationService,
                                   navigateTo,
                                   $q,
                                   MessageService,
                                   CouchDbConfig,
                                   lodash,
                                   InitializationService,
                                   LoadingService,
                                   $cordovaDialogs,
                                   $cordovaBarcodeScanner,
                                   $ionicViewSwitcher,
                                   $ionicBackdrop,
                                   DataLayerService,
                                   $window,
                                   NoConnectivityPopupService,
                                   LanguageSelectorService) {

    MessageService.clear();
    $scope.messages = MessageService.getCurrentMessages();
    $scope.scannerAllowed = window.cordova;
    $rootScope.wasAtNewSample = false;
    $scope.appVersion = "v";
    $rootScope.selectedLanguage = "English";
    $scope.changePassword = changePassword;
    $scope.deviceModel = false;
    $scope.checkDevice = false;

    if ($window.device && $window.device.model) {
      $scope.deviceModel = String($window.device.model);
    }

    $rootScope.$on('appVersion', function (event, appVersion) {
      $scope.appVersion += appVersion;
    });

    $scope.isNewSample = function (path) {
      var regexp = /newLotSample/;
      return regexp.test(path);
    };

    $scope.saveState = function () {
      if (!$scope.isNewSample($state.current.name)) {
        $scope.savedState = angular.copy($state.current.name);
      }

      $scope.savedStateParams = angular.copy($state.params);
    };

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('AppCtrl - $stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
      $scope.previousStateName = fromState.name;

      var session = SessionService.getSessionData();

      $scope.parseDate = function (date) {
        var dateFormat = "MM/DD/YY";
        if (!!$rootScope.selectedLocation.timezoneOffset) {
          return moment(date).utcOffset($rootScope.selectedLocation.timezoneOffset / 60000).format(dateFormat);
        }
        return moment(date).format(dateFormat); // without offset
      };

      $scope.calculateTimeOffset = function (date) {
        if (!!$rootScope.selectedLocation.timezoneOffset) {
          return moment.utc(date).utcOffset($rootScope.selectedLocation.timezoneOffset / 60000)
        } else {
          return moment.utc(date); // without offset
        }
      };

      $rootScope.getCurrentDate = function () {
        return $scope.parseDate(new Date().getTime());
      };

      $scope.saveState();

      setTimeout(function () {
        $('ion-nav-bar').removeClass('hide');
        $('ion-nav-back-button').removeClass('hide');
        $('button').removeClass('hide');

      }, 10);

      if (session !== null) {
        var sessionOver = (Date.now() - session.createdDate) / (1000 * 3600) > SessionConfig.cookieLifeTime;
      }

      if (!!session && session.status == "loggedOffline" && sessionOver) {
        $log.debug("Session lifetime reached. Logging out");
        //try to replicate
        $scope.userLogout();
        navigateTo.login();
        event.preventDefault();
      }
    });

    $scope.userLogout = function (deferred, fromInterceptor) {
      //force a logout
      if(fromInterceptor) {
        $window.localStorage.setItem('sessionExpired', 'true');
      }

      //navigateTo.login();
      SessionService.destroy();
      SessionService.clearCredentials();
      //DataLayerService.stopSync();
      $rootScope.user = null;
      $rootScope.app = null;
      $rootScope.selectedLocation = null;
      $log.debug("User logged out successfully");
      document.location = "index.html"; // forces memory data cleanup
    };

    $rootScope.languagePopup = LanguageSelectorService;
    $rootScope.languagePopup.create('', {scope: $rootScope})
      .then(function (success) {
        $log.debug(success);

      })
      .catch(function (fail) {
        $log.error(fail);
      });

    document.addEventListener('backbutton', function(){
      if($rootScope.languagePopup && $rootScope.languagePopup.isShown){
        $rootScope.languagePopup.close();
      }
    });

    $scope.selectLanguage = function () {
      $scope.languagePopup.open();
    };

    function changePassword() {
      navigateTo.changePassword();
    }

    $scope.previousStateName = '';

    /**
     * Methods for debugging purpose
     */
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      $log.debug('$stateChangeError - fired when an error occurs during transition.');
      $log.debug(arguments);
    });
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      $log.debug('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });
    $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
      // runs on individual scopes, so putting it in "run" doesn't work.
      $log.debug('$viewContentLoading - view begins loading - dom not rendered', viewConfig);
    });
    $rootScope.$on('$viewContentLoaded', function (event) {
      $log.debug('$viewContentLoaded - fired after dom rendered', event);
    });
    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      $log.debug('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
      $log.debug(unfoundState, fromState, fromParams);
    });

    $scope.$on('logout', $scope.userLogout);

    $rootScope.noConnectivityPopup = NoConnectivityPopupService;

    $rootScope.noConnectivityPopup.create('', {scope: $rootScope})
      .then(function (success) {
        $log.debug(success);
      })
      .catch(function(error){
        $log.error(error);
      });
  }])
;

//# sourceMappingURL=ocf-main.js.map
