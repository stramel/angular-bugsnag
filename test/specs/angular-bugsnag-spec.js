describe('angular-bugsnag', function () {

    window.BUGSNAG_TESTING = true;

    var testRequest;

    beforeEach(module('angular-bugsnag'));

    beforeEach(module(function (bugsnagProvider) {
        testRequest = jasmine.createSpy('testRequest');

        bugsnagProvider
            .apiKey('11111111111111111111111111111111')
            .releaseStage('development')
            .user({
                id: 123,
                name: 'Jon Doe',
                email: 'jon.doe@gmail.com'
            })
            .appVersion('0.1.0')
            .metaData({
                aaa: 'bbb'
            })
            .notifyReleaseStages(['development'])
            .beforeNotify(['$log', function ($log) {
                return function (error, metaData) {
                    $log.debug(error.name);
                    return true;
                };
            }])
            ._testRequest(testRequest);

    }));


    it('should be configured with bugsnagProvider', inject(function (bugsnag, $log) {
        var actual = {};

        testRequest.andCallFake(function (url, params) {
            actual.url = url;
            actual.params = params;
        });

        bugsnag.notify('fail');

        expect(actual.url).toBe('https://notify.bugsnag.com/js');
        expect(actual.params.apiKey).toBe('11111111111111111111111111111111');
        expect(actual.params.user).toEqual({ id: 123, name: 'Jon Doe', email: 'jon.doe@gmail.com' });
        expect(actual.params.releaseStage).toBe('development');
        expect(actual.params.appVersion).toBe('0.1.0');
        expect(actual.params.name).toBe('fail');
        expect(actual.params.metaData.aaa).toBe('bbb');

        expect($log.debug.logs[0][0]).toBe('fail');
    }));

});