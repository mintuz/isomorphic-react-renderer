var React = require('react');
var isomorphicLibrary = require('../index');

var ReactTestUtils = require('react-addons-test-utils');
var chai = require('chai');
var expect = require('chai').expect;
var htmlInspector = require('cheerio');

suite('isomorphic React Library', function () {

  var ComponentExample = React.createClass({
    render: function render() {
      return React.DOM.div({
        className:'hello-name'
      }, this.props.name);
    }
  });

  teardown(function () {
    window = undefined;
  });

  test('should generate a script tag with an expected property object', function () {
    
    var expectedName = 'adam';
    var expectedComponentName = 'example_component';
    var expectedProps = 'var ' + expectedComponentName + ' = {"name":"' + expectedName + '"};';

    var generatedDOM = isomorphicLibrary.createComponent(
      expectedComponentName, 
      ComponentExample, 
      {name: expectedName}
    );

    expect(generatedDOM).to.contain(expectedProps);

  });

  test('passed in react component should have expected output matching props', function(){

    var expectedName = 'adam';
    var expectedComponentName = 'example-component';

    var generatedDOM = isomorphicLibrary.createComponent(
      expectedComponentName, 
      ComponentExample, 
      {name: expectedName}
    );

    var renderedDom = htmlInspector.load(generatedDOM);

    expect(renderedDom('.hello-name').text()).to.equal(expectedName);
  });

  test('getComponentProps returns props if they exist on the client', function(){

    var expectedProps = {
      name: 'expectedName'
    };

    window = {
      componentProps: expectedProps
    }

    expect(isomorphicLibrary.getComponentProps('componentProps')).to.equal(expectedProps);
  });

  test('getComponentProps returns false if on the client and the props don\'t exist', function(){

    window = {
      componentProps: {
        key: 'value'
      }
    }

    expect(isomorphicLibrary.getComponentProps('nonExistentProps')).to.equal(false);
  });

  test('getComponentProps returns false on the server', function(){
    expect(isomorphicLibrary.getComponentProps()).to.equal(false);
  });
});