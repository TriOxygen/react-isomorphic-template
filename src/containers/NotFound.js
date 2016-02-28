import React, { Component, PropTypes } from 'react';
import { addMessages, translate as _l } from 'lib/I18n';
import { Layout, Toolbar, RaisedButton } from 'oxygen-md';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';
import { Units, Typography } from 'oxygen-md/Styles';

addMessages({
  ['en-US']: {
    'Not found': 'Not found',
  },
});

const css = oxygenCss({
  root: {
    textAlign: 'center',
    padding: Units.phone.gutter.more * 4,
    fontSize: Typography.phone.display1.fontSize,
    fontWeight: Typography.phone.display1.fontWeight,
  }
});

class NotFound extends Component {
  render() {
    return (
      <Layout >
        <Toolbar primary leftIcon={<ActionAccountCircle block/>} rightIcon={<ActionAccountCircle block/>}>
          Theme
        </Toolbar>
        <div className={css.root}>
          {_l`Not found`}
        </div>
      </Layout>
    );
  }
}
export default NotFound;
