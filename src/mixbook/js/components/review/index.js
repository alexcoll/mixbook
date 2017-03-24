import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, ListView, Text, Picker, Thumbnail, Input, InputGroup, View, Grid, Col } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

//Load global variables
import '../recipes/index.js';
import '../login/index.js';

import styles from './styles';
import store from 'react-native-simple-store';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

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
      pkNumber: {}
    };
  }

  componentWillReceiveProps() {
    // console.warn("willProps");
    this.fetchData();
    this.setUpPK();
  }

  componentWillMount() {
    // console.warn("willMount");
    this.fetchData();
    this.setUpPK();
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

  fetchData() {
    store.get('account').then((data) => {
      fetch(`https://activitize.net/mixbook/review/loadReviewsForRecipe?id=${this.state.drinkNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          //console.warn(json[0]);
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
    }).catch((error) => {
      console.warn("error getting user token from local store");
    });

    store.get('account').then((data) => {
      fetch(`https://activitize.net/mixbook/recipe/getBrandsForRecipe?id=${this.state.drinkNumber}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          // console.warn(json[0]);
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
    }).catch((error) => {
      console.warn("error getting user token from local store");
    });
  }


  replaceAt(route) {
    this.props.replaceAt('recipes', { key: route }, this.props.navigation.key);
  }

  submitRating(ratingInput){
    if(ratingInput < 0.0 || ratingInput > 5.0 )
    {
      Alert.alert(
        "Rating not valid",
        '',
        [
          {text: 'Okay', style: 'cancel'},
        ],
        { cancelable: true }
      )
    }
    else
    {
      this.setState({rating: ratingInput});
    }
  }

  submitReview(reviewInput){
    if(reviewInput == '')
    {
      Alert.alert(
        "Review not valid",
        '',
        [
          {text: 'Okay', style: 'cancel'},
        ],
        { cancelable: true }
      )
    }
    else
    {
          this.setState({reviews: reviewInput});
          console.log(this.state.reviews);
    }
  }

  setUpPK(){
      var innerKey = "recipeId";
      var innerObj = {};
      innerObj[innerKey] = this.state.drinkNumber;

      console.log(innerObj);

      var key = "recipe";
      var obj = {};
      obj[key] = innerObj;

      console.log(obj);

      this.state.pkNumber = obj;

      //this.setState({pkNumber: obj});

      console.log(this.state.pkNumber);
  }


  onSubmit() {
    if (this.state.rating < 0.0) {
      alert('Please enter a rating between 0-5');
      return;
    }
    if (this.state.reviews == '') {
      alert('Please add a review');
      return;
    }

    this.setUpPK();

    var body = JSON.stringify({
          pk: this.state.pkNumber,
          reviewCommentary: this.state.reviews,
          rating: this.state.rating
        });

    console.log(body);

    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/review/createReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJHdWVzdDQiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE0OTAzMzUzNjQzMDAsImV4cCI6MTQ5MDk0MDE2NH0.6QXgGm0-3cvXTYKh-EYderiIS5X9DgpSD7iXD9K8SpQagTJew_D8HjhOjxmbPzPHmqSwQYSGsBuaM4SWAr7rUw'
        },
        body: JSON.stringify({
          pk: this.state.pkNumber,
          reviewCommentary: this.state.reviews,
          rating: this.state.rating
        })
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          console.warn("Success");
          return json;
        } else if (response.status == 401)
        {
          alert("User can not rate own recipe");
        }
        else if (response.status == 400)
        {
          console.log(this.state.userReviewing +  "!==" + this.state.reviewOwner);
          if (this.state.userReviewing !== this.state.reviewOwner){
            store.get('account').then((data) => {
              fetch('https://activitize.net/mixbook/review/editReview', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJHdWVzdDQiLCJhdWRpZW5jZSI6IndlYiIsImNyZWF0ZWQiOjE0OTAzMzUzNjQzMDAsImV4cCI6MTQ5MDk0MDE2NH0.6QXgGm0-3cvXTYKh-EYderiIS5X9DgpSD7iXD9K8SpQagTJew_D8HjhOjxmbPzPHmqSwQYSGsBuaM4SWAr7rUw'
                },
                body: JSON.stringify({
                  pk: this.state.pkNumber,
                  reviewCommentary: this.state.reviews,
                  rating: this.state.rating
                })
              }).then(async (response) => {
                if (response.status == 200) {
                  var json = await response.json();
                  console.warn("Successful edit of Review");
                  return json;
                } else if (response.status == 401)
                {
                  alert("Was not able to edit/create review");
                }
                 else {
                  this.showServerErrorAlert(response);
                  return;
                }
              }).catch((error) => {
                console.error(error);
              });
            }).catch((error) => {
              console.warn("error getting user token from local store");
            });
          }
          else
          {
            alert("User can not rate own recipe");
          }
        }
         else  {
          this.showServerErrorAlert(response);
          return;
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.warn("error getting user token from local store");
    });
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
                Write a review
              </Text>
            </ListItem>
          </List>
          </View>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Rating"
                  placeholder="0-5"
                  value={this.state.rating}
                  onChangeText={rating => this.submitRating(rating)}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Review"
                placeholder="Enter a review "
                value={this.state.reviews}
                onChangeText={review => this.submitReview(review)}
                />
              </InputGroup>
            </ListItem>
          </List>
          <Button
            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
            onPress={() => this.onSubmit()}
          >
            Add
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
