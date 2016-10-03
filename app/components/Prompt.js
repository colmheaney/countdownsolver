var React = require('react');
var PropTypes = React.PropTypes;

function Prompt (props) {
  return (
    <div className="jumbotron col-sm-6 col-sm-offset-3 text-center">
      <div className="col-sm-12">
        <form onSubmit={props.onSubmitLetters}>
          <div className="form-group">
            <input
              className='form-control'
              onChange={props.onUpdateLetters}
              placeholder='Pick your letters'
              type='text'
              value={props.letters} />
          </div>
          <div className="form-group col-sm-4 col-sm-offset-4">
            <button
              className="btn btn-block btn-success"
              type="submit">
                Go
            </button>
          </div>
        </form>
        <div>
          {props.words}
        </div>
      </div>
    </div>
  )
}

Prompt.propTypes = {
  onSubmitLetters: PropTypes.func.isRequired,
  onUpdateLetters: PropTypes.func.isRequired,
  letters: PropTypes.string.isRequired,
  words: PropTypes.string.isRequired,
}

module.exports = Prompt;