import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, Alert, View, Text, TextInput, ListView, RefreshControl, List, ListItem, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav'
import styles from './styles';
import store from 'react-native-simple-store';

import RecipeForm from './recipeForm';

var lodash = require('lodash');

class AddRecipe extends Component {

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
      ingredients: [],
      drinkName: "",
      difficulty: 0,
      directions: ""
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'addRecipe');
  }

  componentDidMount() {
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

    this.getRemoteData();
  }

  updateRecipeName = (text) => {
    this.setState({recipeName: text})
  }

  updateDirections = (text) => {
    this.setState({directions: text})
  }

  updateDifficulty = (text) => {
    this.setState({difficulty: text})
  }

  onTapRefresh() {
    Alert.alert(
      "Refresh Brand List",
      'Are you sure you want to refresh? This may take a long time to load',
      [
        {text: 'Refresh', onPress: () => this.getRemoteData()},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
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
    store.get('recipeIngredients').then((data) => {
      var list = this.state.ingredients;
      var key = "brandName";
      var obj = {};
      obj[key] = item;
      list.push(
        obj
      );
      Alert.alert(
        "Recipe has",
        "Ingredients: " + list,
        [
        {text: 'Dismiss', style: 'cancel'}
        ],
        { cancelable: true }
      );
      store.update('recipeIngredients', list).catch((error) => {
        console.warn("Could not add to recipe");
      });

        this.setState({ingredients: list});
    });
  }


  onSubmitLogin() {
    // Add the ingredient to the server
    console.log(this.state.ingredients);

    var body = JSON.stringify({
          recipeName: this.state.recipeName,
          directions: this.state.directions,
          difficulty: this.state.difficulty,
          brands: this.state.ingredients
      });

    console.log(body);

    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/recipe/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJHdWVzdDQiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE0OTAzMzUzNjQzMDAsImV4cCI6MTQ5MDk0MDE2NH0.6QXgGm0-3cvXTYKh-EYderiIS5X9DgpSD7iXD9K8SpQagTJew_D8HjhOjxmbPzPHmqSwQYSGsBuaM4SWAr7rUw',
        },
        body: JSON.stringify({
          recipeName: this.state.recipeName,
          directions: this.state.directions,
          difficulty: this.state.difficulty,
          brands: this.state.ingredients
      })
      }).then((response) => {
        if (response.status == 200) {
          console.log("recipe added successfully");
          // store.get("inventory").then((data) => {
          //   var list = data;
          //   list.push(item);
          //   store.save("inventory", list).catch((error) => {
          //     console.warn("error stroing new inventory list into local store");
          //     console.warn(error);
          //   });
          //   ToastAndroid.show("Item added", ToastAndroid.SHORT);
          // }).catch((error) => {
          //     console.warn("error getting inventory list from local store");
          //     console.warn(error);
          //   });
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

    //this.props.popRoute();
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

  _pressRow(item: string) {
    Alert.alert(
      "Add " + item + "?",
      "Are you sure you want to add " + item + " to your recipe?",
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <Header>
            <Button transparent onPress={() => this.navigateTo('recipe')}>
              <Icon name="ios-arrow-back" />
            </Button>
            <Title>Add Recipe</Title>
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

            <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>
              <TouchableHighlight onPress={() => {
                this._pressRow(rowData);
                // highlightRow(sectionID, rowID);
              }}>
                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    {rowData}
                  </Text>
                </View>
              </TouchableHighlight>
            }
            renderSeperator={this._renderSeparator}
          />
        </View>

        <View>
          <Text style={styles.centerText}>
            Start typing to search possible ingredients
          </Text>
          </View>

        </View>


            <View style ={styles.formContainer}>
          <RecipeForm
            recipeName = {this.updateRecipeName}
            directions = {this.updateDirections}
            difficulty = {this.updateDifficulty}
          />
          <View style={styles.Bcontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.onSubmitLogin()}
            >
              <Text style={styles.buttonText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
        </View>
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

export default connect(mapStateToProps, bindAction)(AddRecipe);
