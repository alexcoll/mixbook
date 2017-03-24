import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Text, Thumbnail } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import { actions } from 'react-native-navigation-redux-helpers';

import styles from './styles';

const camera = require('../../../img/camera.png');

import store from 'react-native-simple-store';

const {
  replaceAt,
} = actions;

class Account extends Component {

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
      inputUsername: '',
      inputFirstName: '',
      inputLastName: '',
      inputEmail: '',
      inputOldPassword: '',
      inputNewPassword1: '',
      inputNewpassword2: ''
    };
  }


  replaceAt(route) {
    this.props.replaceAt('account', { key: route }, this.props.navigation.key);
  }


  componentDidMount() {
    store.get('account')
    .then((data) => {
      this.setState({
        inputUsername: data.userInfo.username,
        inputFirstName: data.userInfo.firstName,
        inputLastName: data.userInfo.lastName,
        inputEmail: data.userInfo.email
      });
    })
    .catch((error) => {
      console.warn("error getting settings from local store");
    });
  }


  onLogout() {
    store.update('account', {
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

  }

  onSubmit() {
    store.get('account')
    .then((data) => {
      var wasAnythingChanged = false;

      if (this.state.inputEmail !== data.userInfo.email) {
        console.log("email has been changed, updating...");
        this.updateEmail(data.token, this.state.inputEmail);
        wasAnythingChanged = true;
      }

      if ((this.state.inputFirstName !== data.userInfo.firstName) || (this.state.inputLastName !== data.userInfo.lastName)) {
        console.log("first or last name has been changed, updating...");
        this.updateNames(data.token, this.state.inputFirstName, this.state.inputLastName);
        wasAnythingChanged = true;
      }

      if (wasAnythingChanged) {
        ToastAndroid.show("Profile updated", ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Nothing changed", ToastAndroid.SHORT);
      }
    }).catch((error) => {
      console.warn("error getting account data from local store");
    });
  }

  updateNames(token: string, firstName: string, lastName: string) {
    fetch('https://activitize.net/mixbook/user/editUser', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        var json = await response.json();
        if (json.responseStatus === "OK") {
          store.get('account')
          .then((data) => {
            data.userInfo.firstName = firstName;
            data.userInfo.lastName = lastName;
            store.save('account', data)
            .catch((error) => {
              console.warn("error storing account data into local store");
              console.warn(error);
            })
          }).catch((error) => {
            console.warn("error getting account data from local store");
            console.warn(error);
          });
        } else {
          Alert("something went wrong");
        }
      } else if (response.status === 400) {
        var json = await response.json();
        Alert.alert(
          "Error Updating Names",
          json.errorMessage,
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      } else {
        console.warn(response.status + response.message);
        return;
      }
    }).catch((error) => {
      console.error(error);
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  updateEmail(token: string, newEmail: string) {
    fetch('https://activitize.net/mixbook/user/changeEmail', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        var json = await response.json();
        if (json.responseStatus === "OK") {
          store.get('account')
          .then((data) => {
            data.userInfo.email = newEmail;
            store.save('account', data)
            .then(() => {
              // ToastAndroid.show("Profile updated", ToastAndroid.SHORT);
            })
            .catch((error) => {
              console.warn("error storing account data into local store");
              console.warn(error);
            })
          }).catch((error) => {
            console.warn("error getting account data from local store");
            console.warn(error);
          });
        } else {
          Alert("something went wrong");
        }
      } else if (response.status === 400) {
        var json = await response.json();
        Alert.alert(
          "Error Updating Email",
          json.errorMessage,
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      } else {
        Alert(response.status + response.message);
        return;
      }
    }).catch((error) => {
      console.error(error);
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Account</Title>
        </Header>

        <Content>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  disabled
                  inlineLabel label="Username"
                  placeholder="user"
                  value={this.state.inputUsername}
                  onChangeText={(inputUsername) => this.setState({ inputUsername })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="First Name"
                  placeholder="John"
                  value={this.state.inputFirstName}
                  onChangeText={(inputFirstName) => this.setState({ inputFirstName })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Last Name"
                  placeholder="Doe"
                  value={this.state.inputLastName}
                  onChangeText={(inputLastName) => this.setState({ inputLastName })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <Text>Change Password</Text>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={styles.icons} />
                <Input
                  secureTextEntry
                  placeholder="Old password"
                  value={this.state.inputOldPassword}
                  onChangeText={(inputOldPassword) => this.setState({ inputOldPassword })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={styles.icons} />
                <Input
                  secureTextEntry
                  placeholder="New password"
                  value={this.state.inputNewPassword1}
                  onChangeText={(inputNewPassword1) => this.setState({ inputNewPassword1 })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon name="ios-unlock" style={styles.icons} />
                <Input
                  secureTextEntry
                  placeholder="New password again"
                  value={this.state.inputNewPassword2}
                  onChangeText={(inputNewPassword2) => this.setState({ inputNewPassword2 })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <View>
                <Button
                  block
                  style={styles.saveButton}
                  onPress={() => this.onSubmit()}
                >
                  Save
                </Button>
                <Button
                  block
                  danger
                  style={styles.logoutButton}
                >
                  Logout
                </Button>
              </View>
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

export default connect(mapStateToProps, bindAction)(Account);
