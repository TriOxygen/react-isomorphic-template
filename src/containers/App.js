import React, { PropTypes } from 'react';
import radium from 'radium';

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;