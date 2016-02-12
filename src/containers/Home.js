import React, { PropTypes } from 'react';
import TodosView from 'components/TodosView';
import TodosForm from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as websiteActions from 'reducers/WebsiteReducer';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import theme from '../style/theme';
import { Colors, Theme, Units, Typography } from 'oxygen-md/Styles';
import Section from 'containers/Section';
import MaterialTest from 'containers/MaterialTest';
import View from 'oxygen-md/View';
import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import { Motion, spring } from 'react-motion';

const { material } = Colors;
const theme = new Theme(material.red, material.amber, material.grey, 'light');
const invalidChars = /[^_a-z0-9-]/ig;

const css = oxygenCss({
  col1: {
    padding: `0 ${Units.phone.gutter.mini}px`,
    width: '100%'
  },
  animationHolder: {
    height: Units.phone.gutter.more,
    position: 'relative',
  },
  animationThumb: {
    width: Units.phone.gutter.more,
    height: Units.phone.gutter.more,
    backgroundColor: '#777'
  },
  col2: {
    padding: `0 ${Units.phone.gutter.mini}px`,
    flexGrow: 1,
    width: '50%',
    '@phone': {
      width: '100%'
    }
  },
  image: {
    maxWidth: '100%'
  },
  col3: {
    padding: `0 ${Units.phone.gutter.mini}px`,
    flexGrow: 1,
    width: '33%',
    '@phone': {
      width: '100%'
    }
  },
  title: {
    display: 'block',
    fontSize: Typography.desktop.title.fontSize,
    fontWeight: Typography.desktop.title.fontWeight,
  }
});

function mapDispatchToProps(dispatch) {
  return {
    getStructure: bindActionCreators(websiteActions.getStructure, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    website: state.website
  }
}

class ImageModule extends React.Component {

  render() {
    const { content, params, className } = this.props;
    const url = content[0].url;
    const { caption } = params;

    return (
      <div className={className}>
        <img src={url} className={css.image}/>
        <figcaption>{caption}</figcaption>
      </div>
    );
  }
}

class TextModule extends React.Component {

  render() {
    const { content, className } = this.props;

    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: content }}/>
    );
  }
}

const moduleMap = {
  image: ImageModule,
  text: TextModule
};



class Home extends React.Component {
  state = {
    scrollTop: 0,
    y: 0,
  };

  static propTypes = {
    // todos: PropTypes.any.isRequired,
    website: PropTypes.object.isRequired,
    getStructure: PropTypes.func.isRequired
  };

  static needs = [
    websiteActions.getStructure
  ];

  static childContextTypes = {
    theme: PropTypes.object
  };

  handleScroll(e) {
    this.setState({ y: e.scrollPercentage });
  }

  getChildContext() {
    return {
      theme: theme
    };
  }

  getWebsite() {
    const { getStructure } = this.props;
    getStructure();
  }

  handleWheel(deltaY, scrollMax) {
    let scrollTop = this.state.scrollTop + deltaY;
    if (scrollTop > scrollMax) {
      scrollTop = scrollMax;
    } else if (scrollTop < 0) {
      scrollTop = 0;
    }
    this.setState({ scrollTop });
  }

  renderPages() {
    const { website } = this.props;
    const colors = [8, 5, 7, 12, 4, 14, 10, 13, 9, 11,];
    const pageCount = website.pages.length;

    return website.pages.map((page, index) => {
      const { summary, id, name } = page;
      const rows = summary.rows.map(row => {
        const colCount = row.pageModules.length;
        const cols = row.pageModules.map(pageModule => {
          const Module = moduleMap[pageModule.type.name];
          if (Module) {
            return (
              <Module
                key={pageModule.id}
                className={css['col'+colCount]}
                {...pageModule.data}
              />
              );
          }
          return null;
        });
        return (
          <View responsiveRow key={row.id}>
            {cols}
          </View>
        );
      });
      const divider = index < pageCount - 1;
      return (
        <Section divider={divider} startColor={colors[index]} endColor={colors[index + 1]} key={id} className={name.replace(invalidChars, '-').toLowerCase()}>
          {rows}
        </Section>
      );
    });
  }

  render() {
    const pages = this.renderPages();
    const { scrollTop } = this.state;
    // const { todos, dispatch } = this.props;
    // <RaisedButton label='Get Stuff' onClick={this.getWebsite.bind(this)}></RaisedButton>

              // {({ x }) =>
              // }
            // <RaisedButton onClick={this.jump.bind(this)} label={'Jump'}/>
    return (
      <Motion style={{ scrollTop: spring(scrollTop, {stiffness: 150, damping: 15}) }}>
        {({ scrollTop }) =>
          <Layout scrollTop={scrollTop} onContentWheel={this.handleWheel.bind(this)} >
            <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
              <div className={css.animationHolder}>
                <div className={css.animationThumb} style={{
                  transform: `translate3d(${scrollTop / 2}px, 0, 0)`
                }}/>
              </div>
            </Toolbar>
            {pages}
          </Layout>
        }
      </Motion>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);