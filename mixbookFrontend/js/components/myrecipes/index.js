import React, { Component } from 'react';
import { ToastAndroid, TextInput, Alert, View, StyleSheet, ListView, Text, TouchableHighlight, RefreshControl} from 'react-native';
import { connect } from 'react-redux';

import * as GLOBAL from '../../globals';

// import { actions } from 'react-native-navigation-redux-helpers';
import { Header, Title, Content, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav'
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import logError from '../../actions/logger';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import ModalDropdown from 'react-native-modal-dropdown';

var filter = require('lodash/filter');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
class MyRecipes extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isGuest: true,
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      pagedDataSource: ds.cloneWithRows([]),
      searchText: "",
      sortDirection: "",
      isLoading: false,
      empty: false,
      rawData: [],
      outOfData: false,
      page: 1,
    };
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
    this.props.navigateTo(route, 'myRecipes');
  }

  componentWillReceiveProps() {
    this.fetchData();
  }

  componentWillMount() {
    this.fetchData();
  }

  showServerErrorAlert(response) {
    Alert.alert(
      "Server Error",
      "Got response: " + response.status + ' ' + response.statusText,
      [
      {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
    logError('server error, got response:' + response.status + ' ' + response.statusText, 1);
  }

  getData() {
    store.get('recipes').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    }).catch(error => {
      logError('error getting the recipe list from the local store:\n' + error, 2);
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  fetchData() {
    store.get('account').then((data) => {
      this.setState({
        username: data.userInfo.username,
        isGuest: data.isGuest,
      });

      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/getAllRecipesCreatedByUser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        store.save("recipe", json).catch(error => {
          logError('error storing the recipe list into the local store:\n' + error, 2);
        });
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
        console.error(error);
        this.setState({
          empty: true,
          isLoading: false,
        });
      });
    }).catch((error) => {
      logError('error getting user token from local store:\n' + error, 2);
    });
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});
    this.filterOnSearchText(searchText, this.state.rawData);
  }

  filterOnSearchText(searchText, data) {
    let filteredData = this.filterItems(searchText, data);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredData),
    });
  }

  filterItems(searchText, items) {
    let text = searchText.toLowerCase();

    if(text === "")
      return items;

    return filter(items, (n) => {
      let item = n.recipeName.toLowerCase();
      return item.search(text) !== -1;
    });
  }

  getPagedData(){
    console.log("Getting paged data for page: " + this.state.page);
    var list = this.state.rawData;

    var length = this.state.page * 14;
    console.log("List length: " + list.length);
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

  _recipeSortOnSelect(idx, value) {
    let sortedData = this.sortRecipes(this.state.rawData, idx.toString());

    this.setState({
      rawData: sortedData,
      dataSource: ds.cloneWithRows(sortedData)
    });

    this.filterOnSearchText(this.state.searchText, this.state.rawData);
  }

  sortRecipes(items, idx) {
    if (idx === '0') {
      return items.sort(function (a,b) {
        if ((b.totalRating/b.numberOfRatings) < (a.totalRating/a.numberOfRatings) || b.numberOfRatings == 0) return -1;
        if ((b.totalRating/b.numberOfRatings) > (a.totalRating/a.numberOfRatings)) return 1;
        return 0;
      })
    }

    if (idx === '1') {
      return items.sort(function (a,b) {
        if ((b.totalRating/b.numberOfRatings) > (a.totalRating/a.numberOfRatings)  || a.numberOfRatings == 0) return -1;
        if ((b.totalRating/b.numberOfRatings) < (a.totalRating/a.numberOfRatings)) return 1;
        return 0;
      })
    }
  }

  onListItemRemove(item: string) {
    // Delete the ingredient from the server
    store.get('account').then((data) => {
      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/deleteRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        },
        body: JSON.stringify({
          recipeId: item.recipeId
        })
      }).then((response) => {
        if (response.status == 200) {
          ToastAndroid.show("Recipe removed", ToastAndroid.SHORT);
          this.fetchData();
          console.log("recipe list pushed successfully");
        } else {
          this.showServerErrorAlert(response);
          return;
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      logError('error getting user token from local store:\n' + error, 2);
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  _pressRow(item) {
    if (this.state.isGuest) {
      Alert.alert(
        item.recipeName,
        'What do you want to do?',
        [
          {text: 'Edit', onPress: () => this.goToEditPage(item)},
          {text: 'Cancel', style: 'cancel'},
        ],
        { cancelable: true }
      )
    } else {
      Alert.alert(
        item.recipeName,
        'What do you want to do?',
        [
          {text: 'Details', onPress: () => this.goToReviewPage(item)},
          {text: 'Edit', onPress: () => this.goToEditPage(item)},
          {text: 'Delete', onPress: () => this.onListItemRemove(item)},
        ],
        { cancelable: true }
      )
    }
  }

  goToReviewPage(item: string) {
    //this.props.navigator.push({name:'review', data:item});
    global.recipeName = item.recipeName;
    global.recipeId = item.recipeId;
    global.directions = item.directions;
    global.difficulty = item.difficulty;
    global.reviewOwner = item.user.username;

    this.navigateTo('review');
  }

  goToEditPage(item: string) {
    global.recipeName = item.recipeName;
    global.recipeId = item.recipeId;
    global.directions = item.directions;
    global.reviewOwner = item.user.username;
    global.difficulty = item.difficulty;

    this.navigateTo('editRecipe');
  }

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

  _renderFAB() {
    if (!this.state.isGuest) {
      return (
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.navigateTo('addRecipe')}
        />
      );
    }
  }


  render() { // eslint-disable-line
    return (

      <View style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>My Recipes</Title>

          <Button transparent onPress={() => this._onRefresh()}>
            <Icon name="ios-refresh" />
          </Button>
        </Header>

        <View style={{flexDirection: 'row'}}>

        <TextInput
          style={styles.searchBar}
          placeholder="Search Recipes"
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          multiline={false}
          autoFocus={false}
          returnKeyType='done'
          autoCorrect={false}
        />

        <ModalDropdown
          options={['Ranking ↑', 'Ranking ↓']}
          defaultValue='Sort'
          style={styles.dropDownStyle}
          textStyle={styles.dropDownTextStyle}
          onSelect={(idx, value) => this._recipeSortOnSelect(idx, value)}
          />

          </View>

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
          onPress={() => this.fetchMoreData()}>
            Load More
          </Button>
        {this._renderFAB()}
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

export default connect(mapStateToProps, bindAction)(MyRecipes);
