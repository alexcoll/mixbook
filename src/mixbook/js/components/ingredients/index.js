
import React, { Component } from 'react';
import { StyleSheet, View, AppRegistry, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Header, Title, Content, Text, Button, Icon } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import ScrollableTabView from 'react-native-scrollable-tab-view'

import TabAlcohol from './tabAlcohol';
import TabMixers from './tabMixer';
import TabBrands from './tabBrands';


const abstyles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

const {
  replaceAt,
} = actions;

class Ingredients extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab:'Alcohol'};
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }


  replaceAt(route) {
    this.props.replaceAt('ingredients', { key: route }, this.props.navigation.key);
  }


  render() {
    return (
      <View style={tstyles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Ingredients</Title>
        </Header>
          <ScrollableTabView>
            <TabAlcohol tabLabel="Alcohol" />
            <TabMixers tabLabel="Mixers" />
            <TabBrands tabLabel="Brands" />
          </ScrollableTabView>

          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor='#9b59b6'
              title="Add Alcohol"
              onPress={() => this.replaceAt('addAlcohol')}
            >
              <MaterialIcons name="local-bar" size={25} color="white" style={styles.actionButtonIcon}/>
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor='#3498db'
              title="Add Mixer"
              onPress={() => this.replaceAt('addMixer')}
            >
              <MaterialIcons name="local-drink" size={25} color="white" style={styles.actionButtonIcon}/>
            </ActionButton.Item>
          </ActionButton>
      </View>

    );
  }
}

const tstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Ingredients);
