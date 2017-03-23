
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import styles from './styles';

import store from 'react-native-simple-store';
import CheckBox from 'react-native-checkbox';

const uncheckedDisabled = require('../../../img/UI/cb_unchecked_disabled.png');

class Settings extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      inputKeepLoggedIn: true,
      isGuest: false,
    };
    this.getSettings();
  }

  //componentWillReceiveProps() {
    //console.warn("willProps");
    //this.getSettings();
  //}

  componentWillMount() {
    console.log("willMount");
    this.getSettings();
  }

  componentDidMount() {
    //console.warn("didMount");
  }

  getSettings() {
    store.get('account')
    .then((data) => {
      this.setState({
        isGuest: data.isGuest
      });
    })
    .catch((error) => {
      console.warn("error getting account guest data from local store");
    });

    store.get('settings')
    .then((data) => {
      console.log("keep=" + data.keepLoggedIn);
      this.setState({
        inputKeepLoggedIn: data.keepLoggedIn
      });
    })
    .catch((error) => {
      console.warn("error getting settings from local store");
    });
  }


  setKeepLoggedIn(checked) {
    console.log("check=" + checked);
    console.log("bstate=" + this.state.inputKeepLoggedIn);
    store.save("settings", {
      keepLoggedIn: !checked
    })
    .then(() => {
      this.setState({
        inputKeepLoggedIn: !checked,
      });
      console.log("astate=" + this.state.inputKeepLoggedIn);
    })
    .catch((error) => {
      console.warn("error storing settings into local store");
    });

  }

  isGuest() {
    return store.get('account')
    .then((data) => {
      console.log("isGuest=" + data.isGuest);
      return data.isGuest;
    })
    .catch((error) => {
      console.warn("error getting isLoggedIn setting from local store");
    });
  }


   checkboxKeepLoggedIn() {
    if (!this.state.isGuest) {
      return (
        <ListItem
          button
          onPress={() => this.toggleKeepLoggedIn()}
        >
          <CheckBox
            label='Stay logged in'
            checked={this.state.inputKeepLoggedIn}
            onChange={(checked) => this.setKeepLoggedIn(checked)}
            labelStyle={styles.checkboxText}
          />
        </ListItem>
      );
    } else {
      return (
        <ListItem>
          <CheckBox
            label='Stay logged in'
            checked={false}
            labelStyle={styles.checkboxTextDisabled}
            uncheckedImage={uncheckedDisabled}
          />
        </ListItem>
      );
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Settings</Title>
        </Header>

        <Content>
          <List>
            {this.checkboxKeepLoggedIn()}
          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Settings);
