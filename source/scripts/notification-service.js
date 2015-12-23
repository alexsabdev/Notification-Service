'use_strict';

angular.module('notification-service', [])

.service('Notification', function(){

	var options = {
		delay: 3000,
		limit: 2
	};

	var onScreen = 0;
	var buffer = [];

	var appendElement = function(child, parent) {

		angular.element(document).find(parent).append(child);
		if (notificationBlockExists) {
			onScreen++;
			console.log("on screen: " + onScreen);
		}

	};

	var notificationBlockExists = false;

	this.notify = function(note) {
		if (!notificationBlockExists) {
			appendElement('<notificationBlock></notificationBlock>', 'body');
			notificationBlockExists = true;
		}
		var noteDiv = 
		'<div class="alert alert-'
		+ note.category
		+ ' alert-dismissible notification" role="alert" id="'
		+ note.id
		+ '"><strong>'
		+ note.header
		+ ' '
		+ note.id
		+ '</strong> <br />'
		+ note.content
		+ '</div>';
		note.noteDiv = noteDiv;

		if (onScreen === options.limit) {
			var toBuffer = document.getElementsByTagName('notificationBlock')[0].firstChild;
			buffer.push(toBuffer);
			toBuffer.remove();
			onScreen--;
			console.log(buffer);
		}

		if (onScreen < options.limit) {

			appendElement(note.noteDiv, 'notificationBlock');

			setTimeout(function() {
				if (document.getElementById(note.id) !== null) {
					document.getElementById(note.id).remove();
					onScreen--;
					// if (buffer.length !== 0) {
					// 	appendElement(buffer[0], 'notificationBlock');
					// 	buffer.slice(0,1);
					// 	onScreen++;
					// }

				}
			},options.delay);

			document.getElementById(note.id).addEventListener("click", function() {
				onScreen--;
				clearTimeout(this);
				this.remove();
				console.log("killed");
			});
		}
	};

	

});

