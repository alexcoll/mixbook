
import React, { Component } from 'react';
import { Alert, View, StyleSheet, ListView, Text, TouchableHighlight, RefreshControl} from 'react-native';

import styles from './styles';

import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

var GiftedListView = require('react-native-gifted-listview');

export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      displayType: 'all',
      active: 'true',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }


  componentDidMount() {
    store.get('inventory').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      });
    }).catch(error => {
      console.warn("error getting the inventory list from the local store");
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


  fetchInventory() {
    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/inventory/getUserInventory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.userInfo.token,
        }
      }).then(async (response) => {
        if (response.status == 100) {
          var json = await response.json();
        // console.warn(json[0]);
        store.save("inventory", json).catch(error => {
          console.warn("error storing the inventory list into the local store");
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json)
        });
        return json;
        } else {
          this.showServerErrorAlert(response);
          return;
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.warn("error getting user token from local store");
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
    this.fetchInventory();
    this.setState({refreshing: false});
  }


  render() { // eslint-disable-line
    return (
      <View>
      <ListView
      refreshControl={
        <RefreshControl
        refreshing={this.state.refreshing}
        onRefresh={this._onRefresh.bind(this)}
        />
      }
      dataSource={this.state.dataSource}
      renderRow={(rowData) =>
        <View style={styles.listContainer}>
        <Text style={styles.test}>{rowData}</Text>
        </View>
      }
      renderSeperator={(sectionId, rowId, adjacentRowHighlighted) => <View key={rowId} style={styles.separator} />}
      />
      </View>
      );
    }
  }
