import React, { Component } from 'react';
import { ToastAndroid, ActionButton, TouchableHighlight, Alert, View, Text, TextInput, ListView, RefreshControl, List, ListItem, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Header, Title, Button, Icon } from 'native-base';

import * as GLOBAL from '../../globals';

import navigateTo from '../../actions/pageNav'
import styles from './styles';
import store from 'react-native-simple-store';

import RecipeForm from './recipeForm';

var filter = require('lodash/filter');

class EditRecipe extends Component {

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
    this.props.navigateTo(route, 'editRecipe');
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

  getBrandsForRecipe() {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/recipe/getBrandsForRecipe?id=${global.recipeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        this.setState({ingredientsList: json});
      } else {
        Alert.alert(
          "Server Error",
          "Could Not Load Ingredients",
          [
            {text: 'Dismiss', style: 'cancel'}
          ],
          { cancelable: true }
        );
      }
    }).catch((error) => {
      console.error(error);
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

    this.getBrandsForRecipe();
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
        "Recipe now includes:",
        "" +  item,
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


  onAddIngredient(item) {
    console.log()
    var key = "brandName";
    var obj = {};
    obj[key] = item;
    store.get('account').then((data) => {
      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/addIngredientToRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        },

        
        body: JSON.stringify({
          recipeId: global.recipeId,
          brands: [obj],
      })
      }).then((response) => {
        if (response.status == 200) {
          console.log("recipe updated successfully");
          Alert.alert(
            "Recipe has been updated",
            "",
            [
              {text: 'Dismiss', style: 'cancel'}
            ],
            { cancelable: true }
          );
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

  onRemoveIngredient(item) {
    console.log()
    var key = "brandName";
    var obj = {};
    obj[key] = item;
    store.get('account').then((data) => {
      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/removeIngredientFromRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        },

        
        body: JSON.stringify({
          recipeId: global.recipeId,
          brands: [obj],
      })
      }).then((response) => {
        if (response.status == 200) {
          console.log("recipe updated successfully");
          Alert.alert(
            "Recipe has been updated",
            "",
            [
              {text: 'Dismiss', style: 'cancel'}
            ],
            { cancelable: true }
          );
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


  onSubmitLogin() {
    console.log()
    store.get('account').then((data) => {
      fetch(GLOBAL.API.BASE_URL + '/mixbook/recipe/editRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        },
        body: JSON.stringify({
          recipeId: global.recipeId,
          directions: this.state.directions,
          difficulty: this.state.difficulty,
      })
      }).then((response) => {
        if (response.status == 200) {
          console.log("recipe updated successfully");
          Alert.alert(
            "Recipe has been updated",
            "",
            [
              {text: 'Dismiss', style: 'cancel'}
            ],
            { cancelable: true }
          );
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
      let item = n.toLowerCase();
      return item.search(text) !== -1;
    });
  }
  

  _pressRow(item: string) {
    Alert.alert(
      "Add " + item + "?",
      "Are you sure you want to add " + item + " to your recipe?",
      [
        {text: 'Add', onPress: () => this.onAddIngredient(item)},
        {text: 'Delete', onPress: () => this.onRemoveIngredient(item)},
        {text: 'Cancel', style: 'cancel'},
      ],
      { cancelable: true }
    )
  }
  
  _onRefresh() {
    this.setState({refreshing: true});
    this.getRemoteData();
    this.setState({refreshing: false});
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
            <Title>Edit Recipe</Title>
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


        </View>

             {/* <View style={styles.Bcontainer}>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.navigateTo('addIngredient')}
            >
              <Text style={styles.buttonText}>Add More Ingredients</Text>
            </TouchableOpacity>

            </View> */}


            <View style ={styles.formContainer}>

              <Text style={styles.headers}> Recipe Name:  </Text> 
              <TextInput
                underlineColorAndroid={'transparent'}
                value={global.recipeName}
                style={styles.input}
                returnKeyType="next"
                keyboardType="numeric"
                onChangeText={(difficulty) => this.setState({ difficulty})}
                editable={false}
              />
              <Text style={styles.headers}> Ingredients: </Text>
              <Text style={styles.headers}> {this.state.ingredientsList}</Text>
              



              <View></View>
              <Text style={styles.headers}> Recipe Directions: </Text> 
              <TextInput
                underlineColorAndroid={'transparent'}
                defaultValue={global.directions}
                style={styles.inputdir}
                returnKeyType="next"
                multiline={true}
                onChangeText={(directions) => this.setState({ directions })}
             />
               <Text style={styles.headers}> Recipe Difficulty: </Text> 
              <TextInput
                underlineColorAndroid={'transparent'}
                defaultValue={global.difficulty}
                style={styles.input}
                returnKeyType="next"
                keyboardType="numeric"
                onChangeText={(difficulty) => this.setState({ difficulty})}
              />

        </View>
        <View style={styles.Bcontainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.onSubmitLogin()}
            >
              <Text style={styles.buttonText}>Update Recipe</Text>
            </TouchableOpacity>


            

          </View>

  
        </View>
    );
  }
  }

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(EditRecipe);
