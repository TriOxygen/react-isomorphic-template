import React, { Component, PropTypes } from 'react';
import Scrollable from 'components/Scrollable';
import { Layout, Toolbar, Paper, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Units, Colors } from 'oxygen-md/Styles';
import MaterialTest from 'containers/MaterialTest';
const { material } = Colors;
import { addMessages, translate as _l } from 'lib/I18n';
import MainAppBar from 'components/MainAppBar';
import * as profileActions from 'reducers/profileReducer';

addMessages({
  ['en-US']: {
    'Hello {0}, {1} moneyz on {2}': 'Hello {0}, {1} moneyz on {2}',
    'English': 'English',
    'Swedish': 'Swedish',
  },
  ['sv-SE']: {
    'Hello {0}, {1} moneyz on {2}': 'Hello {0}, {1} moneyz on {2}',
    'English': 'Engelska',
    'Swedish': 'Svenska',
  },
});



const css = oxygenCss({
  root: {
  },
  testContainer: {
    padding: Units.phone.gutter.more
  },
  colorChooser: {
    width: Units.phone.gutter.more,
    margin: Units.phone.gutter.mini,
    height: Units.phone.gutter.more,
    display: 'inline-block',
    cursor: 'pointer',
    verticalAlign: 'middle'
  }
});

class ThemeChanger extends Component {

  static propTypes = {
    theme: PropTypes.object,
    setTheme: PropTypes.func,
    setLocale: PropTypes.func
  };

  renderPrimary() {
    return (
      <div >
        Primary:
        {
          Object.keys(material).map(color => {
            if (color !== 'black' && color !== 'white') {
              return <div style={{ backgroundColor: material[color][500].hex }} key={color} className={css.colorChooser} onClick={this.setPrimary.bind(this, color)} />
            }
          })
        }
      </div>
    )
  }

  renderSecondary() {
    return (
      <div >
        Secondary:
        {
          Object.keys(material).map(color => {
            if (color !== 'black' && color !== 'white') {
              return <div style={{ backgroundColor: material[color][500].hex }} key={color} className={css.colorChooser} onClick={this.setSecondary.bind(this, color)} />
            }
          })
        }
      </div>
    )
  }

  renderTertiary() {
    return (
      <div >
        Tertiary:
        {
          Object.keys(material).map(color => {
            if (color !== 'black' && color !== 'white') {
              return <div style={{ backgroundColor: material[color][500].hex }} key={color} className={css.colorChooser} onClick={this.setTertiary.bind(this, color)} />
            }
          })
        }
      </div>
    )
  }

  setPrimary(primary) {
    const { secondary, tertiary, main } = this.props.theme;
    this.props.setTheme(primary, secondary, tertiary, main);
  }

  setSecondary(secondary) {
    const { primary, tertiary, main } = this.props.theme;
    this.props.setTheme(primary, secondary, tertiary, main);
  }

  setTertiary(tertiary) {
    const { primary, secondary, main } = this.props.theme;
    this.props.setTheme(primary, secondary, tertiary, main);
  }

  setShading(shading) {
    const { primary, secondary, tertiary } = this.props.theme;
    this.props.setTheme(primary, secondary, tertiary, shading);

  }

  setLocale(locale, defaultCurrency) {
    this.props.setLocale(locale, defaultCurrency);
  }

  render() {
    const name = 'Öz';
    const amount = 2000000;
    const date = new Date();
    return (
      <Layout >
        <MainAppBar>
          Theme
        </MainAppBar>
        <Scrollable>
          {this.renderPrimary()}
          {this.renderSecondary()}
          {this.renderTertiary()}
          {_l`Hello ${name}, ${amount}:c(EUR) moneyz on ${date}:d`}
          <RaisedButton label={_l`Swedish`} onTouchTap={this.setLocale.bind(this, 'sv-SE', 'SEK')}/>
          <RaisedButton label={_l`English`} onTouchTap={this.setLocale.bind(this, 'en-US', 'EUR')} />

          <RaisedButton label={`Dark`} onTouchTap={this.setShading.bind(this, 'dark')}/>
          <RaisedButton label={`Light`} onTouchTap={this.setShading.bind(this, 'light')}/>
          <MaterialTest />
        </Scrollable>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setTheme: bindActionCreators(profileActions.setTheme, dispatch),
    setLocale: bindActionCreators(profileActions.setLocale, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    theme: state.profile.settings.theme
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
