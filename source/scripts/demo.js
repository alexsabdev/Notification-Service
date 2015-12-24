'use_strict';
/**
 * @name  Demo
 * @description 
 *
 * This is the module of the demo app
 */
angular.module('Demo', ['notification-service'])
/**
 * @name  DemoController
 * @description 
 *
 * This is the main controller of the demo app module.
 * It uses $scope and notification-service
 */
.controller('DemoController', ['$scope', 'Notification', function($scope, Notification){
	/**
	 * @name $scope.notes
	 * @type Array
	 * @description 
	 *
	 * array to collect the notifications data
	 */
	$scope.notes = [];
	/**
	 * @name $scope.note
	 * @type Object
	 * @description 
	 *
	 * object to bind input data
	 */
	$scope.note = {
		id: '',
		from: 'userManagement',
		category: '',
		header: '',
		content: '',
		type: 'note'
	};
	/**
	 * @name  $scope.useMockup
	 * @description
	 *
	 * procedure to lazilly fill the form
	 */
	$scope.useMockup = function() {
		$scope.note = {
			id: '',
			from: 'userManagement',
			category: 'error',
			header: 'Title Info',
			content: 'Lorem ipsum dolor sit amet.',
			type: 'note'
		};
	};
	/**
	 * @name $scope.createNote
	 * @description 
	 *
	 * precedure to create a notification, save it, alert it and clean the form
	 */
	$scope.createNote = function() {
		$scope.note.id = $scope.notes.length + 1;
		Notification.notify($scope.note);
		$scope.notes.push($scope.note);
		$scope.note = {
			id: '',
			from: 'userManagement',
			category: '',
			header: '',
			content: '',
			type: 'note'
		};
	};
}]);