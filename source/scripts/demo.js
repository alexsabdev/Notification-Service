'use_strict';

angular.module('Demo', ['notification-service'])
/**
 * @ngdoc controller
 * @name Demo.controller:DemoController
 * @description 
 * 
 * This is the main controller of the demo app module.
 * It uses the notification-service and operates with the simulation form.
 */
 .controller('DemoController', ['$scope', 'Notification', function($scope, Notification){
	// array to collect the notifications data
	$scope.notes = [];
	// object to bind input data
	$scope.note = {
		id: '',
		category: 'info',
		header: '',
		content: '',
	};
	//procedure to lazilly fill the form
	$scope.useMockup = function() {
		
		$scope.note = {
			id: '',
			header: 'Title',
			content: 'Lorem ipsum dolor sit amet.',
		};

		switch(Math.floor(Math.random()*3)) {
			case 0 : $scope.note.category = 'info';
				break;
			case 1 : $scope.note.category = 'warning';
				break;
			case 2 : $scope.note.category = 'error';
				break;
		}

	};
	// precedure to create a notification, save it, alert it and clean the form
	$scope.createNote = function() {
		$scope.note.id = $scope.notes.length + 1;
		Notification.notify($scope.note);
		$scope.notes.push($scope.note);
		$scope.note = {
			id: '',
			category: 'info',
			header: '',
			content: '',
		};
	};
}]);