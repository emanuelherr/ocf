angular.module("ocf.templates",[]).run(["$templateCache",function($templateCache){$templateCache.put("autoLogoutPopUp/autoLogoutPopup.html",'<ion-modal-view class="autoLogout-popup"><ion-content scroll="false"><div class="row row-message-header"><div class="col text-center"><span class="autoLogout-message">Login to continue</span></div></div><div class="row row-message-sub-header"><div class="col text-center"><span class="autoLogout-sub-message">You have been logged out for</span><br><span class="autoLogout-sub-message">system security reasons.</span></div></div><div class="row buttons-row"><div class="col text-center"><button class="button button-close" ng-click="autoLogoutPopup.close()" type="button" name="autoLogout-cancel_button"><span class="autoLogout-button-span">Okay</span></button></div></div></ion-content></ion-modal-view>'),$templateCache.put("home/ocfHome.html",'<ion-view id="title" view-title="App Selection" class="app-selector"><ion-nav-bar class="bar-stable"><ion-nav-title><span class="title" name="appSelector-title" translate="OCF.APP_SELECTION.TITLE"></span></ion-nav-title><ion-header-bar class="bar-stable main-nav-bar"><!--<ion-nav-buttons side="left">\r\n                <button class="button button-icon button-clear button-dark" ng-class="{\'hide-back-button\': hideBackButton}"\r\n                        ng-click="goToPreviousState()"\r\n                        name="gdcSelector-backButton"><i class="fa fa-angle-left"></i></button>\r\n            </ion-nav-buttons>--></ion-header-bar></ion-nav-bar><ion-content><div id="app-list"><div name="option-value-{{subApp.appName}}" class="row item" ng-repeat="subApp in subApps" ng-click="selectListAppItem(subApp, subApps)" ng-class="{\'active\': subApp.selected}"><div class="col col-10"><i class="fa fa-circle-o unchecked" ng-if="!subApp.selected"></i> <i class="fa fa-circle checked" ng-if="subApp.selected"></i></div><div class="col">{{subApp.appName}}</div></div></div></ion-content><ion-footer-bar class="footer"><div class="row"><div class="col col-100 continue text-center" name="gdc-continueButton" ng-click="selectApp()"><span translate="OCF.APP_SELECTION.BUTTON_CONTINUE"></span></div></div></ion-footer-bar></ion-view>'),$templateCache.put("noConnectivityPopUp/noConnectivityPopup.html",'<ion-modal-view class="as-noConnectivity-popup"><ion-content scroll="false"><form name="noConnectivityForm" class="noConnectivity-form" ng-submit=""><div class="row row-header"><div class="col text-center"><i class="fa fa-exclamation-circle no-connectivity-icon" aria-hidden="true"></i> <span class="no-connectivity-header" translate="OCF.NO_CONNECTIVITY_POPUP.HEADER"></span></div></div><div class="row row-message"><div class="col text-center"><span class="no-connectivity-message" translate="OCF.NO_CONNECTIVITY_POPUP.MESSAGE"></span></div></div><div class="row buttons-row"><div class="col text-center"><button class="button button-close" ng-click="noConnectivityPopup.close()" type="button" name="closeOrder-cancel_button"><span class="" translate="OCF.NO_CONNECTIVITY_POPUP.CLOSE_BUTTON"></span></button></div><div class="col text-center"><button class="button button-retry" ng-click="noConnectivityPopup.retry()" type="button" name="closeOrder-confirm_button"><span class="" translate="OCF.NO_CONNECTIVITY_POPUP.RETRY_BUTTON"></span></button></div></div></form></ion-content></ion-modal-view>'),$templateCache.put("commons/LocationSelector/locationSelector.html",'<ion-view class="retailer-baseline gdc-selector"><ion-nav-bar class="bar-stable"><ion-nav-title><span class="title" name="gdcSelector-title" translate="OCF.LOCATION_SELECTION.TITLE"></span></ion-nav-title></ion-nav-bar><ion-content><div id="gdc-list"><div name="option-value-{{item.locationName}}" class="row item" ng-repeat="item in locations" ng-click="selectListLocationItem(item, locations)" ng-class="{\'active\': item.selected}"><div class="col col-10"><i class="fa fa-circle-o unchecked" ng-if="!item.selected"></i> <i class="fa fa-circle checked" ng-if="item.selected"></i></div><div class="col">{{item.locationName}}</div></div></div></ion-content><ion-footer-bar class="footer"><div class="row"><div class="col col-100 continue text-center" name="gdc-continueButton" ng-click="selectLocation()"><span translate="OCF.LOCATION_SELECTION.BUTTON_CONTINUE"></span></div></div></ion-footer-bar></ion-view>'),$templateCache.put("commons/templates/galleryPager.html",'<div class="slider-pager" style="background-color: red"><span class="slider-pager-page" ng-repeat="slide in numSlides() track by $index" ng-class="{active: $index == currentSlide}" ng-click="pagerClick($index)"><i class="icon ion-record"></i></span></div>'),$templateCache.put("commons/templates/menu.html",'<ion-side-menus enable-menu-with-back-views="true"><ion-pane ion-side-menu-content><ion-nav-view name="menuContent"></ion-nav-view></ion-pane><ion-side-menu side="right" is-enabled="displaySideMenu"><ion-header-bar class="bar-stable"><h1 class="title">Settings</h1></ion-header-bar><ion-content><ion-list><ion-item nav-clear menu-close ui-sref="e30.menu">App Selector</ion-item><ion-item nav-clear menu-close ng-click="userLogout()">Logout</ion-item><ion-item nav-clear menu-close ng-click="exit()">Exit</ion-item></ion-list><div style="position: absolute; left: 5%; color: #999999">{{appVersion}}</div></ion-content></ion-side-menu></ion-side-menus>'),$templateCache.put("commons/templates/message-service.html",'<ul class="list list-inset list-borderless messages"><li class="item positive" ng-repeat="message in messages.information">{{message}} <span class="color-demo positive-bg positive-border"></span></li><li class="item balanced" ng-repeat="message in messages.success">{{message}} <span class="color-demo balanced-bg balanced-border"></span></li><li class="item energized" ng-repeat="message in messages.warning">{{message}} <span class="color-demo energized-bg energized-border"></span></li><li class="item assertive" ng-repeat="message in messages.error">{{message}} <span class="color-demo assertive-bg assertive-border"></span></li></ul>'),$templateCache.put("login/templates/login.html",'<ion-view view-title="Login" hide-nav-bar="true" class="login-screen"><ion-content scroll="false"><div class="login-box"><div class="hide-on-keyboard-open logo"><img src="assets/img/zest-logo-white.png" alt="Zest Fresh"></div><messages class="hide-on-keyboard-open text-align-center" ng-class="{\'messages-hidden\':messages.error.length==0, \'text-align-center-pa\': heightScreen < 480}" messages="messages"></messages><form class="form-login" ng-submit="doLogin()"><div><div class="item item-input" id="usernameLabel" ng-class="{\'error-input\': messages.error.length>0}"><input id="usernameInput" type="text" placeholder="{{form.username}}" ng-focus="" ng-model="loginData.username"></div><div class="item item-input" id="passwordLabel"><input id="passwordInput" type="password" placeholder="{{form.password}}" ng-model="loginData.password"></div><button class="login-button" type="submit" translate="OCF.LOGIN.LOGIN_BUTTON"></button></div></form></div><div class="forgot-password" ng-class="{\'forgot-password-pa\': heightScreen < 480 }" ng-click="forgotPassword()" translate="OCF.LOGIN.FORGOT_PASSWORD"></div><div class="row login-footer" ng-class="{\'login-footer-pa\': heightScreen < 480 }" id="login-footer"><label class="col col-50 text-align-left label-footer" ng-class="{\'text-align-center-pa\': heightScreen < 480 }">© ZEST Fresh 2016</label><label class="col col-25 text-align-right label-footer" ng-class="{\'text-align-center-pa\': heightScreen < 480 }">{{appVersion}}</label></div></ion-content></ion-view>'),$templateCache.put("passwordMgmt/changePassword/changePassword.html",'<ion-view class="change-password"><ion-nav-bar class="bar-stable"><ion-nav-title><span class="title" name="changePassword-title" translate="OCF.PASSWORD.CHANGE.TITLE"></span></ion-nav-title><ion-header-bar><ion-nav-buttons side="left"><button class="button button-icon button-clear button-dark" ng-click="goToPreviousState()" ng-show="!successPasswordChange" name="changePassword-backButton"><i class="fa fa-angle-left"></i></button></ion-nav-buttons></ion-header-bar></ion-nav-bar><ion-content><div class="list change-password-form" ng-show="!successPasswordChange"><div class="item item-input item-floating-label" ng-class="{error: pm.hasError.current}"><span class="input-label" translate="OCF.PASSWORD.CHANGE.CURRENT_PLACEHOLDER"></span> <i class="fa fa-times-circle error-icon placeholder-icon" name="changePassword-newPasswordErrorIcon" ng-if="pm.hasError.current"></i> <input type="{{pm.display.current ? \'text\' : \'password\'}}" name="changePassword-currentPassword" placeholder="{{pm.labels.current}}" ng-focus="removeErrors(\'current\')" ng-model="pm.passwords.current"> <i class="fa fa-eye view-password placeholder-icon" name="changePassword-viewConfirmPasswordButton" ng-show="!!pm.passwords.current" ng-class="{viewing: pm.display.current}" ng-click="togglePasswordVisibility(\'current\')"></i></div><div class="item item-input item-floating-label" ng-class="{error: pm.hasError.new}"><span class="input-label" translate="OCF.PASSWORD.CHANGE.NEW_PLACEHOLDER"></span> <i class="fa fa-times-circle error-icon placeholder-icon" name="changePassword-newPasswordErrorIcon" ng-if="pm.hasError.new"></i> <input type="{{pm.display.new ? \'text\' : \'password\'}}" name="changePassword-newPasswordInput" placeholder="{{pm.labels.new}}" ng-focus="removeErrors(\'new\')" ng-model="pm.passwords.new"> <i class="fa fa-eye view-password placeholder-icon" name="changePassword-viewNewPasswordButton" ng-show="!!pm.passwords.new" ng-class="{viewing: pm.display.new}" ng-click="togglePasswordVisibility(\'new\')"></i></div><meter max="{{::pm.meter.max}}" value="{{pm.meter.value}}" name="changePassword-passwordMeter"></meter><div class="row password-strength-meter-info"><div class="col password-strength-title text-left" name="changePassword-passwordMeter_title" translate="OCF.PASSWORD.CHANGE.STRENGTH_LABEL"></div><div class="col password-strength-meter-description text-right assertive" ng-show="pm.meter.value == 1" name="changePassword-passwordMeter_description">{{pm.meter.description[pm.meter.value]}}</div><div class="col password-strength-meter-description text-right energized" ng-show="pm.meter.value == 2 || pm.meter.value == 3" name="changePassword-passwordMeter_description">{{pm.meter.description[pm.meter.value]}}</div><div class="col password-strength-meter-description text-right balanced" ng-show="pm.meter.value == 4" name="changePassword-passwordMeter_description">{{pm.meter.description[pm.meter.value]}}</div></div><div class="item item-input item-floating-label" ng-class="{error: pm.hasError.newConfirm}"><span class="input-label" translate="OCF.PASSWORD.CHANGE.CONFIRM_PLACEHOLDER"></span> <i class="fa fa-times-circle error-icon placeholder-icon" name="changePassword-confirmPasswordErrorIcon" ng-if="pm.hasError.newConfirm"></i> <input type="{{pm.display.newConfirm ? \'text\' : \'password\'}}" name="changePassword-confirmPasswordInput" placeholder="{{pm.labels.newConfirm}}" ng-focus="removeErrors(\'newConfirm\')" ng-model="pm.passwords.newConfirm"> <i class="fa fa-eye view-password placeholder-icon" name="changePassword-viewConfirmPasswordButton" ng-show="!!pm.passwords.newConfirm" ng-class="{viewing: pm.display.newConfirm}" ng-click="togglePasswordVisibility(\'newConfirm\')"></i></div></div><div class="row change-must" ng-show="!successPasswordChange"><div class="col col-5"></div><div class="col col-90 info-message"><div class="must" name="changePassword-infoMessage-must"><p><strong translate="OCF.PASSWORD.CHANGE.LEGEND.MUST"></strong></p><div ng-bind-html="pm.finalMessage | toTrusted"></div></div><div class="must-not" name="changePassword-infoMessage-must-not"><p><strong translate="OCF.PASSWORD.CHANGE.LEGEND.MUST_NOT"></strong></p><div ng-class="{error: !!pm.passwordRulesErrors.previously}" translate="OCF.PASSWORD.CHANGE.LEGEND.USED"></div></div><div><!--<div class="error" ng-if="!!pm.passwordRulesErrors.dictionary"--><!--ng-bind-html="dictWord.errorMessage"></div>--><div class="error" ng-if="!!pm.passwordRulesErrors.dictionary">Password contains the dictionary word \'{{pm.passwordRulesErrors.dictWord}}\'.</div><div class="error" ng-if="!!pm.passwordRulesErrors.genericError">{{pm.passwordRulesErrors.genericError}}</div></div></div><div class="col col-5"></div></div><div class="row" ng-show="successPasswordChange"><div class="col col-5"></div><div class="col col-90 info-message"><div class="message-icon"><i class="icon fa fa-check"></i></div><div class="message-question" translate="OCF.PASSWORD.CHANGE.SUCCESS.MAIN_MESSAGE"></div><div class="message-text" translate="OCF.PASSWORD.CHANGE.SUCCESS.FIRST_PARAGRAPH"></div><div class="message-text" translate="OCF.PASSWORD.CHANGE.SUCCESS.SECOND_PARAGRAPH"></div></div><div class="col col-5"></div></div></ion-content><ion-footer-bar><div class="row buttons-row hide-on-keyboard-open"><div class="col text-center"><input class="button button-balanced button-block" ng-click="changePassword()" ng-disabled="!pm.passwords.current || !pm.passwords.new || !pm.passwords.newConfirm" ng-show="!successPasswordChange" type="button" name="changePassword-changePasswordButton" value="{{\'OCF.PASSWORD.CHANGE.BUTTON_CHANGE\' | translate}}"> <input class="button button-balanced button-block" ng-click="userLogout()" ng-show="successPasswordChange" type="button" name="changePassword-success_loginButton" value="{{\'OCF.PASSWORD.CHANGE.SUCCESS.BUTTON_LOGIN\' | translate}}"></div></div></ion-footer-bar></ion-view>'),$templateCache.put("passwordMgmt/forgotPassword/forgotPassword.html",'<ion-view class="forgot-password-screen"><ion-nav-bar class="bar-stable"><ion-nav-title><span class="title" name="forgotPassword-title" translate="OCF.PASSWORD.FORGOT.TITLE"></span></ion-nav-title><ion-header-bar><ion-nav-buttons side="left"><button class="button button-icon button-clear button-dark" ng-click="goToPreviousState()" ng-show="!pm.successPasswordRecover" name="forgotPassword-backButton"><i class="fa fa-angle-left"></i></button></ion-nav-buttons></ion-header-bar></ion-nav-bar><ion-content><div class="row" ng-show="!pm.successPasswordRecover"><div class="col col-5"></div><div class="col col-90 info-message" name="forgotPassword-infoMessage"><div class="message-icon"><i class="icon fa fa-lock"></i></div><div class="message-question" translate="OCF.PASSWORD.FORGOT.QUESTION"></div><div class="message-text" translate="OCF.PASSWORD.FORGOT.MESSAGE"></div></div><div class="col col-5"></div></div><div class="list forgot-password-form" ng-show="!pm.successPasswordRecover"><div class="item item-input item-floating-label" ng-class="{error: pm.hasError}"><span class="input-label" translate="OCF.PASSWORD.FORGOT.USERNAME_PLACEHOLDER"></span> <i class="fa fa-times-circle error-icon placeholder-icon" name="changePassword-forgotPasswordErrorIcon" ng-if="pm.hasError"></i> <input id="changePasswordInput" type="text" name="changePassword-username" placeholder="{{pm.label}}" ng-focus="removeErrors()" ng-model="pm.username"></div></div><div class="row" ng-show="!pm.successPasswordRecover"><div class="col col-5"></div><div class="col col-90 info-message" name="forgotPassword-infoMessage"><div class="error" ng-if="!!pm.genericError && !pm.successPasswordRecover">{{pm.genericError}}</div></div><div class="col col-5"></div></div><div class="row" ng-show="pm.successPasswordRecover"><div class="col col-5"></div><div class="col col-90 info-message"><div class="message-icon"><i class="icon fa fa-envelope"></i></div><div class="message-question" translate="OCF.PASSWORD.FORGOT.SUCCESS.MAIN_MESSAGE"></div><div class="message-text" translate="OCF.PASSWORD.FORGOT.SUCCESS.FIRST_PARAGRAPH"></div></div><div class="col col-5"></div></div></ion-content><ion-footer-bar><div class="row buttons-row hide-on-keyboard-open"><div class="col text-center"><input class="button button-balanced button-block" ng-click="resetPassword()" ng-disabled="!pm.username" ng-if="!pm.successPasswordRecover" type="button" name="forgotPassword-resetPasswordButton" translate="OCF.PASSWORD.FORGOT.BUTTON_SUBMIT" value="{{\'OCF.PASSWORD.FORGOT.BUTTON_SUBMIT\' | translate}}"> <input class="button button-balanced button-block" ng-click="userLogout()" ng-if="pm.successPasswordRecover" type="button" name="forgotPassword-success_loginButton" value="{{\'OCF.PASSWORD.FORGOT.SUCCESS.BUTTON_OKAY\' | translate}}"></div></div></ion-footer-bar></ion-view>'),$templateCache.put("commons/services/languageSelector/languageSelector.html",'<ion-modal-view class="language-selector popup-language"><ion-content scroll="false"><div class="row row-title"><div class="col text-center"><h1 class="language-title" translate="OCF.LANGUAGE_SELECTOR.SELECT_LANGUAGE"></h1></div></div><div class="row row-language" ng-click="languagePopup.selectLangf(\'English\')"><div class="col text-center"><i ng-if="languagePopup.selected == \'English\'" class="fa fa-circle select-option selected-language" aria-hidden="true"></i> <i ng-if="languagePopup.selected != \'English\'" class="fa fa-circle-o select-option unselected-language" aria-hidden="true"></i> <img src="assets/img/English.png" class="flag" alt="English flag"> <span class="language-label" translate="OCF.LANGUAGE_SELECTOR.LANGUAGES.ENGLISH"></span></div></div><div class="row row-language" ng-click="languagePopup.selectLangf(\'Spanish\')"><div class="col text-center"><i ng-if="languagePopup.selected == \'Spanish\'" class="fa fa-circle select-option selected-language" aria-hidden="true"></i> <i ng-if="languagePopup.selected != \'Spanish\'" class="fa fa-circle-o select-option unselected-language" aria-hidden="true"></i> <img src="assets/img/Spanish.png" class="flag" alt="Spanish flag"> <span class="language-label" translate="OCF.LANGUAGE_SELECTOR.LANGUAGES.SPANISH"></span></div></div></ion-content></ion-modal-view>')}]);
//# sourceMappingURL=ocf-templates.js.map