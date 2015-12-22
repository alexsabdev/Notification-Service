'use_strict';

angular.module('Demo', [])

.controller('DemoController', ['$scope', function($scope){

	$scope.notes = [
	{
		id: 1,
		from: 'userManagement',
		category: 'info',
		header: 'Title Info',
		content: 'Lorem ipsum dolor sit amet.',
		type: 'note'
	},
	{
		id: 2,
		from: 'userManagement',
		category: 'warning',
		header: 'Title Warning',
		content: 'Lorem ipsum dolor sit amet.',
		type: 'note'
	},
	{
		id: 3,
		from: 'userManagement',
		category: 'error',
		header: 'Title Error',
		content: 'Lorem ipsum dolor sit amet.',
		type: 'note'
	},
	{
		id: 4,
		from: 'userManagement',
		category: 'info',
		header: 'Title Info',
		content: 'Lorem ipsum dolor sit amet.',
		type: 'note'
	},
	{
		id: 5,
		from: 'userManagement',
		category: 'warning',
		header: 'Title Warning',
		content: 'Lorem ipsum dolor sit amet.',
		type: 'note'
	}
	];

}]);