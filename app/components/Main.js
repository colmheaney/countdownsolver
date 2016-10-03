var React = require('react');
var Prompt = require('../containers/PromptContainer.js');
// var Results = require('../containers/ResultsContainer.js');

var Main = React.createClass({
  render: function() {
    return (
      <div className='main-container'>
        <Prompt />
      </div>
    )
  }
});

module.exports = Main;
