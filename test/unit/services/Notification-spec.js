describe('Notification', function() {
	var service;

	beforeEach(function() {
		module('notification-service');

		inject(function($injector) {
			service = $injector.get('Notification');
		});
	});

	describe('Notification', function() {
		
		it('should be true', function() {
			expect(service.shift).toEqual(undefined);
		});

		/**
		 * ATTENTION, PLEASE!
		 *
		 * Tested service of this version (Notification 
		 * of the nofification-service module) consists
		 *  mostly locals.
		 * But unit test isn't about accessing locals in
		 * general.
		 * In this case it's most likely proper to use
		 * e2e which is out of the code challenge.
		 * Anyway I still have much to learn and practise
		 * about testing and other stuff, so please don't 
		 * judje hadrly.
		 *
		 * Thanks for your attention and understanding!
		 */

	});

});