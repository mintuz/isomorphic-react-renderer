var React = require('react');
var ReactDOMServer = require('react-dom/server');
var helpers = require('./helpers');

var PropsContainerFactory = React.createClass({
  render: function() {
    return React.DOM.script({
      dangerouslySetInnerHTML: {
        __html: 'var ' + this.props.propsKey + ' = ' + helpers.safeStringify(this.props.props) + ';'
      }
    }); 
  }
});

var createComponent = function(propsKey, ComponentFactory, props) {
  
  var component = React.createFactory(ComponentFactory);
  var propsContainer = React.createFactory(PropsContainerFactory);
  
  return ReactDOMServer.renderToString(propsContainer({propsKey:propsKey, props:props})) + ReactDOMServer.renderToString(component(props));
};

var getComponentProps = function(propsKey) {
  
  if(helpers.onClient() && window[propsKey]) {
    return window[propsKey];
  }

  return false;
};

module.exports.createComponent = createComponent;
module.exports.getComponentProps = getComponentProps;