
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

import TabFeatured from './tabFeatured';
import TabNew from './tabNew';
import TabPopular from './tabPopular';
import TabAlcohol from './addRecipe';


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

class Recipes extends Component {

  constructor(props) {
    super(props);
    this.state = {selectedTab:'New'};
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }


  replaceAt(route) {
    this.props.replaceAt('recipes', { key: route }, this.props.navigation.key);
  }


  render() {
    return (
      <View style={tstyles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Recipes</Title>

          <Button transparent>
            <Icon name="md-search"/>
          </Button>
        </Header>
          <ScrollableTabView>
            <TabNew tabLabel="New" />
            <TabFeatured tabLabel="Featured" />
            <TabPopular tabLabel="Popular" />            
          </ScrollableTabView>

          <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item
              buttonColor='#3498db'
              title="Add Recipe"
              onPress={() => this.replaceAt('addRecipe')}
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

export default connect(mapStateToProps, bindAction)(Recipes);
