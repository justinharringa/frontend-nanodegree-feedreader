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
        var hiddenMenuClass = 'menu-hidden';

        it('is hidden by default', function () {
            expect(document.body.classList).toContain(hiddenMenuClass);
        });

        it('opens and closes when clicked', function () {
            var menu = $('.menu-icon-link');
            var body = document.body;
            menu.click();
            expect(body.classList).not.toContain(hiddenMenuClass);
            menu.click();
            expect(body.classList).toContain(hiddenMenuClass);
        });
    });

    describe('Initial Entries', function () {
        beforeEach(function (done) {
            // Load the default feed (the first one)
            loadFeed(0, done);
        });

        it('has at least a single .entry in .feed', function () {
            var entryElementsUnderFeed = document.querySelectorAll('.feed .entry');
            expect(entryElementsUnderFeed.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function () {
        var feed = document.getElementsByClassName('feed')[0];
        var urlFromFirstEntryOfInitialFeed;

        beforeEach(function (done) {
            // 1. Load the default feed (the first one)
            // 2. Store the first child URL
            // 3. Then call the done() callback for our tests to run
            loadFeed(0, function () {
                urlFromFirstEntryOfInitialFeed = feed.children[0].href;
                loadFeed(1, done);
            });
        });

        it('should have a new first entry url after loading a new feed', function () {
            expect(feed.children[0].href).not.toBe(urlFromFirstEntryOfInitialFeed);
        });
    });
}());
