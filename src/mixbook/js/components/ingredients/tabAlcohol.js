
import React, { Component } from 'react';
import { ToolbarAndroid, TextInput, Alert, View, StyleSheet, ListView, Text, TouchableHighlight, RefreshControl} from 'react-native';

import styles from './styles';

import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

import SearchBar from 'react-native-searchbar'

var lodash = require('lodash');


export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      displayType: 'all',
      active: 'true',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: ['row 1', 'row 2'],
      results: [],
    };
  }


  componentDidMount() {
    store.get('inventory').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    }).catch(error => {
      console.warn("error getting the inventory list from the local store");
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
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
      fetch('https://activitize.net/mixbook/inventory/getUserInventory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.userInfo.token,
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        // console.warn(json[0]);
        store.save("inventory", json).catch(error => {
          console.warn("error storing the inventory list into the local store");
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
          isLoading: false,
          empty: false,
          rawData: json,
        });
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
    return lodash.filter(items, (n) => {
      let item = n.toLowerCase();
      return item.search(text) !== -1;
    });
  }


  onListItemRemove(item) {
    var list = this.state.theList;
    var index = list.findIndex(this.checkListName, item.name);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({theList: list});
      store.save('inventory', this.state.theList);
    }
  }


  onListItemEdit(item) {
    Alert.alert(
      "Edit " + item.name + " " + item.type,
      'Not implemented yet',
      [
      {text: 'Cool'},
      {text: 'Work harder', style: 'cancel'},
      ],
      { cancelable: true }
      )
  }


  onListItemTap(item) {
    Alert.alert(
      "Edit " + item.name + " " + item.type,
      'What do you want to do?',
      [
      {text: 'Delete', onPress: () => this.onListItemRemove(item)},
      {text: 'Cancel', style: 'cancel'},
      {text: 'Edit', onPress: () => this.onListItemEdit(item)},
      ],
      { cancelable: true }
      )
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  _renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableHighlight
        onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}
      >
        <View style={styles.listContainer}>
          <Text style={styles.test}>{rowData}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _pressRow(rowID) {
    console.warn(rowID + " pressed!");
  }

  _renderSeparator(sectionId, rowId, adjacentRowHighlighted) {
    return (
      <View key={rowId} style={styles.separator} />
    );
  }

  _handleResults(results) {
    this.setState({ results });
  }


  render() { // eslint-disable-line
    return (
      <View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search inventory"
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
        />
        <SearchBar
          ref={(ref) => this.searchBar = ref}
          data={this.state.rawData}
          handleResults={this._handleResults}
          showOnLoad
        />
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSeperator={this._renderSeparator}
        />
      </View>
    );
  }
}
