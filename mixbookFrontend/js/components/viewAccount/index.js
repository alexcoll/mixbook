import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Text, Thumbnail } from 'native-base';

import ToolTip from 'react-native-tooltip';
import { openDrawer } from '../../actions/drawer';
import { actions } from 'react-native-navigation-redux-helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as GLOBAL from '../../globals';

import styles from './styles';

import logError from '../../actions/logger';

const camera = require('../../../img/camera.png');

import store from 'react-native-simple-store';

const {
  replaceAt,
} = actions;

class ViewAccount extends Component {

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
      inputUsername: '',
      inputFirstName: '',
      inputLastName: '',
      inputEmail: '',
      badges: [],
      ratings: 0,
      recipes: 0,
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
        inputEmail: data.userInfo.email,
        badges: data.userInfo.badges,
        ratings: data.userInfo.numOfRatings,
        recipes: data.userInfo.numOfRecipes,
      });

    })
    .catch((error) => {
      logError('error getting settings from local store:\n' + error, 2);
    });
  }


  getProfRating(sumOfRatings: number, numberOfRatings: number) {
    var result = 0;

    if (numberOfRatings > 0) {
      result = sumOfRatings / numberOfRatings;
    }

    return result;
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>{global.viewUsername}'s Profile</Title>
        </Header>

        <Content>
        <Text style={styles.rating}> Profile Rating: {this.getProfRating(global.viewSumRecipeRatings, global.viewNumRecipeRatings)}</Text>
          <List>
            <ListItem>
              <InputGroup disabled={this.state.isGuest}>
                <Input
                  disabled
                  inlineLabel label="Username"
                  placeholder="user"
                  value={global.viewUsername}

                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup disabled={this.state.isGuest}>
                <Input
                disabled
                  inlineLabel label="First Name"
                  placeholder="John"
                  value={global.viewFirstName}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup disabled={this.state.isGuest}>
                <Input
                disabled
                  inlineLabel label="Last Name"
                  placeholder="Doe"
                  value={global.viewLastName}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup disabled={this.state.isGuest}>
                <Input
                disabled
                  inlineLabel label="Email"
                  placeholder="name@example.com"
                  value={global.viewEmail}
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

export default connect(mapStateToProps, bindAction)(ViewAccount);
