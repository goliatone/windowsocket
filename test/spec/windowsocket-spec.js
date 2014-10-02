/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['windowsocket'], function(WindowSocket) {

    describe('just checking', function() {

        it('WindowSocket should be loaded', function() {
            expect(WindowSocket).toBeTruthy();
            var windowsocket = new WindowSocket();
            expect(windowsocket).toBeTruthy();
        });

        it('WindowSocket should initialize', function() {
            var windowsocket = new WindowSocket({
                autoinitialize: false
            });
            var output = windowsocket.init();
            var expected = 'This is just a stub!';
            expect(output).toEqual(expected);
        });

    });

});