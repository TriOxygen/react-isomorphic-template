import React, {Component, PropTypes} from 'react';

const styles = {
  fixed: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    header: {
      flexGrow: 0,
      zIndex: 2,
    },
    content: {
      flexGrow: 1,
      overflow: 'auto',
      zIndex: 1
    },
  },
  default: {
    root: {

    },
    content: {

    },
    header: {

    }
  }
};

class Layout extends Component {
  static displayName = 'Layout';

  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    fixedHeader: PropTypes.bool,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {
    fixedHeader: true
  };

  render() {
    const { children, fixedHeader } = this.props;
    const [header, ...otherChildren] = children;
    let headerEl;
    const style = fixedHeader ? styles.fixed : styles.default;
    if (header) {
      headerEl = <div style={style.header}>{header}</div>;
    }
    return (
      <div style={style.root}>
        {headerEl}
        <div style={style.content}>
          {otherChildren}
        </div>
      </div>
    );
  }
}

export default Layout;
