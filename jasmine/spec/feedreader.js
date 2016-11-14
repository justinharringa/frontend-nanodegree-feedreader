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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /**
         * URL tests
         * NOTE: I prefer separate atomic tests to tell me exactly what is wrong. While it can result in a little
         * extra boilerplate, it also can tell me right away when something is wrong and WHAT is wrong
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


    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
