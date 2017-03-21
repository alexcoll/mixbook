
import React, { Component } from 'react';
import { Alert, View, ListView, Text, RefreshControl, TouchableHighlight } from 'react-native';

import styles from './styles';

import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';


export default class TabBrands extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      displayType: 'all',
      active: 'true',
      dataSource: ds.cloneWithRows(["Refresh to get brands"])
    };
  }


  componentDidMount() {
    store.get("brands").then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data)
      });
    }).catch(error => {
      console.warn("error getting the brand list from the local store");
    });
  }


  onListItemTap(item) {
    Alert.alert(
      "Info",
      'What do you want to do?',
      [
        {text: 'Nothing', style: 'cancel'},
        {text: 'Cancel', style: 'cancel'},
        {text: 'Nothing', style: 'cancel'},
      ],
      { cancelable: true }
    )
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


  fetchBrands() {
    fetch('https://activitize.net/mixbook/brand/getBrands', {
      method: 'GET',
      headers: {
        'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4dGVzdCIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTQ4ODkyMzEwMjI0NiwiZXhwIjoxNDg5NTI3OTAyfQ.OeghNTe9adLZOmfhULvPpvY2JSTFCxtSOi8VEc2nIJDNEYsuJUr2_48WrrlUX5uyHrRuyb7xHHupbY5hGu0PSg'
      }
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        // console.warn(json[0]);
        var brandList = [ ];
        for (i = 0; i < json.length; i++) {
          brandList[i] = json[i][2];
        }
        store.save("brands", brandList).catch(error => {
          console.warn("error storing the brand list into the local store");
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(brandList)
        });
        return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }


  parseBrandList(json) {
    return json;
  }


  _onRefresh() {
    this.setState({refreshing: true});
    Alert.alert(
      "Refresh Brand List",
      'Are you sure you want to refresh? This may take a long time to load',
      [
        {text: 'Refresh', onPress: () => this.fetchBrands()},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )

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
          renderSeperator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}
