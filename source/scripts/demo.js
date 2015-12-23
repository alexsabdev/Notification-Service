'use_strict';

angular.module('Demo', ['notification-service'])

.controller('DemoController', ['$scope', 'Notification', function($scope, Notification){
	// array to collect the notifications data
	$scope.notes = [];
	// object to keep track of input data
	$scope.note = {
		id: '',
		from: 'userManagement',
		category: '',
		header: '',
		content: '',
		type: 'note'
	};
	// function to lazilly fill the form
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
	// function to create a notification, save it, alert it and clean the form
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