import React, { Component, PropTypes } from 'react';
import { Units, Typography } from 'oxygen-md/Styles';
import classNames from 'classnames';

const sectionStyles = oxygenCss({
  root: {
  },
  center: {
    padding: `${Units.desktop.gutter.more * 2}px ${Units.desktop.gutter.mini}px`,
    fontSize: Typography.phone.body1.fontSize,
    fontWeight: Typography.phone.body1.fontWeight,
    margin: 'auto',
    width: '100%',
    lineHeight: '150%',
    '@desktop': {
      width: Units.desktop.keylineIncrement * 15,
    },
  },
  header: {
    textAlign: 'center',
    fontSize: Typography.phone.display1.fontSize,
    fontWeight: Typography.phone.display1.fontWeight,
  },
  divider: {
  },
});

const light = 'rgba(255, 255, 255, 0.8)';
const dark = 'rgba(0, 0, 0, 0.8)';
const dividerHeight = Units.phone.keylineIncrement;

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
    backgroundColor: '#AAAAAA',
    text: dark,
  },
  {
    backgroundColor: '#BBBBBB',
    text: dark,
  },
  {
    backgroundColor: '#CCCCCC',
    text: dark,
  },
  {
    backgroundColor: '#DDDDDD',
    text: dark,
  },
  {
    backgroundColor: '#EEEEEE',
    text: dark,
  },
  {
    backgroundColor: '#F7F7F7',
    text: dark,
  },
];

class Divider extends React.Component {

  static propTypes = {
    start: PropTypes.string,
    end: PropTypes.string,
    reversed: PropTypes.bool
  };

  getStyle() {
    const { reversed, start, end } = this.props;
    if (reversed) {
      return Object.assign({}, {
        borderRight: `50vw solid ${start}`,
        borderTop: `${dividerHeight / 2}px solid ${start}`,
        borderLeft: `50vw solid ${end}`,
        borderBottom: `${dividerHeight / 2}px solid ${end}`,
      });
    }
    return Object.assign({}, {
      borderLeft: `50vw solid ${start}`,
      borderTop: `${dividerHeight / 2}px solid ${start}`,
      borderRight: `50vw solid ${end}`,
      borderBottom: `${dividerHeight / 2}px solid ${end}`,
    });
  }

  render() {
    return <div className={sectionStyles.divider} style={this.getStyle()}/>
  }
}

class Section extends Component {
  static propTypes = {
    style: PropTypes.object,
    children: PropTypes.node,
    startColor: PropTypes.number,
    endColor: PropTypes.number,
    header: PropTypes.node,
    divider: PropTypes.bool,
    className: PropTypes.string
  };

  static defaultProps = {
    colorScheme: 5,
    divider: true,
  };

  getStyle() {
    const { style, startColor } = this.props;
    const color = colorSchemes[startColor];
    return Object.assign({}, {
      backgroundColor: color.backgroundColor,
      color: color.text
    }, style);
  }

  render() {
    const { children, header, className, startColor, endColor, divider } = this.props;
    let headerEl;
    if (header) {
      if (typeof header === 'string') {
        headerEl = <h1 className={sectionStyles.header}>{header}</h1>;
      } else {
        headerEl = header;
      }
    }
    const classes = classNames(sectionStyles.root, className);
    let dividerEl;
    if (divider) {
      dividerEl = <Divider reversed={startColor % 2 === 0} start={colorSchemes[startColor].backgroundColor} end={colorSchemes[endColor].backgroundColor}/>;
    }
    return (
      <div className={classes} style={this.getStyle()}>
        <div className={sectionStyles.center}>
          {headerEl}
          {children}
        </div>
        {dividerEl}
      </div>
    );
  }
}

export default Section;
