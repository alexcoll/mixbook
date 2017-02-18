import React, { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
    store.get('account').then((data) => {
      this.setState({
        inputFirstName: data.userInfo.firstName,
        inputLastName: data.userInfo.lastName,
        inputEmail: data.userInfo.email,
      });
    }).catch((error) => {
      console.warn("error getting settings from local store");
    });
  }


  onLogout() {
    store.update('account', {
      isLoggedIn: false,
      isGuest: false
    }).catch((error) => {
      console.warn("error storing settings into local store");
    });
    this.replaceAt('login')
  }

  onSubmit() {

    return;
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
          <TouchableOpacity>
            <Thumbnail
              size={80}
              source={camera}
              style={styles.thumbnails}
            />
          </TouchableOpacity>
          <List>
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
              <InputGroup>
                <Input
                  inlineLabel label="Email"
                  placeholder="name@example.com"
                  value={this.state.inputEmail}
                  onChangeText={(inputEmail) => this.setState({ inputEmail })}
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
                  onPress={() => this.onLogout()}
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
