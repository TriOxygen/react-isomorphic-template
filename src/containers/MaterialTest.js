import React, { Component } from 'react';

import { Checkbox, IconButton, Toggle, TextField, Menu, MenuDivider, MenuItem, List, ListDivider, ListItem, RaisedButton, FlatButton, FloatingActionButton, ButtonContainer, Styles } from 'oxygen-md';

import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import ActionAccessibility from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccessibility';
import ActionAccountBalance from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalance';
import ActionAccountBalanceWallet from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalanceWallet';
import ActionAccountBox from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBox';

const styles = oxygenStyle({
  root: {
  }
});

class MaterialTest extends Component {
  static displayName = 'MaterialTest';

  render() {
    return (
      <div className={styles.root}>
        <Toggle />
        <Toggle primary checked disabled/>
        <Toggle secondary/>
        <Toggle disabled/>
        <Toggle disabled checked/>

        <Checkbox />
        <Checkbox primary checked/>
        <Checkbox secondary/>
        <Checkbox disabled/>
        <Checkbox disabled checked/>

        <ActionAccountBox hoverColor='red'/>
        <br />
        <IconButton><ContentClear /></IconButton>
        <IconButton primary><ActionAccessibility /></IconButton>
        <IconButton secondary><ActionAccountBox /></IconButton>
        <IconButton disabled><ActionAccountBalanceWallet /></IconButton>

        <p style={{ color: '#123981' }}>
          <IconButton><ContentClear /></IconButton>
        </p>
        <IconButton primary/>
        <IconButton secondary/>
        <IconButton disabled/>
        <TextField floatingLabelText='User' placeholder='ozgur.gene@gmail.com'/>
        <TextField floatingLabelText='Password' placeholder='zakhooi'/>
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
          <ListItem active dense icon={<ActionAccountBalance/>}>Test</ListItem>
          <ListItem dense icon={<ActionAccountBalanceWallet/>}>Test</ListItem>
          <ListDivider />
          <ListItem dense icon={<ActionAccountBox/>}>Test</ListItem>
          <ListItem dense icon={<ActionAccountBox/>}>Test</ListItem>
        </List>
        <Menu>
          <MenuItem icon={<ContentClear/>} dense>Test</MenuItem>
          <MenuItem active icon={<ActionAccessibility/>} dense>Test</MenuItem>
          <MenuDivider />
          <MenuItem icon={<ActionAccountBalance/>} dense>Test</MenuItem>
          <MenuItem icon={<ActionAccountBalanceWallet/>} dense>Test</MenuItem>
          <MenuDivider />
          <MenuItem icon={<ActionAccountBox/>} dense>Test</MenuItem>
          <MenuItem icon={<ActionAccountBox/>} dense>Test</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MaterialTest;