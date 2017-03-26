
import React, { Component } from 'react';
import { ToastAndroid, TextInput, Alert, View, StyleSheet, ListView, Text, TouchableHighlight, RefreshControl} from 'react-native';
import { connect } from 'react-redux';

// import { actions } from 'react-native-navigation-redux-helpers';
import { Header, Title, Content, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';

var filter = require('lodash/filter');

class Ingredients extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isGuest: true,
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: [],
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
    this.props.navigateTo(route, 'ingredients');
  }

  componentWillReceiveProps() {
    //console.log("willProps");
    this.getLocalData();
    // this.getRemoteData();
  }

  componentWillMount() {
    //console.log("willMount");
    store.get('account').then((data) => {
      this.setState({
        isGuest: data.isGuest,
      })
    }).catch((error) => {
      console.warn("error getting isGuest from local store");
      console.warn(error);
    });

    this.getRemoteData();
  }

  showServerErrorAlert(json) {
    Alert.alert(
      "Error",
      json.errorMessage,
      [
        {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
    );
  }

  getLocalData() {
    store.get('inventory').
    then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    })
    .catch(error => {
      console.warn("error getting the inventory list from the local store");
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  getRemoteData() {
    store.get('account').then((data) => {
      if (data.isGuest) {
        this.getLocalData();
        return;
      }

      fetch('https://activitize.net/mixbook/inventory/getUserInventory', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        }
      })
      .then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          store.save("inventory", json)
          .catch(error => {
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
          var json = await response.json();
          this.showServerErrorAlert(json);
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          empty: true,
          isLoading: false,
        });
      });
    })
    .catch((error) => {
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
    return filter(items, (n) => {
      let item = n.toLowerCase();
      return item.search(text) !== -1;
    });
  }


  onListItemRemove(item: string) {
    this.setState({
      isLoading: true,
    });

    var list = this.state.rawData;
    var index = list.indexOf(item);
    if (index > -1) {
      list.splice(index, 1);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
        isLoading: false,
        rawData: list,
      });

      store.save('inventory', list)
      .then(() => {
        // Delete the ingredient from the server
        store.get('account').then((data) => {
          if (data.isGuest) {
            ToastAndroid.show("Item removed", ToastAndroid.SHORT);
            return;
          }

          fetch('https://activitize.net/mixbook/inventory/deleteIngredientFromInventory', {
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
              ToastAndroid.show("Item removed", ToastAndroid.SHORT);
              this.getRemoteData();
              console.log("inventory list pushed successfully");
              return;
            } else {
              this.showServerErrorAlert(response);
              return;
            }
          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.warn("error getting user token from local store");
          console.warn(error);
        });
      })
      .catch((error) => {
        console.warn("error storing inventory into local store");
      });
    } else {
      Alert.alert("Error");
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getRemoteData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    Alert.alert(
      "Edit " + item,
      'What do you want to do?',
      [
        {text: 'Delete', onPress: () => this.onListItemRemove(item)},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
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

          <Title>Ingredients</Title>

          <Button transparent onPress={() => this._onRefresh()}>
            <Icon name="ios-refresh" />
          </Button>
        </Header>

        <TextInput
          style={styles.searchBar}
          placeholder="Search inventory"
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
          dataSource={this.state.dataSource}
          renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>
            <TouchableHighlight onPress={() => {
              this._pressRow(rowData);
              // highlightRow(sectionID, rowID);
            }}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    {rowData}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          renderSeparator={this._renderSeparator}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.navigateTo('addIngredient')}
        />
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

export default connect(mapStateToProps, bindAction)(Ingredients);
