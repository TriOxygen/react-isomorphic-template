import React, { Component } from 'react';

import { Radio, RadioGroup, Checkbox, IconButton, Toggle, TextField, Menu, MenuDivider, MenuItem, List, ListDivider, ListItem, RaisedButton, FlatButton, FloatingActionButton, ButtonContainer, Styles } from 'oxygen-md';

import ContentClear from 'oxygen-md-svg-icons/lib/SvgIcons/ContentClear';
import ActionAccessibility from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccessibility';
import ActionAccountBalance from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalance';
import ActionAccountBalanceWallet from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBalanceWallet';
import ActionAccountBox from 'oxygen-md-svg-icons/lib/SvgIcons/ActionAccountBox';
import Hammer from 'components/Hammer';

const styles = oxygenCss({
  root: {
  }
});

class MaterialTest extends Component {

  say = (what) => {
    console.log('Say', what);
  };

  render() {
    return (
      <div className={styles.root}>

        <Hammer
          onTap={this.say.bind(this, 'tap')}
          onPress={this.say.bind(this, 'press')}
          onSwipe={this.say.bind(this, 'swipe')}
        >
          <div style={{ padding: 10, backgroundColor: '#777'}}>Do Stuff with me</div>
        </Hammer>
        <div style={{ width: 240 }}>
          <RadioGroup value={1}>
            <Radio fullWidth label={'1'} value={1} disabled/>
            <Radio fullWidth label={'2'} value={2} primary />
            <Radio fullWidth label={'3'} value={3} secondary/>
            <Radio fullWidth label={'4'} value={4} />
            <Radio fullWidth label={'5'} value={5} />
          </RadioGroup>
        </div>
        <Toggle label={'1'}/>
        <Toggle label={'1'} primary checked disabled/>
        <Toggle left label={'1'} secondary/>
        <Toggle label={'1'} disabled/>
        <Toggle label={'1'} disabled checked/>


        <Checkbox label={'Test'} />
        <Checkbox label={'Test'} primary checked disabled/>
        <Checkbox label={'Test'} secondary/>
        <Checkbox label={'Test'} disabled/>
        <Checkbox label={'Test'} disabled checked/>

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