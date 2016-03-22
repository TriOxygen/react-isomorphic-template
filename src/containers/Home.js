import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import TodosView from 'components/TodosView';
import TodosForm from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as websiteActions from 'reducers/WebsiteReducer';
import classNames from 'classnames';
// import theme from '../style/theme';
import { Colors, Theme, Units, Typography } from 'oxygen-md/Styles';
import Section from 'containers/Section';
import MaterialTest from 'containers/MaterialTest';
import View from 'oxygen-md/View';
import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import Scrollable from 'components/Scrollable';
import TransitionTest from 'components/TransitionTest';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux'

// console.log(__CONFIG__)

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
  box: {
    width: 400,
    padding: 5,
    height: 100,
    backgroundColor: '#777'
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
  heading1: {
    display: 'block',
    fontSize: Typography.desktop.title.fontSize,
    fontWeight: Typography.desktop.title.fontWeight,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    flex: 1
  },
  toolbar: {
    position: 'relative',
    zIndex: 2
  }
});

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
    y: 0,
    srollTop: 0
  };

  sections = {};

  static propTypes = {
    go: PropTypes.func,
    website: PropTypes.object.isRequired,
    getStructure: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object
  };

  // static needs = [
  //   websiteActions.getStructure
  // ];

  add(section, index ) {
    this.sections[index] = section;
  }

  // getWebsite() {
  //   const { getStructure } = this.props;
  //   getStructure();
  // }

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

  jump(sectionNo) {
    const node = ReactDOM.findDOMNode(this.sections[sectionNo]);
    this.setState({ scrollTop: node.offsetTop });
  }

  renderRandom() {
    return (
      <div>
        <Section ref={c => this.add(c, 1)} startColor={8} endColor={5}>
          <h1 className={css.heading1}>Tour</h1>
          <Scrollable className={css.box}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
            totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
            tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
            quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
          </Scrollable>
        </Section>
        <Section ref={c => this.add(c, 2)} startColor={5} endColor={7}>
          <h1 className={css.heading1}>Case Studies</h1>
          <View responsiveRow>
            <div className={css.col2}>
              <h2>Emelie</h2>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            </div>
            <div className={css.col2}>
              <h2>PT Fia</h2>
              qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
          </View>
        </Section>
        <Section ref={c => this.add(c, 3)} startColor={7} endColor={12}>
          <h1 className={css.heading1}>Blog</h1>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </Section>
        <Section ref={c => this.add(c, 4)} startColor={12} endColor={4}>
          <h1 className={css.heading1}>Press</h1>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </Section>
        <Section ref={c => this.add(c, 5)} startColor={4} endColor={12}>
          <h1 className={css.heading1}>About</h1>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
          dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
          qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
          quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
          Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
          vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
        </Section>
        <Section ref={c => this.add(c, 6)} startColor={12} endColor={8} divider={false}>
          <h1 className={css.heading1}>Contact</h1>
          <View row>
            <div className={css.col3}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
            </div>
            <div className={css.col3}>
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
              qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam,
            </div>
            <div className={css.col3}>
              quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
              vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </div>
          </View>
        </Section>
      </div>
    )
  }

  test() {
    this.props.go('/test');
  }

  go = (link) => {
    // this.context.router.push(link);
    // console.log(this.props);
    this.props.go(link);
  };

  render() {
    const pages = this.renderRandom();
    const { scrollTop } = this.state;
    // const { todos, dispatch } = this.props;
    // <RaisedButton label='Get Stuff' onClick={this.getWebsite.bind(this)}></RaisedButton>

              // {({ x }) =>
              // }
    return (
      <Layout >
        <Toolbar className={css.toolbar} primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          <RaisedButton secondary onClick={this.jump.bind(this, 1)} label={'Tour'}/>
          <RaisedButton secondary onClick={this.jump.bind(this, 2)} label={'Case Studies'}/>
          <RaisedButton secondary onClick={this.jump.bind(this, 3)} label={'Blog'}/>
          <RaisedButton secondary onClick={this.jump.bind(this, 4)} label={'Press'}/>
          <RaisedButton secondary onClick={this.jump.bind(this, 5)} label={'About'}/>
          <RaisedButton secondary onClick={this.jump.bind(this, 6)} label={'Contact'}/>
          <RaisedButton secondary link href="/users" onTouchTap={this.go} label={'Users'}/>
          <RaisedButton secondary link href="/theme" onTouchTap={this.go} label={'Theme'}/>
          <RaisedButton secondary link href="/test" onTouchTap={this.go} label={'Test'}/>
        </Toolbar>
        <Scrollable scrollTop={scrollTop} className={css.content}>
          {pages}
        </Scrollable>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getStructure: bindActionCreators(websiteActions.getStructure, dispatch),
    go: bindActionCreators(routeActions.push, dispatch)
  }
}

function mapStateToProps(state) {
  return {
    website: state.website,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);