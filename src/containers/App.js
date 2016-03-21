import React, { PropTypes } from 'react';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import { connect } from 'react-redux';
import { setLocale } from 'lib/I18n';

const appStyles = oxygenCss({
  HTML: {
    width: '100%',
    height: '100%',
    fontFamily: `'Source Sans Pro', sans-serif`,
    fontSize: 14,
    fontWeight: 300,
  },
  BODY: {
    width: '100%',
    height: '100%',
    fontFamily: `'Source Sans Pro', sans-serif`,
    fontSize: 14,
    fontWeight: 300,
  },
  root: {
    height: '100%',
  }
})

import { Colors, Theme } from 'oxygen-md/Styles';
const { material } = Colors;

class App extends React.Component {

  static childContextTypes = {
    theme: PropTypes.object,
  };

  static propTypes = {
    children: PropTypes.object,
    locale: PropTypes.object,
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

  componentDidMount() {
    const node = document.getElementById('app');
    node.className = appStyles.root;
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  componentDidUpdate() {
    const node = document.getElementById('app');
    CSSPropertyOperations.setValueForStyles(node, this.getStyle());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      const { primary, secondary, tertiary, main } = nextProps.theme;
      this.theme.setTheme(material[primary], material[secondary], material[tertiary], main);
      this.forceUpdate();
    }
    if (this.props.locale !== nextProps.locale) {
      const { locale, defaultCurrency } = nextProps.locale;
      setLocale(locale, defaultCurrency);
      this.forceUpdate();
    }
  }

  getStyle() {
    const theme = this.theme;
    return {
      backgroundColor: theme.theme.background.hex,
      color: theme.text.default,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme,
    locale: state.locale
  }
}

export default connect(mapStateToProps)(App);
