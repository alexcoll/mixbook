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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';
import ModalDropdown from 'react-native-modal-dropdown';

var filter = require('lodash/filter');
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => true});
class ViewAllUsers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isGuest: true,
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      searchText: "",
      sortDirection: "",
      isLoading: false,
      empty: false,
      rawData: [],
      pagedDataSource: ds.cloneWithRows([]),
      page: 1,
      users: [],
      outOfData: false,
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
    this.props.navigateTo(route, 'viewAllUsers');
  }

  componentWillReceiveProps() {
    // console.warn("willProps");
    this.fetchData();
  }

  componentWillMount() {
    // console.warn("willMount");
    this.fetchData();
  }

  componentDidMount() {
    // console.warn("didMount");
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
  }

  fetchData() {
    store.get('account').then((data) => {
      this.setState({
        username: data.userInfo.username,
        isGuest: data.isGuest,
      });

      fetch(GLOBAL.API.BASE_URL + '/mixbook/user/loadAllUsers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        // Alert.alert(json[1].username);
        this.setState({dataSource: this.state.dataSource.cloneWithRows(json),
          isLoading: false,
          empty: false,
          rawData: json,
          page: 1,
        });
        // Alert.alert(users[0].username);
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
      console.warn("error getting user token from local store");
    });
  }

  getPagedData(){
    console.log("Getting paged data");
    var list = this.state.rawData;

    var length = this.state.page * 14;
    console.log("Length: " + length);

    if(list.length > length)
    {
      list = list.slice(0, length);
    }
    else
    {
      this.setState({
        outOfData: true,
      });
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

    if(this.state.sortDirection != "")
      this._userSortOnSelect(this.state.sortDirection, 0)

    else  
      this.filterOnSearchText(this.state.searchText, this.state.rawData);


    this.getPagedData();
    
  }

  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});

    let filteredData = this.filterItems(searchText, this.state.rawData);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredData),
    });

  }





  filterOnSearchText(searchText, data) {

    let filteredData = this.filterItems(searchText, data);
    
    
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(filteredData),
        rawData: filteredData,
    });


  }


  filterItems(searchText, items) {
    let text = searchText.toLowerCase();

    if(text === "")
    return items;

    return filter(items, (n) => {
      let item = n.username.toLowerCase();
      return item.search(text) !== -1;
    });
  }


  _userSortOnSelect(idx, value) {

    let sortedData = this.sortUsers(this.state.rawData, idx.toString());

    this.setState({
      rawData: sortedData,
      dataSource: ds.cloneWithRows(sortedData)
    });


    this.filterOnSearchText(this.state.searchText, this.state.rawData);


  }

  sortUsers(items, idx) {

    this.setState({
      sortDirection: idx,
    })
    if(idx === '0')
    {
      return items.sort(function (a,b) {
        if ((b.sumOfPersonalRecipeRatings/b.numberOfPersonalRecipeRatings) < (a.sumOfPersonalRecipeRatings/a.numberOfPersonalRecipeRatings) || b.sumOfPersonalRecipeRatings == 0) return -1;
        if ((b.sumOfPersonalRecipeRatings/b.numberOfPersonalRecipeRatings) > (a.sumOfPersonalRecipeRatings/a.numberOfPersonalRecipeRatings)) return 1;
        return 0;
      })
    }

    if(idx === '1') {
      return items.sort(function (a,b) {
        if ((b.sumOfPersonalRecipeRatings/b.numberOfPersonalRecipeRatings) > (a.sumOfPersonalRecipeRatings/a.numberOfPersonalRecipeRatings)  || a.sumOfPersonalRecipeRatings == 0) return -1;
        if ((b.sumOfPersonalRecipeRatings/b.numberOfPersonalRecipeRatings) < (a.sumOfPersonalRecipeRatings/a.numberOfPersonalRecipeRatings)) return 1;
        return 0;
      })
    }
  }



  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    if (this.state.isGuest || item.user.username !== this.state.username) {
      Alert.alert(
        item.username,
        'What do you want to do?',
        [
          {text: 'View Profile', onPress: () => this.visitProfile(item.username)},
        ],
        { cancelable: true }
      )
    } else {
      Alert.alert(
        item.username,
        'What do you want to do?',
        [
          {text: 'View Profile', onPress: () => this.visitProfile(item.username)},
        ],
        { cancelable: true }
      )
    }
  }


  visitProfile(username: string)
  {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/user/getUserInfo?username=${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();

          global.viewUsername = json.username;
          global.viewEmail = json.email;
          global.viewFirstName = json.firstName;
          global.viewLastName = json.lastName;
          global.viewSumRecipeRatings = json.sumOfPersonalRecipeRatings;
          global.viewNumRecipeRatings = json.numberOfPersonalRecipeRatings;

          this.navigateTo('viewAccount');

      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
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

  calculateUserScore(sumratings, numratings) {
    if (numratings == 0 || sumratings == 0) {
      return 0;
    }
    else {
      rating = (sumratings / numratings);
      return parseFloat(rating).toFixed(2);
    }
  }




  render() { // eslint-disable-line
    return (

      <View style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>All Users</Title>

          <Button transparent onPress={() => this._onRefresh()}>
            <Icon name="ios-refresh" />
          </Button>
        </Header>

        <View style={{flexDirection: 'row'}}>

         <TextInput
          style={styles.searchBar}
          placeholder="Search Users"
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
          onSelect={(idx, value) => this._userSortOnSelect(idx, value)}
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
          // renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>
          //   <TouchableHighlight onPress={() => {
          //     this._pressRow(rowData);
          //     // highlightRow(sectionID, rowID);
          //   }}>
          //     <View>
          //       <View style={styles.row}>
          //         <Text style={styles.rowText}>
          //           {rowData[0]}
          //         </Text>
          //       </View>
          //     </View>
          //   </TouchableHighlight>
          // }
          renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>        
          <TouchableHighlight onPress={() => {
            this._pressRow(rowData);
            // highlightRow(sectionID, rowID);
          }}>
            <View>
              <View style={styles.row}>
                <Text style={styles.rowText}>
                  {rowData.username + "            Profile Rating: " + this.calculateUserScore(rowData.sumOfPersonalRecipeRatings, rowData.numberOfPersonalRecipeRatings)}
                </Text>
              </View>
            </View>
          </TouchableHighlight> }
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

export default connect(mapStateToProps, bindAction)(ViewAllUsers);
