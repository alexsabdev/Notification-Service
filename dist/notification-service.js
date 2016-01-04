/**
 * @ngdoc object
 * @name notification-service
 * @description
 *
 * Angular.js module providing notifications using Bootstrap 3 styles and having following features:
 * 
 * # Features
 * * it displays notifications as overlay in front of the page;
 * * the notifications have a title and a body;
 * * they have different appearance depending on a category;
 * * max 5 notifications are displayed at the same time by dafault, the number can be changed;
 * * when the limit is reached, the oldest notification temporary gets off from screen and the latest pops up and after that gets back when there's a free spot;
 * * created notifications are closable by clicking;
 * * they are also closed automatically after 90 seconds by default, the number can be changed;
 * * the service is able to display notifications with confirmations;
 * * the service can read data from backend side and can send data to it.
 *
 * # Install
 *
 *
 * * Simply inject the notification-service to your app module:
 * ```javascript
 * var app = angular.module('myApp', ['notification-service']);
 * ...
 * ```
 * * And inject its service called 'Notification' to the app controller:
 * ```javascript
 * ...
 * app.controller('AppController', ['$scope', 'Notification', function($scope, Notification){...}]);
 * ```
 * * You need also to download notification-service.js and notification-service-styles.css from the dist folder (or their minified versions). Don't forget to link downloaded files to your html/template:
 * ```html
 * ...
 * <link rel="stylesheet" href="styles/notification-service-styles.css">
 * ...
 * <script src="scripts/notification-service.js"></script>
 * ...
 * ```
 * * The notification-service has ability to read data from server and send user responds to it. In order to use this feature, you need to set baseUrl for your server interface. :
 * ```javascript
 * ...
 * Notification.setOptions({baseUrl: 'http://myserver.com/api/notifications/'})
 * ...
 * ```
 * ! notifications will be fetched using interface: baseUrl + '/list';<br />
 * ! user responds will be sent using interface: baseUrl + '/confirm'.
 * # Usage
 * The module contains the service named Notification having 3 public methods. You can call them in your app controller in order to get corresponding effect. Please refer to the Notification service section for details.
 */
 var nsModule = angular.module('notification-service', []);
