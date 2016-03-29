import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import i18n from './I18n';

class IntlProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    locale: PropTypes.string,
    defaultCurrency: PropTypes.string
  };

  static childContextTypes = {
    i18n: PropTypes.object,
  };

  constructor() {
    super(...arguments);
    this.i18n = i18n;
  }

  getChildContext() {
    return {
      i18n: this.i18n
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.locale !== nextProps.locale || this.props.defaultCurrency !== nextProps.defaultCurrency) {
      const { locale, defaultCurrency } = nextProps;
      i18n.setLocale(locale, defaultCurrency);
      this.i18n = {
        locale: i18n.locale,
        defaultCurrency: i18n.defaultCurrency,
      };
      this.forceUpdate();
    }
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

function mapStateToProps(state) {
  const { locale } = state.profile.settings;
  return {
    ...locale
  }
}

export default connect(mapStateToProps)(IntlProvider);
