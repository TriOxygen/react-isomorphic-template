import React, { PropTypes } from 'react';
import TodosView from 'components/TodosView';
import TodosForm from 'components/TodosForm';
import { bindActionCreators } from 'redux';
import * as TodoActions from 'reducers/TodoReducer';
import { connect } from 'react-redux';
import classNames from 'classnames';
// import theme from '../style/theme';
import { Units, Shadow } from 'oxygen-md/Styles';

import { Toolbar, Menu, MenuDivider, MenuItem, List, ListDivider, ListItem, RaisedButton, FlatButton, FloatingActionButton, ButtonContainer, Styles } from 'oxygen-md';
const { Colors , Theme } = Styles;
const { material } = Colors;

const theme = new Theme(material.red, material.amber, material.grey, 'light');

import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import ActionAccessibility from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccessibility';
import ActionAccountBalance from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalance';
import ActionAccountBalanceWallet from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalanceWallet';
import ActionAccountBox from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBox';
import ActionAccountCircle from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountCircle';


const css = oxygenStyle({
  root: {
    padding: Units.phone.gutter.mini,
  }
});



class Home extends React.Component {
  static propTypes = {
    todos: PropTypes.any.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  // static needs = [
  //   TodoActions.getTodos
  // ];

  static childContextTypes = {
    theme: PropTypes.object
  };

  getChildContext() {
    return {
      theme: theme
    };
  }


  render() {
    const { todos, dispatch } = this.props;

    // if (process.env !== 'production' && process.env.browser) {
    //   const styleSheet = document.getElementById('stylesheet');
    //   const prefixedCSS = StyleSheet.render();
    //   styleSheet.textContent = prefixedCSS;
    // }

    return (
      <div className={classNames(css.root)}>
        <ActionAccountCircle />
       <Toolbar primary>Test</Toolbar>
       <ButtonContainer>
         <RaisedButton label="Boring"/>
         <RaisedButton primary label="Primary"/>
         <RaisedButton secondary label="Secondary"/>
       </ButtonContainer>
       <ButtonContainer>
         <RaisedButton disabled label="Boring disabled"/>
         <RaisedButton disabled primary label="Primary disabled"/>
         <RaisedButton disabled secondary label="Secondary disabled"/>
       </ButtonContainer>
       <ButtonContainer>
         <RaisedButton dense label="Dense Boring"/>
         <RaisedButton dense primary label="Dense Primary"/>
         <RaisedButton dense secondary label="Dense Secondary"/>
       </ButtonContainer>

       <ButtonContainer>
         <FlatButton label="Boring"/>
         <FlatButton primary label="Primary"/>
         <FlatButton secondary label="Secondary"/>
       </ButtonContainer>
       <ButtonContainer>
         <FlatButton disabled label="Boring disabled"/>
         <FlatButton disabled primary label="Primary disabled"/>
         <FlatButton disabled secondary label="Secondary disabled"/>
       </ButtonContainer>
       <ButtonContainer>
         <FlatButton dense label="Dense Boring"/>
         <FlatButton dense primary label="Dense Primary"/>
         <FlatButton dense secondary label="Dense Secondary"/>
       </ButtonContainer>
       <ButtonContainer>
         <FloatingActionButton primary={false} icon={<ContentClear />} />
         <FloatingActionButton primary icon={<ContentClear />} />
         <FloatingActionButton primary={false} secondary icon={<ContentClear />} />
       </ButtonContainer>
       <ButtonContainer>
         <FloatingActionButton mini primary={false} icon={<ContentClear />} />
         <FloatingActionButton mini primary icon={<ContentClear />} />
         <FloatingActionButton mini primary={false} secondary icon={<ContentClear />} />
       </ButtonContainer>
       <ButtonContainer>
         <FloatingActionButton disabled>A</FloatingActionButton>
         <FloatingActionButton disabled primary>A</FloatingActionButton>
         <FloatingActionButton disabled secondary>A</FloatingActionButton>
       </ButtonContainer>
       <List>
         <ListItem dense icon={<ContentClear/>}>Test</ListItem>
         <ListItem dense icon={<ActionAccessibility/>}>Test</ListItem>
         <ListDivider />
         <ListItem dense icon={<ActionAccountBalance/>}>Test</ListItem>
         <ListItem dense icon={<ActionAccountBalanceWallet/>}>Test</ListItem>
         <ListDivider />
         <ListItem dense icon={<ActionAccountBox/>}>Test</ListItem>
         <ListItem dense icon={<ActionAccountCircle/>}>Test</ListItem>
       </List>
       <Menu>
         <MenuItem icon={<ContentClear/>} dense>Test</MenuItem>
         <MenuItem active icon={<ActionAccessibility/>} dense>Test</MenuItem>
         <MenuDivider />
         <MenuItem icon={<ActionAccountBalance/>} dense>Test</MenuItem>
         <MenuItem icon={<ActionAccountBalanceWallet/>} dense>Test</MenuItem>
         <MenuDivider />
         <MenuItem icon={<ActionAccountBox/>} dense>Test</MenuItem>
         <MenuItem icon={<ActionAccountCircle/>} dense>Test</MenuItem>
       </Menu>
      </div>
    );
  }
}

export default connect(state => ({ todos: state.todos }))(Home)