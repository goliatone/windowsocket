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
});