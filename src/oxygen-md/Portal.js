import React, { PropTypes, Component } from 'react';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import shallowEquals from 'shallow-equals';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';

export default class Portal extends Component {
  static displayName = 'Portal';

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  };

  componentWillMount() {
    this.node = document.createElement('div');
    CSSPropertyOperations.setValueForStyles(this.node, this.props.style);
    document.body.appendChild(this.node);
    this.renderPortal();
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps);
  }

  shouldComponentUpdate(nextProps) {
    return !shallowEquals(this.props, nextProps);
  }

  componentWillUnmount() {
    this.closePortal();
  }

  closePortal() {
    if (this.node) {
      unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.node = null;
  }

  renderPortal() {
    const { children, ...other } = this.props;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, (
      <div {...other}>
        {children}
      </div>
    ), this.node);
  }

  render() {
    return null;
  }
}
