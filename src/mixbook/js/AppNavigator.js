
import React, { Component } from 'react';
import { BackAndroid, StatusBar, NavigationExperimental } from 'react-native';
import { connect } from 'react-redux';
import { Drawer } from 'native-base';
import { actions } from 'react-native-navigation-redux-helpers';

import { closeDrawer } from './actions/drawer';

import Home from './components/home/';
import Recipes from './components/recipes/';
import MyDrinks from './components/mydrinks/';
import Ingredients from './components/ingredients/';
import AddIngredient from './components/addIngredient/';
import AddRecipe from './components/recipes/addRecipe';
import Account from './components/account/';
import Login from './components/login/';
import Settings from './components/settings/';
import SplashPage from './components/splashscreen/';
import SideBar from './components/sidebar';
import statusBarColor from './themes/base-theme';
import NewAccount from './components/newAccount';
import Review from './components/review/'

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class AppNavigator extends Component {

  static propTypes = {
    drawerState: React.PropTypes.string,
    popRoute: React.PropTypes.func,
    closeDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  }


  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const routes = this.props.navigation.routes;

      if (routes[routes.length - 1].key === 'home') {
        return false;
      }

      this.props.popRoute(this.props.navigation.key);
      return true;
    });
  }


  componentDidUpdate() {
    if (this.props.drawerState === 'opened') {
      this.openDrawer();
    }

    if (this.props.drawerState === 'closed') {
      this._drawer.close();
    }
  }


  popRoute() {
    this.props.popRoute();
  }


  openDrawer() {
    this._drawer.open();
  }


  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }


  _renderScene(props) { // eslint-disable-line class-methods-use-this
    switch (props.scene.route.key) {
      case 'splashscreen':
        return <SplashPage />;
      case 'login':
        return <Login />;
      case 'mydrinks':
        return <MyDrinks />;
      case 'ingredients':
        return <Ingredients />;
      case 'recipes':
        return <Recipes />;
      case 'settings':
        return <Settings />;
      case 'account':
        return <Account />;
      case 'addIngredient':
        return <AddIngredient />;
      case 'addRecipe':
        return <AddRecipe />;
      case 'review':
        return <Review />;
      case 'newAccount':
        return <NewAccount />;
      default:
        return <MyDrinks />;
    }
  }


  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        type="overlay"
        tweenDuration={150}
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        styles={{
          drawer: {
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 3,
          },
        }}
        tweenHandler={(ratio) => {  // eslint-disable-line
          return {
            drawer: { shadowRadius: ratio < 0.2 ? ratio * 5 * 5 : 5 },
            main: {
              opacity: (2 - ratio) / 2,
            },
          };
        }}
        negotiatePan
      >
        <StatusBar
          backgroundColor={statusBarColor.statusBarColor}
          barStyle="default"
        />
        <NavigationCardStack
          navigationState={this.props.navigation}
          renderOverlay={this._renderOverlay}
          renderScene={this._renderScene}
        />
      </Drawer>
    );
  }
}

const bindAction = dispatch => ({
  closeDrawer: () => dispatch(closeDrawer()),
  popRoute: key => dispatch(popRoute(key)),
});

const mapStateToProps = state => ({
  drawerState: state.drawer.drawerState,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
