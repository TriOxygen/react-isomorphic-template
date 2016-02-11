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
const { material } = Colors;

const theme = new Theme(material.red, material.amber, material.grey, 'light');

import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';


const css = oxygenStyle({
  col1: {
    padding: Units.phone.gutter.mini,
  },
  col2: {
    padding: Units.phone.gutter.mini,
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
    padding: Units.phone.gutter.mini,
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

  getChildContext() {
    return {
      theme: theme
    };
  }

  getWebsite() {
    const { getStructure } = this.props;
    getStructure();
  }

  renderPages() {
    const { website } = this.props;
    const colors = [10, 13, 9, 11, 8, 5, 7, 12, 4, 14];

    return website.pages.map((page, index) => {
      const { summary, id } = page;
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
      return (
        <Section colorScheme={colors[index]} key={id}>
          {rows}
        </Section>
      );
    })
  }

  render() {
    const pages = this.renderPages();
    // const { todos, dispatch } = this.props;
    // <RaisedButton label='Get Stuff' onClick={this.getWebsite.bind(this)}></RaisedButton>
    return (
      <Layout>
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          Coursio
        </Toolbar>
        {pages}
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);