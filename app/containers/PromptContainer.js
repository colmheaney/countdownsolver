var React = require('react');
var Prompt = require('../components/Prompt.js');

var PromptContainer = React.createClass({
  getInitialState: function () {
    return {
      letters: '',
      words: ''
    }
  },
  handleSubmitLetters: function (e) {
    e.preventDefault();
    var letters = this.state.letters;
    var words = letters.toUpperCase();
    this.setState({
      letters: ''
    });
  },
  handleUpdateLetters: function (event) {
    this.setState({
      letters: event.target.value
    });
  },
  render: function () {
    return (
      <Prompt
        onSubmitLetters={this.handleSubmitLetters}
        onUpdateLetters={this.handleUpdateLetters}
        words={this.state.words}
        letters={this.state.letters} />
    )
  }
});

module.exports = PromptContainer;
