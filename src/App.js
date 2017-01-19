import React, { PropTypes } from 'react';
import Header from './components/header/Header';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      <div className="container-fluid">
              <Header />
              {this.props.children}
            </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
