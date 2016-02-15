import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import shallowCompare from 'react-addons-shallow-compare';
import Scrollable from 'components/Scrollable';
import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';

import * as itemActions from 'reducers/Items';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const css = oxygenCss({
  item: {
    // transition: 'all ease 0.25s',
    position: 'relative',
  },
  container: {
    position: 'relative'
  },
  content: {
    flex: 1
  },
});

class TransitionTest extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  addItem() {
    const { addItem } = this.props;
    addItem(Math.random());
  }

  delete(item) {
    const { deleteItem } = this.props;
    deleteItem(item.id);
  }

  edit(item) {
    const { editItem } = this.props;
    editItem(item.id, 'Changed!' + Math.random());
  }

  render() {
    const { items } = this.props;
    return (
      <Layout >
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          <RaisedButton onClick={this.addItem.bind(this)} label={'Add'} />
        </Toolbar>
        <Scrollable className={css.content} >
          <Transition
            component={'div'}
            className={css.container}
            enter={{
              height: 48,
              left: 0,
              opacity: 1,
            }}
            leave={{
              height: 0,
              left: 800,
              opacity: 0,
            }}
            appear={{
              height: 0,
              left: -200,
              opacity: 0,
            }}
          >
            {
              items.map(item =>
                <div className={css.item} key={item.id}>
                  {item.content}
                  <RaisedButton secondary onClick={this.edit.bind(this, item)} label='Edit' />
                  <RaisedButton primary onClick={this.delete.bind(this, item)} label='Del' />
                </div>
              )
            }
          </Transition>
        </Scrollable>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: bindActionCreators(itemActions.addItem, dispatch),
    editItem: bindActionCreators(itemActions.editItem, dispatch),
    deleteItem: bindActionCreators(itemActions.deleteItem, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransitionTest);