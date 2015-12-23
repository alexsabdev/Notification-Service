'use_strict';

angular.module('Demo', ['notification-service'])

.controller('DemoController', ['$scope', 'Notification', function($scope, Notification){

	$scope.notes = [];
	$scope.note = {
			id: '',
			from: 'userManagement',
			category: 'danger',
			header: 'Title Info',
			content: 'Lorem ipsum dolor sit amet.',
			type: 'note'
		};

	$scope.useMockup = function() {
		$scope.note = {
			id: '',
			from: 'userManagement',
			category: 'danger',
			header: 'Title Info',
			content: 'Lorem ipsum dolor sit amet.',
			type: 'note'
		};
	};

	$scope.createNote = function() {
		$scope.note.id = $scope.notes.length + 1;
		Notification.notify($scope.note);
		$scope.notes.push($scope.note);
		//console.log('created a note with ID ' + $scope.note.id);
		//console.log('array now has ' + $scope.notes.length + ' notes');
		$scope.note = {
			id: '',
			from: 'userManagement',
			category: 'info',
			header: 'Title Info',
			content: 'Lorem ipsum dolor sit amet.',
			type: 'note'
		};
	};

}]);