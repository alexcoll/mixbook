
import React, { Component } from 'react';
import { Alert, View, StyleSheet, ListView, Text, TouchableHighlight } from 'react-native';

import { Button, Icon } from 'native-base';

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
      displayType: 'all',
      active: 'true',
      theList: [{name: 'error', type: "Error", proof: 0}],
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }


  componentDidMount() {
    store.get('alcohol').then((data) => {
      this.setState({theList: data});
    });
  }


  checkListName(data) {
    return data.name == this;
  }


  onListItemRemove(item) {
    var list = this.state.theList;
    var index = list.findIndex(this.checkListName, item.name);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({theList: list});
      store.save('alcohol', this.state.theList);
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


  render() { // eslint-disable-line
    return (
      <View>
        {/*<ListView
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
        />*/}
      </View>
    );
  }
}
