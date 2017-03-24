
import React, { Component } from 'react';
import { ToastAndroid, TextInput, Alert, View, ListView, Text, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

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
      dataSource: ds.cloneWithRows(['Pull to refesh data']),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: ['Pull to refesh data'],
    };

    store.get('account')
    .then((data) => {
      this.setState({
        isGuest: data.isGuest
      });
    })
    .catch((error) => {
      console.warn("error getting account guest data from local store");
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

  componentWillReceiveProps() {
    // console.warn("willProps");
    this.getRemoteData();
  }

  componentWillMount() {
    // console.warn("willMount");
    this.getRemoteData();
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

  getLocalData() {
    store.get('recipes').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    }).catch(error => {
      console.warn("error getting the recipe list from the local store");
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  getRemoteData() {
    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/recipe/getAllRecipesUserCanMake', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        // console.warn(json[0]);
        store.save("recipe", json).catch(error => {
          console.warn("error storing the recipe list into the local store");
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
    return filter(items, (n) => {
      let item = n[1].toLowerCase();
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
        fetch('https://activitize.net/mixbook/recipe/deleteRecipe', {
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
            this.fetchData();
            console.log("recipe list pushed successfully");
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

    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getRemoteData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    Alert.alert(
      "Edit " + item[1],
      'What do you want to do?',
      [
        {text: 'Review', onPress: () => {
          //this.props.navigator.push({name:'review', data:item});
          global.recipeName = item[1];
          global.recipeId = item[0];
          global.directions = item[2];
          global.reviewOwner = item[7];

          //console.warn(global.recipeName);
          this.navigateTo('review');
          }
        },
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

          <Title>My Drinks</Title>
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
                    {rowData[1]}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          renderSeparator={this._renderSeparator}
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

export default connect(mapStateToProps, bindAction)(MyDrinks);
