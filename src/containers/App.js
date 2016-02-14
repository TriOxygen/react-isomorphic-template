import React, { PropTypes } from 'react';

const appStyles = oxygenCss({
  root: {
    height: '100%'
  }
})

import { Colors, Theme } from 'oxygen-md/Styles';
const { material } = Colors;
const theme = new Theme(material.red, material.amber, material.grey, 'light');

class App extends React.Component {

  static childContextTypes = {
    theme: PropTypes.object
  };

  static propTypes = {
    children: PropTypes.object
  };

  getChildContext() {
    return {
      theme: theme
    };
  }


  render() {
    return (
      <div className={appStyles.root}>
        {this.props.children}
      </div>
    );
  }
}

export default App;