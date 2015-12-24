'use_strict';

angular.module('notification-service', [])
/**
 * @ngdoc service
 * @name notification-service.service:Notification
 * @description 
 *
 * notification-service - Angular.js service providing notifications using Bootstrap 3 styles with css transition animation
 * It creates overlay notifications on window.
 * Number of notifications is limited by options.limit.
 * When the limit is reached, the oldest notification temporary gets off from screen and the latest pops up 
 * And after that gets back when there's a free spot.
 * Created notifications are closable by clicking.
 * They are also selfclosed within period of options.delay.
 * 
 * @author alexsabdev (alexsabdev@gmail.com)
 * @version v1.0.0
 * @link https://github.com/alexsabdev/notification-service.git
 * 
 * dependencies: 
 *    no
 * 
 * options:
 *    delay: 90000 (in miliseconds, period within a notification is selfclosed)
 *    limit: 5 (number of notifications on screen)
 *    startX: 5 (in px, starting position form the right for the first notifiation)
 *    startY: 5 (in px, starting position form the left for the first notifiation)
 *    spacingY: 5 (in px, distance bentween notifications)
 *
 * injection:
 * Simply inject the notification-service to your app:
 *    var app = angular.module('myApp', ['notification-service']);
 * And inject its service called 'Notification' to the app controller:
 *    app.controller('AppController', ['$scope', 'Notification', function($scope, Notification){...}]);
 * You need also to download notification-service.js and notification-service-styles.css.
 * Don't forget to link downloaded files to your html/template:
 *    <link rel="stylesheet" href="styles/notification-service-styles.css">
 *    <script src="scripts/notification-service.js"></script>
 *
 * calling: 
 * After injection, when you need to show notifications, simply call:
 *    Notification.notify(note);
 * Where note is a notification object consisting of followsing properties:
 *    id: The id of the notification message.
 *    from: Identifier of the emitter.
 *    category: Category of the notification message. Possible categories are “info”, “warning” and “error”.
 *    type: Type of the notification – Possible types for the sevice version are “note”.
 *    header: Header of the notification.
 *    content: Content of the notification.
 *
 * Please get in touch with me if your have proposals how to modify the service.
 * Have fun!
 */
.service('Notification', function(){
	//object to collect options of the module service
	var options = {
		delay: 90000,
		limit: 5,
		startX: 5,
		startY: 5,
		spacingY: 5
	};
	// array to keep track of called notifications
	var buffer = [];
	//variable helping to display latest notification
	var shift = 0;
	//procedure to display latest notifications
	var allocate = function() {
		// variables to set starting position for alerts
		var i = options.startX;
		var j = options.startY;
		// loop to clean window before refreshing
		for (var k in buffer) {
			buffer[k].style.right = options.startX + 'px';
			buffer[k].style.top = options.startY + 'px';
			buffer[k].style.visibility = 'hidden';
		}
		// condition to adjust the shift variable
		if (buffer.length >= options.limit) {
			shift = buffer.length - options.limit;
		}
		// loop to locate latest alerts on window
		for (var n = shift; n < buffer.length; n++) {
			buffer[n].style.right = i + 'px';
			buffer[n].style.top = j + 'px';
			buffer[n].style.visibility = 'visible';
			j += buffer[n].offsetHeight + options.spacingY;
		}
	};
	// procedure invoked when an alert is called
	this.notify = function(note) {
		// create a template for an alert
		var templateNote = document.createElement('div');
		templateNote.className = 'alert alert-' + note.category + ' notification';
		var att = document.createAttribute('role'); att.value = 'alert'; templateNote.setAttributeNode(att);
		var attId = document.createAttribute('id'); attId.value = note.id; templateNote.setAttributeNode(attId);
		templateNote.innerHTML = '<strong>' + note.header + ' ' + note.id + '</strong> <br />' + note.content;
		templateNote.style.visibility = 'hidden';
		// append the template to DOM
		document.getElementsByTagName('body')[0].appendChild(templateNote);
		// adding an eventlistener closing the alert when clicked
		templateNote.addEventListener('click', function() {
			buffer.splice(buffer.indexOf(this), 1);
			allocate();
			this.remove();
			this.removeEventListener('click');
		});
		// setting a timeout for closing the aired alert
		setTimeout(function() {
			var target = document.getElementById(note.id);
			if (target) {
				buffer.splice(buffer.indexOf(target), 1);
				allocate();
				target.remove();
				target.removeEventListener('click');
			}
		}, options.delay);
		// adding created alert to the array
		buffer.push(templateNote);
		// showing latest alerts
		allocate();
	};
});