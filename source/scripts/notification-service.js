'use_strict';
/**
 * $ngdoc module
 * $name notification-service
 * $description
 *
 * This is the notification-service module
 */
angular.module('notification-service', [])
/**
 * @ngdoc service
 * @name Notification
 * @description 
 *
 * This is the service of the notification-service module
 */
.service('Notification', function(){
	/**
	 * @ngdoc object
	 * @name  options
	 * @type object
	 * @description
	 *
	 * object to collect options of the module service
	 */
	var options = {
		delay: 90000,
		limit: 5,
		startX: 5,
		startY: 5,
		spacingY: 5
	};
	/**
	 * @ngdoc array
	 * @name  buffer
	 * @type Array
	 * @description
	 *
	 * array to keep track of called notifications
	 */
	var buffer = [];
	/**
	 * @ngdoc variable
	 * @name shift
	 * @description [description]
	 *
	 * variable helping to display latest notification
	 */
	var shift = 0;
	/**
	 * @ngdoc function
	 * @name  allocate
	 * @description
	 *
	 * procedure to display latest notifications
	 */
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
	/**
	 * @ngdoc function
	 * @name notify
	 * @description 
	 *
	 * procedure invoked when an alert is called
	 */
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