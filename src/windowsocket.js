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
        readyState: 0,

        SCHEME:'tcp://',

        onerror: function() {},
        onclose: function() {},
        onmessage: function() {},
        onopen: function() {}
    };

    var ERROR_REQUIRED_ARGUMENT = 'Failed to construct \'WindowSocket\': 1 argument required, but only 0 present.';
    var ERROR_URL_SCHEME = 'Failed to construct \'WindowSocket\': The URL\'s scheme must be \'{{scheme}}\'.';
    var ERROR_CONNECT_URL = 'WindowSocket connection to \'{{url}}\' failed: Connection closed before receiving a handshake response.'
    var ERROR_INVALID_STATE = 'WindowSocket connection has not been established';
    var ERROR_UNKNOWN_EVENT_TYPE = 'WindowSocket unkown event type {{type}}';
    /**
     * WindowSocket constructor
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
     * @param  {object} config Configuration object.
     */
    var WindowSocket = function(url, protocols, config) {
        this.url = url;
        this.protocols = protocols;

        this._listeners = {};

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
    WindowSocket.CONNECTING = 0;
    /**
     * The connection is open and ready to communicate.
     */
    WindowSocket.OPEN = 1;
    /**
     * The connection is in the process of closing.
     */
    WindowSocket.CLOSING = 2;
    /**
     * The connection is closed or couldn't be opened.
     */
    WindowSocket.CLOSED = 3;

    ///////////////////////////////////////////////////
    // PUBLIC METHODS
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
    WindowSocket.prototype.init = function(config) {
        if (this.initialized) return this.logger.warn('Already initialized');
        this.initialized = true;

        console.log('WindowSocket: Init!');
        _extend(this, config);

        if(!this.url) throw new TypeError(ERROR_REQUIRED_ARGUMENT);
        if(this.url.indexOf(this.SCHEME) !== 0) throw new SyntaxError(ERROR_REQUIRED_ARGUMENT);
        if(!WindowServer.connect(this)) throw new Error(ERROR_CONNECT_URL);

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
        //Since we send the connection event on the next frame
        //we might construct a new WindowSocket instance and
        //call send right away. If state is CONNECTING we should
        //probably throw an Error?
        //TODO: Confirm WebSocket behavior.
        if(this.readyState === WindowSocket.CONNECTING){
            return;
        }

        if (this.readyState !== WindowSocket.OPEN) {
            throw new Error(ERROR_INVALID_STATE);
        }

        WindowServer.send(this, data);
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
        //TODO: Guard against initial frame delay!
        //
        if(this.readyState === WindowSocket.CLOSED || this.readyState === WindowSocket.CLOSING){
            return;
        }

        this.readyState = WindowSocket.CLOSING;
        WindowServer.close(this);
    };

    ///////////////////////////////////////////////////
    // EventTarget Interface
    // @see http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration
    ///////////////////////////////////////////////////

    /**
     * DOM 2 EventTarget Interface implementation.
     * @param {String} type
     * @param {Function} listener
     * @param {Boolean} useCapture
     * @return {void}
     */
    WindowSocket.prototype.addEventListener = function(type, listener, useCapture){
        if(!(type in this._listeners)) this._listeners[type] = [];
        this._listeners[type].push(listener);
    };

    /**
     * DOM 2 EventTarget Interface implementation.
     * @param {String} type
     * @param {Function} listener
     * @param {Boolean} useCapture
     * @return {void}
     */
    WindowSocket.prototype.removeEventListener = function(type, listener, useCapture){
        if(!(type in this._listeners)) return;
        var events = this._listeners[type];
        var i = events.length - 1;
        for (i; i >= 0; --i) {
            if (events[i] !== listener) continue;
            events.splice(i, 1);
            break;
        }
    };

    /**
     * DOM 2 EventTarget Interface implementation.
     * @param {Event} event
     * @return {void}
     */
    WindowSocket.prototype.dispatchEvent = function(event){
        var events = this._listeners[event.type] || [];
        var t = events.length, i = 0;
        for(; i < t; ++i){
            events[i](event);
        }
        //apply delegated callbacks:
        var handler = this['on' + event.type];
        if(typeof handler === 'function') handler.call(this, event);
    };

    ///////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////
    /**
     * Method to trigger external events.
     * @param  {Object} e
     * @return {void}
     */
    WindowSocket.prototype._triggerEvent = function(e){
        if(e.readyState) this.readyState = e.readyState;

        var event,
            events = ['open', 'error', 'close'];
        if(events.indexOf(e.type) !== -1){
            event = this._buildEvent(e.type, e);
        } else if(e.type === 'message') {
            event = this._buildMessageEvent(e.type, e.message);
        } else {
            //TODO: ErrorMessage factory, replace strings.
            throw new Error(ERROR_UNKNOWN_EVENT_TYPE);
        }

        this.dispatchEvent(event);
    };

    /**
     * Create an Event instance.
     * Interface DocumentEvent DOM Level 2.
     *
     * @see http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-DocumentEvent
     * @see https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
     * @param  {String} type
     * @return {void}
     */
    WindowSocket.prototype._buildEvent = function(e){
        //assert(e.type);
        if(document.createEvent && window.Event){
            var event = document.createEvent('Event');
            event.initEvent(e.type, false, false);
            return event;
        }
        return {type:e.type, bubbles:false, cancelable:false};
    };

    /**
     * Create an MessageEvent instance.
     * Interface DocumentEvent DOM Level 2.
     *
     * @see http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-DocumentEvent
     * @see https://developer.mozilla.org/en-US/docs/Web/API/document.createEvent
     * @param  {String} data
     * @return {void}
     */
    WindowSocket.prototype._buildMessageEvent = function(e){
        //TODO: assert(e.message);
        var data = e.message;

        if(window.MessageEvent && typeof MessageEvent === 'function'){
            return new MessageEvent('message', {
                'view':window,
                'bubbles':false,
                'cancelable':false,
                'data':data
            });
        }

        if(document.createEvent && window.MessageEvent){
            var event = document.createEvent('MessageEvent');
            event.initWithMessage('message', false, false, data, null, null, window, null);
            return event;
        }

        return {type:'message', data:data, bubbles:false, cancelable:false};
    };

    WindowSocket.prototype._buildCloseEvent = function(e){
        //TODO: assert(e.code, e.reason, e.clean);
        var event = this._buildEvent('close');
        event.code = e.code;
        event.reason = e.reason;
        event.wasClean = e.clean;

        return event;
    };

    WindowSocket.prototype._throwError = function(e){

    };

    /**
     * Logger method, meant to be implemented by
     * mixin. As a placeholder, we use console if available
     * or a shim if not present.
     */
    WindowSocket.prototype.logger = _shimConsole(console);



    function WindowServer(){}

    WindowServer.connect = function(instance){
        WindowServer.connection = window._tcpManager();
        if(!WindowServer.connection) return false;
        var url = instance.url;

        //execute next
        setTimeout(function(){
            instance.readyState = WindowSocket.OPEN;
            instance.onopen(new Event('open'));
        },0);

        return true;
    };

    WindowServer.handle = function(){};
    WindowServer.send = function(){};
    WindowServer.close = function(){};

    return WindowSocket;
}));

function _tcpManager(){
    this.onMessage = function(){};
    this.send=function(url, msg){console.log('SENDING:', url, msg)};
    return this;
}