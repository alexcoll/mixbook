import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, Alert, ListView, View, TouchableHighlight, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import * as GLOBAL from '../../globals';

import navigateTo from '../../actions/pageNav';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Picker, Input, InputGroup, Grid, Col } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Load global variables
import '../recipes/index.js';
import '../login/index.js';

import styles from './styles';
import store from 'react-native-simple-store';
import ModalDropdown from 'react-native-modal-dropdown';

const Item = Picker.Item;

const {
  replaceAt,
} = actions;

class Reviews extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    console.log(props.items);
    this.state = {
      isGuest: true,
      name: global.recipeName,
      directions: global.directions,
      drinkNumber: global.recipeId,
      difficulty: global.difficulty,
      reviewOwner: global.reviewOwner,
      userReviewing: global.username,
      rating: 0,
      numRatings: 0.0,
      reviews: "",
      theList: [],
      ingredientsList: {},
      inputRating: "",
      inputReviewText: "",
      isOwnRecipe: false,
      hasUserReviewed: false,
      sortDirection: '0',
    };
    console.log("STATE:");
    console.log(this.state.name);
    console.log(this.state.directions);

    this.current_user = "";
    this.auth_token = "";
  }

  componentWillReceiveProps() {
    this.getRemoteData();
  }

  componentWillMount() {
    this.getLocalData();
    this.getRemoteData();
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
    store.get('account').then((data) => {
      this.current_user = data.userInfo.username;
      this.auth_token = data.token;

      this.setState({
        isGuest: data.isGuest,
      });

      if (data.userInfo.username == this.state.reviewOwner) {
        this.setState({
          isOwnRecipe: true,
        });
      } else {
        this.setState({
          isOwnRecipe: false,
        });
      }
    }).catch((error) => {
      console.warn("store.get(account): error getting user token from local store");
    });
  }

  getRemoteData() {
    this.getBrandsForRecipe();
    this.loadReviewsForRecipe();
  }

  loadReviewsForRecipe() {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/review/loadReviewsForRecipe?id=${this.state.drinkNumber}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();

        // Check if user has already written a review
        for (i = 0; i < json.length; i++) {
          if (json[i][3] == this.current_user) {
            this.setState({
              hasUserReviewed: true,
              inputRating: String(json[i][2]),
              inputReviewText: json[i][1],
            })
          }
          break;
        }

        this.setState({theList: json});
      } else {
        Alert.alert(
          "Server Error",
          "Could Not Load Reviews",
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

  getBrandsForRecipe() {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/recipe/getBrandsForRecipe?id=${this.state.drinkNumber}`, {
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


  replaceAt(route) {
    this.props.replaceAt('recipes', { key: route }, this.props.navigation.key);
  }

  onSubmit() {
    if (this.state.userReviewing == this.state.reviewOwner || typeof this.state.inputRating == 'undefined') {
      Alert.alert("You can't rate your own recipe");
    }

    if (this.state.inputRating < 1 || this.state.inputRating > 5 ) {
      Alert.alert('Please enter a rating between 1-5');
      return;
    }

    console.log("Review: " + this.state.inputReviewText);

    if (this.state.inputReviewText == "" || typeof this.state.inputReviewText == 'undefined')  {
      Alert.alert('Please enter some text in the review body');
      return;
    }

    if (this.state.hasUserReviewed) {
      this.editReview();
    } else {
      this.createReview();
    }
  }

  createReview() {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/review/createReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.auth_token,
      },
      body: JSON.stringify({
        recipe: { recipeId: this.state.drinkNumber },
        reviewCommentary: this.state.inputReviewText,
        rating: this.state.inputRating
      })
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        ToastAndroid.show("Review added", ToastAndroid.SHORT);
        this.getRemoteData();
        return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  editReview() {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/review/editReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.auth_token,
      },
      body: JSON.stringify({
        recipe: { recipeId: this.state.drinkNumber },
        reviewCommentary: this.state.inputReviewText,
        rating: this.state.inputRating
      })
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();
        console.log("Successful edit of Review");
        ToastAndroid.show("Review edited", ToastAndroid.SHORT);
        this.getRemoteData();
        return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  getReviewSectionHeaderText() {
    if (this.state.hasUserReviewed) {
      return "Edit review";
    } else {
      return "Write review";
    }
  }

  getReviewSubmitButtonText() {
    if (this.state.hasUserReviewed) {
      return "Edit";
    } else {
      return "Add";
    }
  }

  visitProfile(username: string)
  {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/user/getUserInfo?username=${username}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();

          global.viewUsername = json.username;
          global.viewEmail = json.email;
          global.viewFirstName = json.firstName;
          global.viewLastName = json.lastName;
          global.viewSumRecipeRatings = json.sumOfPersonalRecipeRatings;
          global.viewNumRecipeRatings = json.numberOfPersonalRecipeRatings;

          this.navigateTo('viewAccount');

      } else {
        this.showServerErrorAlert(response);
        return;
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  submitUpvote(reviewID, state) {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/review/upVoteReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.auth_token,
      },
      body: JSON.stringify({
        pk: { userRecipeHasReview: { usersRecipeHasReviewId: reviewID } },
        vote: true
      })
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();

        if (!state) {
          console.log("Successful upvote of Review");
          ToastAndroid.show("Review upvoted", ToastAndroid.SHORT);
        } else {
          console.log("Successful un-upvote of Review");
          ToastAndroid.show("Review un-upvoted", ToastAndroid.SHORT);
        }
        this.getRemoteData();
        return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  submitDownvote(reviewID, state) {
    fetch(`${GLOBAL.API.BASE_URL}/mixbook/review/downVoteReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.auth_token,
      },
      body: JSON.stringify({
        pk: { userRecipeHasReview: { usersRecipeHasReviewId: reviewID } },
        vote: false
      })
    }).then(async (response) => {
      if (response.status == 200) {
        var json = await response.json();

        if (!state) {
          console.log("Successful downvote of Review");
          ToastAndroid.show("Review downvoted", ToastAndroid.SHORT);
        } else {
          console.log("Successful un-downvote of Review");
          ToastAndroid.show("Review un-downvoted", ToastAndroid.SHORT);
        }
        this.getRemoteData();
        return json;
      } else {
        this.showServerErrorAlert(response);
        return;
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  _recipeSortOnSelect(idx, value) {
    console.log("sorting to idx: " + idx + ", value: " + value);

    this.setState({
      sortDirection: idx,
    })

    if (idx == '0') {
      this.getRemoteData();
      return;
    } else {
      let sortedData = this.sortRecipes(this.state.theList, idx.toString());

      this.setState({
        theList: sortedData,
      });
    }
  }

  sortRecipes(items, idx) {
    switch (idx) {
      case '1':
        return items.sort(function (a, b) {
          if (a[4] > b[4]) return -1;
          if (b[4] < a[4]) return 1;
          return 0;
        })
        break;
      case '2':
        return items.sort(function (a, b) {
          if (a[5] > b[5]) return -1;
          if (b[5] < a[5]) return 1;
          return 0;
        })
        break;
    }
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'review');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Title>{this.state.name}</Title>
        </Header>
        <Content>
        <View>
            <List>
              <ListItem onPress={() => this.visitProfile(this.state.reviewOwner)}>
              <Text>By {this.state.reviewOwner}</Text>
              </ListItem>
              <ListItem>
                <Text style={styles.headers}>Ingredients</Text>
                   <List dataArray={this.state.ingredientsList}
                    renderRow={(data) =>
                      <ListItem>
                        <Grid>
                          <Col>
                            <Text style={styles.listTest}>{data.brandName}</Text>
                          </Col>
                         </Grid>
                      </ListItem>
                    }>
                  </List>
              </ListItem>
              <ListItem>
                <Text>Difficulty: {this.state.difficulty}</Text>
                </ListItem>
              <ListItem>
                <Text>
                  {"Directions:\n" + this.state.directions}
                </Text>
              </ListItem>
              <ListItem>
                <Text style={styles.headers}>
                  {this.getReviewSectionHeaderText()}
                </Text>
              </ListItem>
            </List>
            </View>
            <List>
              <ListItem>
                <InputGroup disabled={this.state.isGuest || this.state.isOwnRecipe}>
                  <Input
                    inlineLabel label="Rating"
                    placeholder="0-5"
                    value={String(this.state.inputRating)}
                    onChangeText={(inputRating) => this.setState({ inputRating })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest || this.state.isOwnRecipe}>
                  <Input
                    inlineLabel label="Review"
                    placeholder="Review text"
                    value={this.state.inputReviewText}
                    onChangeText={(inputReviewText) => this.setState({ inputReviewText })}
                  />
                </InputGroup>
              </ListItem>
            </List>
            <Button
              disabled={this.state.isGuest || this.state.isOwnRecipe}
              style={styles.reviewSubmitButton}
              onPress={() => this.onSubmit()}
            >
              {this.getReviewSubmitButtonText()}
            </Button>
            <View>
            <List>
              <ListItem>
                <Text style={styles.reviewsSectionHeaderText}>Reviews</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                </View>
                <Button>
                  <ModalDropdown
                    options={["Default", "Helpful", "Unhelpful"]}
                    defaultValue="Sort"
                    style={styles.sortButtonStyle}
                    textStyle={styles.sortButtonTextStyle}
                    dropdownTextStyle={styles.sortDropdownTextStyle}
                    onSelect={(idx, value) => this._recipeSortOnSelect(idx, value)}
                  />
                </Button>
              </ListItem>
              <ListItem>
                <List dataArray={this.state.theList}
                  renderRow={(data) =>
                  <ListItem>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1, flexDirection: 'column'}}>
                        <View>
                          <Text style={styles.reviewUsernameText}>{data.user.username}</Text>
                        </View>
                        <View>
                          <Text style={styles.reviewStarsText}>{data.rating} stars</Text>
                        </View>
                        <View>
                          <Text style={styles.reviewCommentaryText}>{data.reviewCommentary}</Text>
                        </View>
                        <View style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                          <View style={{
                            flex: 1,
                            flexDirection: 'row',
                          }}>
                            <View style={{justifyContent: 'center'}}>
                              <Button
                                disabled={this.state.isGuest || (this.current_user == data[3])}
                                style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                                onPress={() => this.submitUpvote(data[0])}
                              >
                                <MaterialIcons name="thumb-up" />
                              </Button>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                              <Button
                                disabled={this.state.isGuest || (this.current_user == data[3])}
                                style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
                                onPress={() => this.submitDownvote(data[0])}
                              >
                                <MaterialIcons name="thumb-down" />
                              </Button>
                            </View>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.upCountText}>{data[4]}</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.listTest}>:</Text>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                            <Text style={styles.downCountText}>{data[5]}</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ListItem>
                  }>
                </List>
              </ListItem>
            </List>
        </View>
        </Content>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Reviews);
