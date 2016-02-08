import React, { PropTypes } from 'react';

const appStyles = oxygenStyle({
  root: {
    height: '100%'
  }
})

class App extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className={appStyles.root}>
        {this.props.children}
      </div>
    );
  }
}

export default App;