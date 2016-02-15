import React, { Component, PropTypes } from 'react';
import Scrollable from 'components/Scrollable';
import { Layout, Toolbar } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as themeActions from 'reducers/ThemeReducer';
import { Units, Colors } from 'oxygen-md/Styles';
import MaterialTest from 'containers/MaterialTest';
const { material } = Colors;



const css = oxygenCss({
  root: {
  },
  testContainer: {
    padding: Units.phone.gutter.more
  },
  content: {
    flex: 1,
    zIndex: 1,
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
    changeTheme: PropTypes.func
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
    this.props.changeTheme(primary, secondary, tertiary, main);
  }

  setSecondary(secondary) {
    const { primary, tertiary, main } = this.props.theme;
    this.props.changeTheme(primary, secondary, tertiary, main);
  }

  setTertiary(tertiary) {
    const { primary, secondary, main } = this.props.theme;
    this.props.changeTheme(primary, secondary, tertiary, main);
  }

  render() {
    return (
      <Layout >
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          Theme
        </Toolbar>
        <Scrollable className={css.content}>
          {this.renderPrimary()}
          {this.renderSecondary()}
          {/*this.renderTertiary()*/}
          <div className={css.testContainer}>
            <MaterialTest />
          </div>
        </Scrollable>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTheme: bindActionCreators(themeActions.changeTheme, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemeChanger);
