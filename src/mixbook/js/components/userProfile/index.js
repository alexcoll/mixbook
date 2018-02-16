import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { actions } from 'react-native-navigation-redux-helpers';

import * as GLOBAL from '../../globals';

import styles from './styles';

const camera = require('../../../img/camera.png');

import store from 'react-native-simple-store';

const {
  replaceAt,
} = actions;

class UserProfile extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }


  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isGuest: true,
      inputUsername: ''
    };
  }


  replaceAt(route) {
    this.props.replaceAt('account', { key: route }, this.props.navigation.key);
  }


  componentDidMount() {
    store.get('account')
    .then((data) => {
      this.setState({
        isGuest: data.isGuest,
        token: data.token,
        inputUsername: data.userInfo.username,
        inputFirstName: data.userInfo.firstName,
        inputLastName: data.userInfo.lastName,
        inputEmail: data.userInfo.email,
      });
    })
    .catch((error) => {
      console.warn("error getting settings from local store");
    });
  }


  onLogout() {
    store.save('account', {
      isLoggedIn: false,
      isGuest: false,
      token: "",
      userInfo: {
        username: "",
        email: "",
        firstName: "",
        lastName: ""
      }
    })
    .then(() => {
      this.replaceAt('login');
      ToastAndroid.show("Logged out", ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.warn("error clearing account data from local store");
    });

    store.save('inventory', []);
  }

  onSubmit() {
    
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>My Profile</Title>
        </Header>

        <Content>
          <List>
            <ListItem>
              <InputGroup disabled={this.state.isGuest}>
                <Input
                  disabled
                  inlineLabel label="Username"
                  placeholder="user"
                  value={this.state.inputUsername}
                  onChangeText={(inputUsername) => this.setState({ inputUsername })}
                />
              </InputGroup>
            </ListItem>

          </List>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(UserProfile);
