import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import { spring } from 'react-motion';
import { RaisedButton } from 'oxygen-md';
import shallowCompare from 'react-addons-shallow-compare';

import * as itemActions from 'reducers/Items';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const css = oxygenCss({
  item: {
    position: 'relative',
  },
  container: {
    position: 'relative'
  }
})

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
      <div>
        <RaisedButton onClick={this.addItem.bind(this)} label={'Add'} />
        <div>
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
        </div>
      </div>
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