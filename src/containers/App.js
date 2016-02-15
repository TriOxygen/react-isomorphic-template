import React, { PropTypes } from 'react';
import { connect } from 'react-redux';


const appStyles = oxygenCss({
  root: {
    height: '100%'
  }
})

import { Colors, Theme } from 'oxygen-md/Styles';
const { material } = Colors;

class App extends React.Component {

  static childContextTypes = {
    theme: PropTypes.object
  };

  static propTypes = {
    children: PropTypes.object,
    theme: PropTypes.object
  };

  constructor() {
    super(...arguments);
    const { primary, secondary, tertiary, main } = this.props.theme;
    this.theme = new Theme(material[primary], material[secondary], material[tertiary], main);
  }

  getChildContext() {
    return {
      theme: this.theme
    };
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      const { primary, secondary, tertiary, main } = nextProps.theme;
      this.theme.setTheme(material[primary], material[secondary], material[tertiary], main);
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className={appStyles.root}>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps)(App);
