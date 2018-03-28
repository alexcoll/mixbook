import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import * as GLOBAL from '../../globals';

import navigateTo from '../../actions/sideBarNav';
import sidebarTheme from './sidebar-theme';
import styles from './style';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const drawerCover = require('../../../img/drawer-cover.png');
const drawerImage = require('../../../img/pic-harryshop.png');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={drawerCover} style={styles.drawerCover}>
        </Image>
        <List>
          <ListItem button iconLeft onPress={() => this.navigateTo('mydrinks')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="local-bar" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>My Drinks</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('ingredients')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="local-grocery-store" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>Ingredients</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('recipes')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="public" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>Recipes</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('myRecipes')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="public" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>My Recipes</Text>
            </View>
          </ListItem>
          <ListItem button iconLeft onPress={() => this.navigateTo('viewAllUsers')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="public" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>View All Users</Text>
            </View>
          </ListItem>
          {/*<ListItem button iconLeft onPress={() => this.navigateTo('settings')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="settings" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>Settings</Text>
            </View>
          </ListItem>*/}
          <ListItem button iconLeft onPress={() => this.navigateTo('account')} >
            <View style={styles.listItemContainer}>
              <View style={[styles.iconContainer, {}]}>
                <MaterialIcons name="account-circle" size={25} color="#4F8EF7" />
              </View>
              <Text style={styles.text}>Account</Text>
            </View>
          </ListItem>
        </List>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
