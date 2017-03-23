import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, Alert, View, Text, TextInput, ListView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav'
import styles from './styles';
import store from 'react-native-simple-store';

var filter = require('lodash/filter');

class AddIngredient extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Start typing to search possible ingredients']),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: ['Start typing to search possible ingredients'],
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'ingredients');
  }

  componentDidMount() {
    this.getLocalData();
  }

  onTapRefresh() {
    Alert.alert(
      "Refresh Brand List",
      'Are you sure you want to refresh? This may take a long time to load',
      [
        {text: 'Refresh', onPress: () => this.fetchBrands()},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  getLocalData() {
    store.get('brands').then((data) => {
      this.setState({
        // dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    }).catch(error => {
      console.warn("error getting the brand list from the local store");
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  getRemoteData() {
    fetch('https://activitize.net/mixbook/brand/getBrands', {
      method: 'GET',
    })
    .then(async (response) => {
      if (response.status == 200) {
        var brandList = await response.json();

        store.save("brands", brandList)
        .catch(error => {
          console.warn("error storing the brand list into the local store");
        });

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(brandList),
          rawData: brandList,
        });

        return brandList;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
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

  onItemAdd(item) {
    // Add the ingredient to the server
    store.get("inventory")
    .then((data) => {
      var list = data;

      list.push(item);
      store.save("inventory", list)
      .then(() => {
        this.navigateTo('ingredients');
        ToastAndroid.show("Item added", ToastAndroid.SHORT);

        store.get('account').then((data) => {
          if (data.isGuest) {
            return;
          }

          fetch('https://activitize.net/mixbook/inventory/addIngredientToInventory', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': data.userInfo.token,
            },
              body: JSON.stringify({
              brandName: item
            })
          })
          .then((response) => {
            if (response.status == 200) {
              console.log("inventory list pushed successfully");
            } else {
              this.showServerErrorAlert(response);
              return;
            }
          })
          .catch((error) => {
            console.error(error);
          });
        })
        .catch((error) => {
          console.warn("error getting user token from local store");
          console.warn(error);
        });
      })
      .catch((error) => {
        console.warn("error stroing new inventory list into local store");
        console.warn(error);
      });
    })
    .catch((error) => {
      console.warn("error getting inventory list from local store");
      console.warn(error);
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

  _pressRow(item: string) {
    Alert.alert(
      "Add " + item + "?",
      "Are you sure you want to add " + item + " to your inventory?",
      [
        {text: 'Add', onPress: () => this.onItemAdd(item)},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
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

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.navigateTo('ingredients')}>
            <Icon name="ios-arrow-back" />
          </Button>
          <Title>Add Ingredient</Title>
          <Button transparent onPress={() => this.onTapRefresh()}>
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
          renderSeperator={this._renderSeparator}
        />
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(AddIngredient);
