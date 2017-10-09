import React, {Component} from 'react';
import Page from '../containers/VisiblePage'
import './App.css';

import {BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {

  componentWillMount() {
    this.props.instantiateWeb3()
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Link to="/" className="App-title">
              <h1>BlockColor</h1>
            </Link>
          </header>
          <Route exact path="/" component={Page}/>
          <Route path="/thread/*" component={Page}/>
        </div>
      </Router>
    )
  }
}

export default App;
