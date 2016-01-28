import React, {Component, PropTypes} from 'react';
import radium from 'radium';
import { Units, Shadow} from './Styles';

const styles = {
  root: {
    boxSizing: 'border-box',
  },
};

class Paper extends Component {
  static displayName = 'Paper';

  static propTypes = {
    zDepth: PropTypes.number,
    transparent: PropTypes.bool,
    padded: PropTypes.bool,
    spaced: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    zDepth: 1,
    rounded: true,
  };

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    const { units } = theme;
    const { style, zDepth, padded, spaced, transparent, rounded } = this.props;
    return [
      styles.root, transparent ? null : {
        backgroundColor: theme.theme.card.material,
        boxShadow: Shadow[zDepth]
      },
      padded ? {
        padding: units.gutter.mini
      } : null,
      spaced ? {
        margin: units.gutter.mini
      } : null,
      rounded ? {
        borderRadius: theme.units.borderRadius,
      } : null,
      style
    ];
  }

  render() {
    const { children } = this.props;
    return (
      <div style={this.getStyle()}>
        {children}
      </div>
    );
  }
}

export default radium(Paper);