/**
* @ngdoc service
* @name notification-service.service:Notification
* @requires $rootScope
* @requires $compile
* @requires $http
* @requires $timeout
* @description 
*
* Service to display notifications, talk to server and change default notification settings.
*/
nsModule.service('Notification', ['$rootScope', '$compile', '$http', '$timeout', function($rootScope, $compile, $http, $timeout){
	// scope for the service
	var scope = $rootScope.$new();
	// object for the service options
	scope.options = {
		delay: 90000,
		limit: 5,
		baseUrl: 'http://localhost:3000/'
	};
	/**
	 * @ngdoc
	 * @name setOptions
	 * @methodOf notification-service.service:Notification
	 * @param {Object} opts object containing options of the notification service
	 * @description 
	 * 
	 * Method to change default options of the notification service.
	 *
	 * # Usage
	 * In your app controller you can call:
	 * ```javascript
	 * ...
	 * Notification.setOptions(opts);
	 * ...
	 * ```
	 * where ```opts``` is an object that can contain following properties:
	 * * delay - delay of the notification in ms, type: Int;
	 * * limit - max amount of notifications on screen at the same time, type: Int;
	 * * baseUrl - path to the server to get notifications from, type: String. Please mind:
	 * <br />! notifications will be fetched using interface: baseUrl + '/list';<br />
	 * ! user responds will be sent using interface: baseUrl + '/confirm';
	 *
	 * @example
	 * ```javascript
	 * ...
	 * Notification.setOptions(
	 * {
	 *   delay: 45000,
	 *   limit: 3,
	 *   baseUrl: http://website.com/api/notifications'
	 * }
	 * );
	 * ...
	 * ```
	 */
	this.setOptions = function(opts) {
		if (!angular.isObject(opts)) throw new Error("Options should be an object!");
		scope.options = angular.extend({}, scope.options, opts);
	};
	// array to keep track of incoming alerts
	scope.buffer = [];
	// variable to keep track if the notification area is displayed or not
	scope.isDisplayed = false;
	// method to kill the alert
	scope.kill = function(item) {
		scope.buffer.splice(scope.buffer.indexOf(item), 1);
		if (scope.buffer.length === 0) {
			scope.isDisplayed = false;
			angular.element(document.getElementById('notification-area')).remove();
		}
	};
	// method to send the user response
	scope.sendResponse = function(item, answer) {
		$http({
			url: scope.options.baseUrl + 'confirm',
			method: "POST",
			data: {
				'id': item.id,
				'from': item.from,
				'result': answer
			}
		})
		.then(function(response) {
			console.log('POST success');
		},
		function(response) {
			console.log('POST error');
		});
		scope.kill(item);
	};
	// template for notifications
	var template =
	'<ul id="notification-area">' +
	'<li id="ns-{{item.id}}" class="ns-alert-{{item.category}} notification" ng-repeat="item in buffer|limitTo:-options.limit">' +
	'<span class="ns-close" ng-click="kill(item)">&times;</span>' +
	'<p class="ns-title"><strong>ID {{item.id}}: {{item.header}}</strong></p>' +
	'<p class="ns-content">{{ item.content }}</p>' +
	'<button class="ns-btn ns-btn-xs ns-btn-{{item.category}}" ng-show="item.type!==\'note\'" ng-click="sendResponse(item,1)">OK</button>' +
	'<button class="ns-btn ns-btn-xs ns-btn-{{item.category}}" ng-show="(item.type!==\'note\')&&(item.type!==\'ok_confirm\')" ng-click="sendResponse(item,0)">Cancel</button>' +
	'</li></ul>';
	// method to add an alert to the buffer
	var pushToBuffer = function(note) {
		scope.buffer.push(note);
		if (!scope.isDisplayed) {
			angular.element(document.getElementsByTagName('body')).append($compile(template)(scope));
			scope.isDisplayed = true;
		}
		$timeout(function() {
			scope.buffer.splice(scope.buffer.indexOf(note),1);
			if (scope.buffer.length === 0) {
				scope.isDisplayed = false;
				angular.element(document.getElementById('notification-area')).remove();
			}
		},scope.options.delay);
	};
	/**
	 * @ngdoc
	 * @name notify
	 * @methodOf notification-service.service:Notification
	 * @param {Object} note notification object 
	 * @description 
	 * 
	 * Method to get a notification object and display it on the top right corner of the window.
	 * # Usage
	 * In your app controller you can call:
	 * ```javascript
	 * Notification.notify(note);
	 * ```
	 * where ```note``` is an object that must contain following properties:
	 * * id - id of the notification, type: Int;
	 * * from - identifier of the emitter, type: String;
	 * * category: category of the notification, type: String, possible values: 'into', 'warning', 'error';
	 * * type: type of the notification, type: String, possible values: 'note', 'ok_confirm', 'ok_cancel_confirm';
	 * * header: title of the notification, type: String;
	 * * content: content of the notification, type: String.
	 *
	 * @example
	 * ```javascript
	 * ...
	 * Notification.notify(
	 * {
	 *   id: 1001,
	 *   from: 'userManagement',
	 *   category: 'warning',
	 *   type: 'note',
	 *   header: 'Subscrition Info'
	 *   content: 'Your subscription expires in 5 days'
	 * }
	 * );
	 * ...
	 * ```
	 */
	this.notify = function(note) {
		pushToBuffer(note);
	};
	/**
	 * @ngdoc
	 * @name  getFromServer
	 * @methodOf notification-service.service:Notification
	 * @description 
	 *
	 * Method to get the notifications array from server and display them on the top right corner of the window.
	 *
	 * # Usage
	 * In your app controller you can call:
	 * ```javascript
	 * ...
	 * Notification.getFromServer();
	 * ...
	 * ```
	 *
	 * @example
	 * ```javascript
	 * ...
	 * Notification.getFromServer();
	 * ...
	 * ```
	 */
	this.getFromServer = function() {
		$http({
			url: scope.options.baseUrl + 'list',
			method: "GET",
		})
		.then(function(response) {
			console.log('GET success');
			var noteArray = response.data;
			for (var i = 0; i < noteArray.length; i++)
				pushToBuffer(noteArray[i]);
		},
		function(response) {
			console.log('GET error');
		});
	};
}]);