describe('Notification', function() {

	var service;

	beforeEach(function() {
		module('notification-service');

		inject(function(Notification) {
			service = Notification;
		});
	});

	it('should', function() {
		expect(service.notify).toBeDefined();
	});
});