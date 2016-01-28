import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { Units } from './Styles';

const styles = oxygenStyle({
  root: {
    display: 'inline-block',
    lineHeight: `${Units.phone.gutter.mini * 2 + Units.phone.button.height}px`,
    '@desktop': {
      lineHeight: `${Units.desktop.gutter.mini * 2 + Units.desktop.button.height}px`,
    }
    // padding: `${Units.gutter.mini}px 0`,
  },
  fullWidth: {
    display: 'block'
  },
});

class ButtonContainer extends Component {

  static displayName = 'ButtonContainer';

  static propTypes = {
    fullWidth: PropTypes.bool,
    children: PropTypes.node,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    fullWidth: true
  };

  render() {
    const { children, fullWidth } = this.props;
    const rootClasses = classNames(styles.root, {
      [styles.fullWidth]: fullWidth,
    });
    return (
      <div className={rootClasses}>
        {children}
      </div>
    );
  }
}

export default ButtonContainer;
