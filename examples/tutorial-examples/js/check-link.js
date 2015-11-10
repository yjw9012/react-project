var CheckLink = React.createClass({
  render: function() {
    // This takes any props passed to CheckLink and copies them to <a>
    return <a {...this.props}>{'√ '}{this.props.children}</a>;
  }
});

ReactDOM.render(
  <CheckLink href="http://yjw9012.github.io">
    Click here!
  </CheckLink>,
  document.getElementById('example')
);