
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Settings</Title>
        </Header>

        <View>
          <Text>
            No settings!
          </Text>
        </View>
      </View>
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
