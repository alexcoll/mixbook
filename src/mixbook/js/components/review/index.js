import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, ListView, Text, Picker, Thumbnail, Input, InputGroup, View, Grid, Col } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


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

  constructor(data, props) {
    super(props);
    this.state = {
      name: data[2],
      directions: data[3], 
      drinkNumber: data[1],
      rating: 0.0, 
      numRatings: 0.0, 
      reviews: "",
      theList: [{"rating":5.0, "reviewCommentary":"No Available Reviews"}]
    };
  }

  componentWillReceiveProps() {
    // console.warn("willProps");
    this.fetchData();
  }

  componentWillMount() {
    // console.warn("willMount");
    this.fetchData();
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
      fetch('https://activitize.net/mixbook/review/loadReviewsForRecipe', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          recipeId: this.state.drinkNumber
        })
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          console.warn(json[0]);
          return json;
        } else {
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


  replaceAt(route) {
    this.props.replaceAt('recipes', { key: route }, this.props.navigation.key);
  }

  submitRating(ratingInput){
    if(ratingInput < 0.0 || ratingInput >= 5.0 )
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
    }
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

    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/review/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.state.token
        },
        body: JSON.stringify({
          pk: JSON.stringify({
            recipe: JSON.stringify({
              recipeId: this.state.recipeId
            })
          }),
          reviewCommentary: this.state.reviews,
          rating: this.state.rating
        })
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
          console.warn(json[0]);
          return json;
        } else {
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
          <Button transparent onPress={() => this.replaceAt('recipes')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>{this.state.name}</Title>
        </Header>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Rating"
                  placeholder="0-5"
                  value={this.state.rating}
                  onChangeText={rating => this.submitRating({rating})}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Review"
                placeholder="Enter a review "
                value={this.state.reviews}
                onChangeText={review => this.submitReview({review})}
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
          <Text>Reviews</Text>
          <View>
             <List dataArray={this.state.theList}
              renderRow={(data) =>
            <ListItem>
              <Grid>
                    <Col>
                      <Text style={styles.listTest}>{data.rating} stars</Text>
                      <Text style={styles.listTest} note>{data.reviewCommentary}</Text>
                    </Col>
               </Grid>
            </ListItem>
            }>
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
