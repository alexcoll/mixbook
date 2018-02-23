import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as GLOBAL from '../../globals';

import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, ListView, Text, Picker, Input, InputGroup, View, Grid, Col } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Load global variables
import '../recipes/index.js';
import '../login/index.js';

import styles from './styles';
import store from 'react-native-simple-store';

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
    };

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
      console.warn("error getting user token from local store");
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
          if (json[i][2] == this.current_user) {
            this.setState({
              hasUserReviewed: true,
              inputRating: String(json[i][1]),
              inputReviewText: json[i][0],
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
        pk: {recipe: { recipeId: this.state.drinkNumber }},
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
        pk: {recipe: { recipeId: this.state.drinkNumber }},
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

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>{this.state.name}</Title>
        </Header>
        <Content>
          <View>
          <List>
            <ListItem>
            <Text>By {this.state.reviewOwner}</Text>
            </ListItem>
            <ListItem>
              <Text style={styles.headers}>Ingredients</Text>
                 <List dataArray={this.state.ingredientsList}
                  renderRow={(data) =>
                    <ListItem>
                      <Grid>
                        <Col>
                          <Text style={styles.listTest}>{data}</Text>
                        </Col>
                       </Grid>
                    </ListItem>
                  }>
                </List>
            </ListItem>
            <ListItem>
              <Text>
                Directions: {this.state.directions}
              </Text>
            </ListItem>
            <ListItem>
              <Text>
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
            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
            onPress={() => this.onSubmit()}
          >
            {this.getReviewSubmitButtonText()}
          </Button>

          <View>
          <List>
            <ListItem>
              <Text>Reviews</Text>
            </ListItem>
            <ListItem>
             <List dataArray={this.state.theList}
              renderRow={(data) =>
                <ListItem>
                  <Text style={styles.listTest}>{data[2]}: {data[0]}</Text>
                  <Text style={styles.listTest} note>{data[1]} stars</Text>
                </ListItem>
                }>
              </List>
            </ListItem>
          </List>
          </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Reviews);
