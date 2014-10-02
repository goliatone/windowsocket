/*
 * windowsocket
 * https://github.com/goliatone/windowsocket
 * Created with gbase.
 * Copyright (c) 2014 goliatone
 * Licensed under the MIT license.
 */
/* jshint strict: false, plusplus: true */
/*global define: false, require: false, module: false, exports: false */
(function(root, name, deps, factory) {
    "use strict";
    // Node
    if (typeof deps === 'function') {
        factory = deps;
        deps = [];
    }

    if (typeof exports === 'object') {
        module.exports = factory.apply(root, deps.map(require));
    } else if (typeof define === 'function' && 'amd' in define) {
        //require js, here we assume the file is named as the lower
        //case module name.
        define(name.toLowerCase(), deps, factory);
    } else {
        // Browser
        var d, i = 0,
            global = root,
            old = global[name],
            mod;
        while ((d = deps[i]) !== undefined) deps[i++] = root[d];
        global[name] = mod = factory.apply(global, deps);
        //Export no 'conflict module', aliases the module.
        mod.noConflict = function() {
            global[name] = old;
            return mod;
        };
    }
}(this, 'windowsocket', ['extend'], function(extend) {

    /**
     * Extend method.
     * @param  {Object} target Source object
     * @return {Object}        Resulting object from
     *                         meging target to params.
     */
    var _extend = extend;

    /**
     * Shim console, make sure that if no console
     * available calls do not generate errors.
     * @return {Object} Console shim.
     */
    var _shimConsole = function(con) {

        if (con) return con;

        con = {};
        var empty = {},
            noop = function() {},
            properties = 'memory'.split(','),
            methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
                'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
                'table,time,timeEnd,timeStamp,trace,warn').split(','),
            prop,
            method;

        while (method = methods.pop()) con[method] = noop;
        while (prop = properties.pop()) con[prop] = empty;

        return con;
    };



    ///////////////////////////////////////////////////
    // CONSTRUCTOR
    ///////////////////////////////////////////////////

    var OPTIONS = {
        autoinitialize: true,

        binaryType: 'blob',
        bufferedAmount: 0,
        extensions: '',

        onerror: function() {},
        onclose: function() {},
        onmessage: function() {},
        onopen: function() {},

        protocol: '',
        readyState: 0,
        url: ''
    };

    /**
     * WindowSocket constructor
     *
     * @param  {object} config Configuration object.
     */
    var WindowSocket = function(config) {
        config = _extend({}, this.constructor.DEFAULTS, config);

        if (config.autoinitialize) this.init(config);
    };

    WindowSocket.name = WindowSocket.prototype.name = 'WindowSocket';

    WindowSocket.VERSION = '0.0.0';

    /**
     * Make default options available so we
     * can override.
     */
    WindowSocket.DEFAULTS = OPTIONS;

    /**
     * The connection is not yet open.
     */
    WindowSocket.CONNECTING = 0
    /**
     * The connection is open and ready to communicate.
     */
    WindowSocket.OPEN = 1
    /**
     * The connection is in the process of closing.
     */
    WindowSocket.CLOSING = 2
    /**
     * The connection is closed or couldn't be opened.
     */
    WindowSocket.CLOSED = 3

    ///////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////

    /**
     * The WindowSocket object provides the API for creating
     * and managing a WindowSocket connection to a server,
     * as well as for sending and receiving data
     * on the connection.
     *
     * @param  {String} url       The URL to which to connect; this
     *                            should be the URL to which the
     *                            WindowSocket
     *                            server will respond.
     * @param  {String|Array} protocols Optional. Either a single protocol
     *                                  string or an array of protocol strings.
     *                                  These strings are used to indicate
     *                                  sub-protocols, so that a single server
     *                                  can implement multiple WebSocket
     *                                  sub-protocols (for example, you might
     *                                  want one server to be able to handle
     *                                  different types of interactions depending
     *                                  on the specified protocol). If you don't
     *                                  specify a protocol string, an empty string
     *                                  is assumed.
     * @throws SECURITY_ERR The port to which the connection is being attempted is being blocked.
     */
    WindowSocket.prototype.init = function(url, protocols, config) {
        if (this.initialized) return this.logger.warn('Already initialized');
        this.initialized = true;

        console.log('WindowSocket: Init!');
        _extend(this, config);

        return 'This is just a stub!';
    };

    /**
     * Transmits data to the server over the WindowSocket
     * connection.
     * @param  {String} data A text string to send to
     *                       the server
     * @throws {INVALID_STATE_ERR} If connection is not currently OPEN.
     * @throws {SYNTAX_ERR} The data is a string that has unpaired surrogates.
     * @return {void}
     */
    WindowSocket.prototype.send = function(data) {

    };

    /**
     * Closes the WindowSocket connection or connection
     * attempt, if any. If the connection is already
     * CLOSED, this method does nothing.
     * @return {void}
     *
     * @param  {Number} code   A numeric value indicating the status
     *                         code explaining why the connection is
     *                         being closed. If this parameter is not
     *                         specified, a default value of 1000
     *                         (indicating a normal "transaction complete"
     *                         closure) is assumed. See the list of status
     *                         codes on the CloseEvent page for
     *                         permitted values.
     * @param  {String} reason A human-readable string explaining why the
     *                         connection is closing. This string must be
     *                         no longer than 123 bytes of UTF-8 text
     *                         (not characters).
     * @throws {INVALID_ACCESS_ERR} If an invalid code was specified.
     * @throws {SYNTAX_ERR} The reason string is too long or contains
     *                      unpaired surrogates.
     * @return {void}
     */
    WindowSocket.prototype.close = function(code, reason) {

    };

    /**
     * Logger method, meant to be implemented by
     * mixin. As a placeholder, we use console if available
     * or a shim if not present.
     */
    WindowSocket.prototype.logger = _shimConsole(console);

    /**
     * PubSub emit method stub.
     */
    WindowSocket.prototype.emit = function() {
        this.logger.warn(WindowSocket, 'emit method is not implemented', arguments);
    };

    return WindowSocket;
}));