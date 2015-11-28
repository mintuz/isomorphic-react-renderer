# Isomorphic React

## Install

`npm install isomorphic-react`

## Usage

### Example component

```
var React = require('react');

module.exports React.createClass({
  getInitialState: function () {
    return {
      name: this.props.name
    };
  },
  render: function render() {
    return React.DOM.div({
      className:'hello-name'
    }, this.state.name);
  }
});
```

### On the server

```
var express = require('express');
var app = express();
var isomorphicReactLib = require('isomorphic-react');
var ExampleComponent = require('example-component');

var htmlDOM = isomorphicReactLib.createComponent(
  'component-name', 
  ExampleComponent, 
  {name: 'Adam Bulmer'}
);

app.get('/', function (req, res) {
  res.send(htmlDOM);
});
```

### On the client

```
var React = require('react');
var ReactDOM = require('react-dom');

var isomorphicReactLib = require('isomorphic-react');
var ExampleComponent = require('example-component');

var props = isomorphicReactLib.getComponentProps('component-name');
var exampleComponent = React.createFactory(ExampleComponent);

var componentReference = ReactDOM.render(exampleComponent(props), document.querySelector('.same-mount-point-as-server'));

var newName = 'John Smith';

componentReference.setState({name: newName});
```