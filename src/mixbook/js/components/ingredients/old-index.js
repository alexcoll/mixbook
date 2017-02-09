
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Tabs, Fab } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import TabAlcohol from './tabAlcohol';
import TabMixers from './tabMixer';

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
    this.state = {
      active: false
    };
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
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Recipes</Title>

          <Button transparent>
            <Icon name="md-search"/>
          </Button>
        </Header>
        <Content>
          <Tabs>
            <TabAlcohol tabLabel='Alcohol' />
            <TabMixers tabLabel='Mixers' />
          </Tabs>
        </Content>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ marginLeft: 10 }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="md-add" />
          <Button
            onPress={() => this.replaceAt('addAlcohol')}
          >
            <MaterialIcons name="local-bar" size={25} color="white" />

          </Button>
          <Button
            onPress={() => this.replaceAt('addMixer')}
          >
            <MaterialIcons name="local-drink" size={25} color="white" />
          </Button>
        </Fab>
      </Container>

    );
  }
}


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
