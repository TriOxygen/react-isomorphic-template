import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Units, Colors, Typography } from 'oxygen-md/Styles';

const sectionStyles = oxygenStyle({
  root: {
    padding: Units.desktop.gutter.more * 2
  },
  center: {
    width: Units.desktop.keylineIncrement * 15,
    fontSize: Typography.phone.body1.fontSize,
    fontWeight: Typography.phone.body1.fontWeight,
    margin: 'auto',
    lineHeight: '150%',
  },
  header: {
    textAlign: 'center',
    fontSize: Typography.phone.display1.fontSize,
    fontWeight: Typography.phone.display1.fontWeight,
  }
});

const light = 'rgba(255, 255, 255, 0.8)';
const dark = 'rgba(0, 0, 0, 0.8)';

const colorSchemes = [
  {
    backgroundColor: '#111111',
    text: light,
  },
  {
    backgroundColor: '#222222',
    text: light,
  },
  {
    backgroundColor: '#333333',
    text: light,
  },
  {
    backgroundColor: '#444444',
    text: light,
  },
  {
    backgroundColor: '#555555',
    text: light,
  },
  {
    backgroundColor: '#666666',
    text: light,
  },
  {
    backgroundColor: '#777777',
    text: dark,
  },
  {
    backgroundColor: '#888888',
    text: dark,
  },
  {
    backgroundColor: '#999999',
    text: dark,
  },
  {
    backgroundColor: '#aaaaaa',
    text: dark,
  },
  {
    backgroundColor: '#bbbbbb',
    text: dark,
  },
  {
    backgroundColor: '#cccccc',
    text: dark,
  },
  {
    backgroundColor: '#dddddd',
    text: dark,
  },
  {
    backgroundColor: '#eeeeee',
    text: dark,
  },
  {
    backgroundColor: '#f7f7f7',
    text: dark,
  },
];

class Section extends Component {
  static displayName =  'Section';

  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    colorScheme: PropTypes.number,
    header: PropTypes.node,
  };

  static defaultProps = {
    colorScheme: 5
  };

  getStyle() {
    const { style, colorScheme } = this.props;
    const color = colorSchemes[colorScheme];
    return Object.assign({}, {
      backgroundColor: color.backgroundColor,
      color: color.text
    }, style);
  }

  render() {
    const { children, header } = this.props;
    const style = this.getStyle();
    let headerEl;
    if (header) {
      if (typeof header === 'string') {
        headerEl = <h1 className={sectionStyles.header}>{header}</h1>;
      } else {
        headerEl = header;
      }
    }
    return (
      <div className={sectionStyles.root} style={this.getStyle()}>
        <div className={sectionStyles.center}>
          {headerEl}
          {children}
        </div>
      </div>
    );
  }
}

export default Section;
