/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    paths: {
        'jquery': 'jquery/jquery',
        'extend': 'gextend/extend',
        'windowsocket': 'windowsocket'
    }
});

define(['windowsocket', 'jquery'], function (WindowSocket, $) {
    console.log('Loading');
	var windowsocket = new WindowSocket('tcp://localhost:9000/test');
	windowsocket.send();
	windowsocket.onopen = function(e){
		console.log('WE ARE OPEN', e, windowsocket.readyState);
	};

	windowsocket.onerror = function(e){
		console.error('WE HAVE ERROR', e);
	};
	window.windowsocket = windowsocket;
});