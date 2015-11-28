var helpers = require('../helpers');

var chai = require('chai');
var expect = require('chai').expect;

suite('Helper functions', function () {

  teardown(function () {
    window = undefined;
  });

  test('onClient returns true if window object exists', function () {
    window = {};
    expect(helpers.onClient()).to.equal(true);
  });

  test('onClient returns false if window object does not exist', function () {
    expect(helpers.onClient()).to.equal(false);
  });

  test('onServer returns false if the window object exists', function () {
    window = {};
    expect(helpers.onServer()).to.equal(false);
  });

  test('onServer returns true if window object does not exist', function () {
    expect(helpers.onServer()).to.equal(true);
  });

  test('safely escape JSON Object if invalid characters exist', function() {

    var result = helpers.safeStringify({
      data: '</script>'
    });

    expect(result).to.equal('{"data":"<\\/script>"}');
  });
});