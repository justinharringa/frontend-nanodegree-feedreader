/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /**
     * RSS Feeds
     *
     * NOTE: I prefer separate atomic tests to tell me exactly what is wrong. While it can result in a little
     * extra boilerplate, it also can tell me right away when something is wrong and WHAT is wrong
     */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
        });

        it('are not empty', function() {
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * URL tests
         */
        it('have a URL defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
            });
        });

        it('have a non-empty URL', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).not.toBe('');
            });
        });

        /**
         * Name tests
         */
        it('have a name defined', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
            });
        });

        it('have a non-empty name', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {
        it('is hidden by default', function () {
            expect(document.body.className).toBe('menu-hidden');
        });

        it('opens and closes when clicked', function () {
            var menu = $('.menu-icon-link');
            var body = document.body;
            menu.click();
            expect(body.className).toBe('');
            menu.click();
            expect(body.className).toBe('menu-hidden');
        });
    });

    describe('Initial Entries', function () {
        var feed = document.getElementsByClassName('feed')[0];

        beforeEach(function (done) {
            // Load the default feed (the first one)
            loadFeedFromArray(allFeeds, 0, done);
        });

        it('are populated in the feed container', function () {
            expect(feed.childElementCount).toBeGreaterThan(0);
        });

        it('populates an .entry-link in .feed', function () {
            expect(feed.children[0].className).toBe('entry-link');
        });

        it('populates an .entry in .entry-link', function () {
            expect(feed.children[0].children[0].className).toBe('entry');
        });
    });

    describe('New Feed Selection', function () {
        var feed = document.getElementsByClassName('feed')[0];
        var urlFromFirstEntryOfInitialFeed;

        beforeEach(function (done) {
            // 1. Load the default feed (the first one)
            // 2. Store the first child URL
            // 3. Then call the done() callback for our tests to run
            loadFeedFromArray(allFeeds, 0, function () {
                urlFromFirstEntryOfInitialFeed = feed.children[0].href;
                loadFeedFromArray(allFeeds, 1, done)
            });
        });

        it('should have a new first entry url after loading a new feed', function () {
            expect(feed.children[0].href).not.toBe(urlFromFirstEntryOfInitialFeed);
        });

        afterEach(function (done) {
            // Probably not necessary, but reset back to first feed
            loadFeedFromArray(allFeeds, 0, done);
        });
    });

    describe('Null feed', function () {
        var feed = document.getElementsByClassName('feed')[0];
        beforeEach(function (done) {
            // allFeeds.length would be just out of bounds
            loadFeed(null, done);
        });

        it('should show an error', function () {
            expect(feed.children[0].textContent).toBe('You attempted to access an undefined feed.');
        });

        afterAll(function (done) {
            loadFeedFromArray(allFeeds, 0, done)
        });
    });

    describe('Undefined', function () {
        var testFeeds = [
            {
                url: 'http://blog.udacity.com/feed'
            },
            {
                name: 'Undefined URL'
            }
        ];

        it('feed above array index should be null', function () {
            expect(getFeedFromArray(testFeeds, testFeeds.length)).toBeNull();
        });

        it('feed below array index should be null', function () {
            expect(getFeedFromArray(testFeeds, -42)).toBeNull();
        });

        it('name should become url', function () {
            expect(getFeedFromArray(testFeeds, 0).name).toBe(testFeeds[0].url);
        });

        it('url should return a null feed', function () {
            expect(getFeedFromArray(testFeeds, 1)).toBeNull();
        });
    });
}());
