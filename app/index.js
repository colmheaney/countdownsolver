var React = require('react');
var ReactDom = require('react-dom');
var Permutations = require('./utils/Permutations');
var Dictionary = require('./utils/Dictionary');
var WordArray = require('./utils/LargeDict');
var transparentBg = require('./styles').transparentBg;
var alphabet = "abcdefghijklmnopqrstuvwxyz'";
 
var LettersBox = React.createClass({
  getInitialState: function() {
    return {
      data: [],
      isLoading: true,
    };
  },

  loadDictionary: function() {
      console.log('Loading dictionary');
      return new Promise(function(resolve, reject) {
        d = new Dictionary(alphabet);
        var count = 0;
        var words = new WordArray();
        for(word in words) {
          d.put(words[word], count++);
        }
        if(d) resolve(d);
        else reject("Error loading dictionary");
      });
  },

  handleLettersSubmit: function(input) {
      console.log("Handling letters submit");
      var p = new Permutations(input);
      var permutations = p.generate();
      var words = []

      for(var permutation = 0; permutation < permutations.length; permutation++) {
        var subwords = d.subwordsIn(permutations[permutation].letters);
        for(var subword in subwords) {
          words.push(subwords[subword]);
        };
      }

      words = Array.from(new Set(words));
      words.sort(function(a,b) { return b.length - a.length || a.localeCompare(b); });
      var id = 0;
      words = words.map(function(word) { 
        return {
          id : id++,
          letters : word
        };
      })
      this.setState({ data: words });
  },

  componentDidMount: function() {
    var dict = this.loadDictionary();
    dict.then(function(value) {
      this.setState({ isLoading: false });
    }.bind(this), function(reason) {
      console.log(reason);
    });
  },

  render: function() {
    if (this.state.isLoading === true) {
      return <div>Loading</div>
    }
    return (
      <div className="container">
        <div className="row">
          <LettersForm onLettersSubmit={this.handleLettersSubmit}/>
        </div>
        <div className="row">
          <WordList data={this.state.data} />    
        </div>
      </div>
    );
  }
});

var WordList = React.createClass({
  render: function() {
    return (
      <div className="col-sm-12">
        <ul style={ulStyle}>
          {this.props.data.map(function (word) {
            return <Word key={word.id} data={word.letters}/>;
          }) }
        </ul>
      </div>
    );
  }
});

var ulStyle = {
  paddingLeft: '0px',
}

var liStyle = {
  width: '100%',
  textDecoration: 'underline',
  listStyle: 'none',
  fontSize: '18px',
}

var Word = React.createClass({
  render: function() {
    return (
      <li style={liStyle} className="word">
        {this.props.data}
      </li>
    );
  }
});

var LettersForm = React.createClass({
  getInitialState: function() {
    return {
      letters: '',
      invalidLetters: false,
      invalidLength: false,
      lettersEmpty: false,
    };
  },
  handleLettersChange: function(e) {
    this.setState({letters: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    this.state.invalidLetters = false;
    this.state.invalidLength = false;
    this.state.lettersEmpty = false;
    var letters = this.state.letters.trim().toLowerCase();
    if (!this.validLength(letters) 
        || !this.validLetters(letters)) { return; }

    this.props.onLettersSubmit({letters: letters});
    this.setState({letters: ''});
  },

  validLetters: function(letters) {
    for(var c in letters) {
      if(alphabet.indexOf(letters[c]) == -1) {
        this.setState({ invalidLetters: true });
        return false;
      }
    }
    return true;
  },

  validLength: function(letters) {
    if (letters.length > 9) {
      this.setState({ invalidLength: true });
      return false;
    }
    if (letters.length == 0) {
      this.setState({ lettersEmpty: true });
      return false;
    }
    return true;
  },
  
  render: function() {
    return (
      <div className="col-sm-12">
        <h1>Countdown Solver</h1>
        <p className="small">See the code on
          <a href="https://github.com/colmheaney/countdownsolver"> Github</a>
        </p>
         <div>
          <form className="lettersForm form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className='form-control'
                type="text"
                placeholder="Choose 9 letters"
                value={this.state.letters}
                onChange={this.handleLettersChange}
                />
            </div>
            <button
              className="btn btn-success"
              type="submit"> Go
            </button>
            <div>
              <p className="text-danger">{this.state.invalidLetters ? 'Invalid letters' : ''}</p>
              <p className="text-danger">{this.state.invalidLength ? 'Too many letters' : ''}</p>
              <p className="text-danger">{this.state.lettersEmpty ? 'You need to provide letters' : ''}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

ReactDom.render(
  <LettersBox  />,
  document.getElementById('app')
);