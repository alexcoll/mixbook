import React, { Component } from 'react';
import { ToastAndroid, TextInput, Alert, View, ListView, Text, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import * as GLOBAL from '../../globals';

import navigateTo from '../../actions/pageNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import logError from '../../actions/logger';

import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

var filter = require('lodash/filter');

class MyDrinks extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isGuest: false,
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      pagedDataSource: ds.cloneWithRows([]),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: [],
      page: 1,
      outOfData: false,
    };

    store.get('account')
    .then((data) => {
      this.setState({
        isGuest: data.isGuest
      });
    })
    .catch((error) => {
      logError('error getting account guest data from local store:\n' + error, 2);
    });
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'mydrinks');
  }

  componentWillMount() {
    this.getRemoteData();
  }

  getPagedData(){
    console.log("Getting paged data");
    var list = this.state.rawData;

    var length = this.state.page * 14;
    console.log("Length: " + length);

    if (list.length > length) {
      list = list.slice(0, length);
    } else {
      this.setState({
        outOfData: true,
      });
      console.log(this.state.outOfData);
    }

    console.log(list);

    this.setState({
      pagedDataSource: this.state.dataSource.cloneWithRows(list),
      page: this.state.page + 1,
    });
  }


  fetchMoreData() {
    var currPage = this.state.page;
    console.log("Getting more data for page " + this.state.page);
    this.getPagedData();
  }

  showServerErrorAlert(response) {
    Alert.alert(
      "Server Error",
      "Got response: " + response.status + " " + response.statusText,
      [
      {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
    logError("Server error, got response: " + response.status + ' ' + response.statusText, 1);
  }

  getLocalData() {
    store.get('recipes').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
      this.getPagedData();
    }).catch(error => {
      logError('error getting the recipe list from local store:\n' + error, 2);
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  getRemoteData() {
    store.get('account')
    .then((data) => {
      if (data.isGuest) {
        this.getDrinksGuest();
      } else {
        this.getDrinksAccount(data.token);
      }
    })
    .catch((error) => {
      logError('error getting user token from local store:\n' + error, 2);
    });
  }

  getDrinksAccount(token: string) {
    fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/getAllRecipesUserCanMake', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
      // store.save("recipe", json).catch(error => {
      //   console.warn("error storing the recipe list into the local store");
      // });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(json),
        isLoading: false,
        empty: false,
        rawData: json,
        page: 1,
      });
      this.getPagedData();
      return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    }).catch((error) => {
      logError('Error with request /mixbook/recipe/getAllRecipesUserCanMake\n' + error, 2);
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }


  getDrinksGuest() {
    store.get('inventory')
    .then((data) => {
      if (data.length < 1) {
        ToastAndroid.show("Inventory empty", ToastAndroid.SHORT);
        return;
      }

      // Build url parameters
      var baseURL = GLOBAL.API.BASE_URL + "/mixbook/recipe/getAllRecipesAnonymousUserCanMake?brands=";
      // Add each ingredient to the parameter
      for (i = 0; i < data.length; i++) {
        baseURL = baseURL + data.brandId + ',';
      }
      // Take off last comma from URL
      baseURL = baseURL.slice(0, -1);
      console.log("URL=" + baseURL);

      fetch(baseURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          // store.save("recipe", json).catch(error => {
          //   console.warn("error storing the recipe list into the local store");
          // });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(json),
            isLoading: false,
            empty: false,
            rawData: json,
          });
          return json;
        } else {
          this.showServerErrorAlert(response);
        }
      }).catch((error) => {
        console.error(error);
          logError('Error with request /mixbook/recipe/getAllRecipesAnonymousUserCanMake\n' + error, 2);
        this.setState({
          empty: true,
          isLoading: false,
        });
      });
    })
    .catch((error) => {
      logError('error getting ingredients from store:\n' + error, 2);
    });
  }


  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});

    let filteredData = this.filterItems(searchText, this.state.rawData);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredData),
    });
  }


  filterItems(searchText, items) {
    let text = searchText.toLowerCase();
    return filter(items, (n) => {
      let item = n.recipeName.toLowerCase();
      return item.search(text) !== -1;
    });
  }


  onListItemRemove(item: string) {
    var list = this.state.rawData;
    var index = list.indexOf(item);
    if (index > -1) {
      // list.splice(index, 1);
      // this.setState({
      //   rawData: list,
      //   dataSource: this.state.dataSource.cloneWithRows(list),
      // });

      // store.save('inventory', this.state.rawData).catch((error) => {
      //   console.warn("error storing inventory into local store");
      // });

      // Delete the ingredient from the server
      store.get('account').then((data) => {
        fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/deleteRecipe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': data.token,
          },
          body: JSON.stringify({
            brandName: item
          })
        }).then((response) => {
          if (response.status == 200) {
            ToastAndroid.show("Recipe removed", ToastAndroid.SHORT);
            this.getRemoteData();
            console.log("recipe list pushed successfully");
            return;
          } else {
            this.showServerErrorAlert(response);
            return;
          }
        }).catch((error) => {
          logError('Error with request //mixbook/recipe/deleteRecipe\n' + error, 2);
        });
      }).catch((error) => {
        logError('error getting user token from local store:\n' + error, 2);
      });

    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getRemoteData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    global.recipeName = item.recipeName;
    global.recipeId = item.recipeId;
    global.directions = item.directions;
    global.reviewOwner = item.user.username;

    this.navigateTo('review');
    // Alert.alert(
    //   "Edit " + item[1],
    //   'What do you want to do?',
    //   [
    //     {text: 'Review', onPress: () => {
    //       //this.props.navigator.push({name:'review', data:item});
    //       global.recipeName = item[1];
    //       global.recipeId = item[0];
    //       global.directions = item[2];
    //       global.reviewOwner = item[7];

    //       this.navigateTo('review');
    //       }
    //     },
    //     // {text: 'Delete', onPress: () => this.onListItemRemove(item)},
    //     {text: 'Cancel', style: 'cancel'},
    //   ],
    //   { cancelable: true }
    // )
  }

  /*_renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {rowData}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }*/

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }


  render() { // eslint-disable-line
    return (
      <View style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>My Drinks</Title>

          <Button transparent onPress={() => this._onRefresh()}>
            <Icon name="ios-refresh" />
          </Button>
        </Header>

        <TextInput
          style={styles.searchBar}
          placeholder="Search drinks"
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          multiline={false}
          autoFocus={false}
          returnKeyType='done'
          autoCorrect={false}
        />

        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.pagedDataSource}
          renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>
            <TouchableHighlight onPress={() => {
              this._pressRow(rowData);
              // highlightRow(sectionID, rowID);
            }}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    {rowData.recipeName}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          renderSeparator={this._renderSeparator}
        />
        <Button
                  disabled={this.state.outOfData}
                  block
                  style={styles.button}
                  onPress={() => this.fetchMoreData()}>Load More</Button>
      </View>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(MyDrinks);
