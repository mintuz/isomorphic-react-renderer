# Isomorphic React

## Why
You may want to do use this if you are rendering a React template server side with some fallback content / content for SEO then on the client want to update this React template with some new data that is post loaded.

If you don't pass the React properties to the client, your entire React component will re-render which isn't very performant. By using this the React template will do a partial re-render.

This problem is common and you can read about it on the internet. This is my solution. If it's not suitable here are some alternatives and articles which discuss this problem at length. 

* https://github.com/DavidWells/isomorphic-react-example
* https://github.com/RickWong/react-isomorphic-starterkit
* https://bensmithett.github.io/going-isomorphic-with-react/#/
* https://strongloop.com/strongblog/node-js-react-isomorphic-javascript-why-it-matters/

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