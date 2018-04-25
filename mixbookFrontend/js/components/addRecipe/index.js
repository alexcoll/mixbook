import React, { Component } from 'react';
import { ToastAndroid, TouchableHighlight, Alert, View, Text, TextInput, ListView, RefreshControl, List, ListItem, TouchableOpacity, Picker} from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import * as GLOBAL from '../../globals';

import navigateTo from '../../actions/pageNav'
import styles from './styles';
import store from 'react-native-simple-store';

import RecipeForm from './recipeForm';

var filter = require('lodash/filter');

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
      directions: "",
      currentIngriedents: "You have not selected any ingredients yet!",
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'addRecipe');
  }

  componentDidMount() {
    this.getBrands();
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

  getBrands() {
    store.get('brands').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
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
    fetch(GLOBAL.API.BASE_URL + '/mixbook/brand/getBrands', {
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
      if(this.state.currentIngriedents == "You have not selected any ingredients yet!")
      {
        this.setState ({
          currentIngriedents : "",
        });
      }

      var currIng = "";

      if(this.state.currentIngriedents == "")
        currIng = item.brandName;
      else
        currIng = this.state.currentIngriedents + ", " + item.brandName;

      this.setState ({
        currentIngriedents : currIng,
      })

      var list = this.state.ingredients;
      var key = "brandName";
      var obj = {};
      obj[key] = item.brandName;
      list.push(
        obj
      );

      store.update('recipeIngredients', list).catch((error) => {
        console.warn("Could not add to recipe");
      });

        this.setState({ingredients: list});
    });
  }


  onSubmitLogin() {
    console.log()
    store.get('account').then((data) => {
      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
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
          Alert.alert(
            "Recipe has been added",
            "",
            [
              {text: 'Dismiss', style: 'cancel'}
            ],
            { cancelable: true }
          );
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
    return filter(items, (n) => {
      let item = n.brandName.toLowerCase();
      return item.search(text) !== -1;
    });
  }

  _pressRow(item: string) {
    Alert.alert(
      "Add " + item.brandName + "?",
      "Are you sure you want to add " + item.brandName + " to your recipe?",
      [
        {text: 'Add', onPress: () => this.onItemAdd(item)},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
  }

  updateDifficulty = (diff) => {
    this.setState({difficulty: diff})
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
                    {rowData.brandName}
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
        
        <View>
            <Text>Current Ingredients</Text>
            <Text>{this.state.currentIngriedents}</Text>
        </View>



            <View style ={styles.formContainer}>
          <RecipeForm
            recipeName = {this.updateRecipeName}
            directions = {this.updateDirections}
          />
          <View>
            <Text>Difficulty:</Text> 
            <Picker selectedValue = {this.state.difficulty} onValueChange = {this.updateDifficulty}>
               <Picker.Item label = "Beginner" value = "1" />
               <Picker.Item label = "Easy" value = "2" />
               <Picker.Item label = "Average" value = "3" />
               <Picker.Item label = "Challenging" value = "4" />
               <Picker.Item label = "Expert" value = "5" />
            </Picker>

         </View>

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
