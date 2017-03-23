
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
    this.getLocalData();
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
    // store.get('mydrinks')
    // .then((data) => {
    //   this.setstate({
    //     rawData: data,
    //   })
    // })
    return;
  }

  getRemoteData() {
    store.get('account')
    .then((data) => {
      if (data.isGuest) {
        this.getLocalData();
        return;
      }

      fetch('https://activitize.net/mixbook/recipe/getAllRecipesUserCanMake', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        store.save("inventory", json).catch(error => {
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
      let item = n[2].toLowerCase();
      return item.search(text) !== -1;
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.getRemoteData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    ToastAndroid.show("Waiting on wyatt for this feature", ToastAndroid.SHORT);
  }

  // _renderRow(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
  //   return (
  //     <TouchableHighlight onPress={() => {
  //       this._pressRow(rowData);
  //       highlightRow(sectionID, rowID);
  //     }}>
  //       <View>
  //         <View style={styles.row}>
  //           <Text style={styles.rowText}>
  //             {rowData[2]}
  //           </Text>
  //         </View>
  //       </View>
  //     </TouchableHighlight>
  //   );
  // }

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
                    {rowData[2]}
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
