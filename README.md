notification-service
##
notification-service - Angular.js service providing notifications using Bootstrap 3 styles with css transition animation. It creates overlay notifications on window. Number of notifications is limited by options.limit. When the limit is reached, the oldest notification temporary gets off from screen and the latest pops up. And after that gets back when there's a free spot. Created notifications are closable by clicking. They are also selfclosed within period of options.delay.
<strong>Checkout README.MD for detailed instructions!</strong>
##
author alexsabdev (alexsabdev@gmail.com)
version v1.0.0
link https://github.com/alexsabdev/notification-service.git
dependencies: no
##
options:
   delay: 90000 (in miliseconds, period within a notification is selfclosed)
   limit: 5 (number of notifications on screen)
   startX: 5 (in px, starting position form the right for the first notifiation)
   startY: 5 (in px, starting position form the left for the first notifiation)
   spacingY: 5 (in px, distance bentween notifications)
##
injection:
Simply inject the notification-service to your app module:
   var app = angular.module('myApp', ['notification-service']);
And inject its service called 'Notification' to the app controller:
   app.controller('AppController', ['$scope', 'Notification', function($scope, Notification){...}]);
You need also to download notification-service.js and notification-service-styles.css from the dist folder.
Don't forget to link downloaded files to your html/template:
   <link rel="stylesheet" href="styles/notification-service-styles.css">
   <script src="scripts/notification-service.js"></script>
##
calling: 
After injection, when you need to show notifications, simply call (javascript):
   Notification.notify(note);
Where note is a notification object consisting of followsing properties:
   id: The id of the notification message.
   from: Identifier of the emitter.
   category: Category of the notification message. Possible categories are “info”, “warning” and “error”.
   type: Type of the notification – Possible types for the sevice version are “note”.
   header: Header of the notification.
   content: Content of the notification.
##
Please get in touch with me if your have proposals how to modify the service.
Thanks! 
Have fun!