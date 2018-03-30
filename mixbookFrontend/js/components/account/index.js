import React, { Component } from 'react';
import { ToastAndroid, TouchableOpacity, TouchableHighlight, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, InputGroup, Input, Text, Thumbnail } from 'native-base';

import ToolTip from 'react-native-tooltip';
import { openDrawer } from '../../actions/drawer';
import { actions } from 'react-native-navigation-redux-helpers';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as GLOBAL from '../../globals';
//import StarRating from 'react-native-star-rating';

import styles from './styles';

const camera = require('../../../img/camera.png');

import store from 'react-native-simple-store';

const {
  replaceAt,
} = actions;

class Account extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    })
  }


  constructor(props) {
    super(props);
    this.state = {
      token: '',
      isGuest: true,
      inputUsername: '',
      inputFirstName: '',
      inputLastName: '',
      inputEmail: '',
      inputOldPassword: '',
      inputNewPassword1: '',
      inputNewpassword2: '',
      badges: [],
      ratings: 0,
      recipes: 0,
      profRating: 0,
    };
  }


  replaceAt(route) {
    this.props.replaceAt('account', { key: route }, this.props.navigation.key);
  }


  componentDidMount() {
    store.get('account')
    .then((data) => {
      this.setState({
        isGuest: data.isGuest,
        token: data.token,
        inputUsername: data.userInfo.username,
        inputFirstName: data.userInfo.firstName,
        inputLastName: data.userInfo.lastName,
        inputEmail: data.userInfo.email,
        ratings: data.userInfo.numOfRatings,
        recipes: data.userInfo.numOfRecipes,
        sumOfPersonalRecipeRatings: data.userInfo.sumOfPersonalRecipeRatings,
        numberOfPersonalRecipeRatings: data.userInfo.numberOfPersonalRecipeRatings,
        profRating: this.getProfRating(data.userInfo.sumOfPersonalRecipeRatings, data.userInfo.numberOfPersonalRecipeRatings),
      });
      console.log("PROF: " + this.state.profRating);
    })
    .catch((error) => {
      console.warn("error getting settings from local store");
    });
  }


  onLogout() {
    store.save('account', {
      isLoggedIn: false,
      isGuest: false,
      token: "",
      userInfo: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        badges: [],
        numOfRatings: 0,
        numOfRecipes: 0,
        profRating: 0,
      }
    })
    .then(() => {
      this.replaceAt('login');
      ToastAndroid.show("Logged out", ToastAndroid.SHORT);
    })
    .catch((error) => {
      console.warn("error clearing account data from local store");
    });

    store.save('inventory', []);
  }

  onLock() {
    //TODO when tyler implements back end
    store.get('account').then((data) => {
      if (data.isGuest) {
        ToastAndroid.show("Item removed", ToastAndroid.SHORT);
        return;
      }
    fetch(GLOBAL.API.BASE_URL + '/mixbook/user/lockAccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': data.token,
      }
    }).then((response) => {
      ToastAndroid.show("Account Locked", ToastAndroid.SHORT);
      this.onLogout();
    }).catch((error) => {
      console.error(error);
    });
  }).catch((error) => {
    console.warn("error getting user token from local store");
    console.warn(error);
  });
  }

  onSubmit() {
    store.get('account')
    .then((data) => {
      if (data.isGuest) {
        Alert("Cannot change guest account information");
        return;
      }

      var wasAnythingChanged = false;

      // Check if password is being changed
      if (this.state.inputOldPassword !== "" && this.state.inputNewPassword1 !== "" && this.state.inputNewPassword2 !== "") {
        this.updatePassword(data.token, this.state.inputOldPassword, this.state.inputNewPassword1, this.state.inputNewPassword2);
        wasAnythingChanged = true;
      }

      if (this.state.inputEmail !== data.userInfo.email) {
        console.log("email has been changed, updating...");
        this.updateEmail(data.token, this.state.inputEmail);
        wasAnythingChanged = true;
      }

      if ((this.state.inputFirstName !== data.userInfo.firstName) || (this.state.inputLastName !== data.userInfo.lastName)) {
        console.log("first or last name has been changed, updating...");
        this.updateNames(data.token, this.state.inputFirstName, this.state.inputLastName);
        wasAnythingChanged = true;
      }

      if (!wasAnythingChanged) {
        ToastAndroid.show("Nothing changed", ToastAndroid.SHORT);
      }
    })
    .catch((error) => {
      console.warn("error getting account data from local store");
      console.warn(error);
    });
  }

  updatePassword(token, oldPass, newPass1, newPass2) {
    // Make sure both new passwords match
    if (newPass1 !== newPass2) {
      Alert.alert(
        "Error Changing Password",
        "The two new passwords must match",
        [
          {text: 'Ok', style: 'cancel'},
        ],
        { cancelable: true }
      )
      return;
    }

    // Make sure the new password is different from the old password
    if (oldPass === newPass1) {
      Alert.alert(
        "Error Changing Password",
        "The new password must be different from your old password.",
        [
          {text: 'Ok', style: 'cancel'},
        ],
        { cancelable: true }
      )
      return;
    }

    // Make sure old password is right
    fetch(GLOBAL.API.BASE_URL + '/mixbook/auth', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.inputUsername,
        password: this.state.inputOldPassword
      })
    })
    .then(async (response) => {
      if (response.status == 200) {
        // Password is correct, update password on server

        // Change the password
        fetch(GLOBAL.API.BASE_URL + 'mixbook/user/changePassword', {
          method: 'POST',
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: newPass1
          }),
        }).then(async (response) => {
          if (response.status === 200) {
            var json = await response.json();
            if (json.responseStatus === "OK") {
              ToastAndroid.show("Changed password", ToastAndroid.SHORT);
            } else {
              Alert.alert(
                "Error Changing Password",
                json.errorMessage,
                [
                  {text: 'Ok', style: 'cancel'},
                ],
                { cancelable: true }
              )
            }
          } else if (response.status === 400 && response.status === 401) {
            var json = await response.json();
            Alert.alert(
              "Error Changing Password",
              json.errorMessage,
              [
                {text: 'Ok', style: 'cancel'},
              ],
              { cancelable: true }
            )
          } else {
            Alert("Something went wrong with the server");
            console.warn(response.status + response.message);
            return;
          }
        }).catch((error) => {
          console.error(error);
        });

      } else if (response.status === 401) {
        Alert.alert(
          "Incorrect Password",
          "The old password entered is incorrect, please try again",
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      } else {
        Alert("something went wrong");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  updateNames(token: string, firstName: string, lastName: string) {
    fetch(GLOBAL.API.BASE_URL + '/mixbook/user/editUser', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        var json = await response.json();
        if (json.responseStatus === "OK") {
          store.get('account')
          .then((data) => {
            data.userInfo.firstName = firstName;
            data.userInfo.lastName = lastName;
            store.save('account', data)
            .catch((error) => {
              console.warn("error storing account data into local store");
              console.warn(error);
            })
          }).catch((error) => {
            console.warn("error getting account data from local store");
            console.warn(error);
          });
        } else {
          Alert("something went wrong");
        }
      } else if (response.status === 400) {
        var json = await response.json();
        Alert.alert(
          "Error Updating Names",
          json.errorMessage,
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      } else {
        Alert.alert(
          "Server error",
          "Got: " + response.status + response.message,
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  updateEmail(token: string, newEmail: string) {
    fetch(GLOBAL.API.BASE_URL + '/mixbook/user/changeEmail', {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail
      }),
    }).then(async (response) => {
      if (response.status === 200) {
        var json = await response.json();
        if (json.responseStatus === "OK") {
          store.get('account')
          .then((data) => {
            data.userInfo.email = newEmail;
            store.save('account', data)
            .then(() => {
              // ToastAndroid.show("Profile updated", ToastAndroid.SHORT);
            })
            .catch((error) => {
              console.warn("error storing account data into local store");
              console.warn(error);
            })
          }).catch((error) => {
            console.warn("error getting account data from local store");
            console.warn(error);
          });
        } else {
          Alert("something went wrong");
        }
      } else if (response.status === 400) {
        var json = await response.json();
        Alert.alert(
          "Error Updating Email",
          json.errorMessage,
          [
            {text: 'Ok', style: 'cancel'},
          ],
          { cancelable: true }
        )
      } else {
        Alert(response.status + response.message);
        return;
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  fillReviewBadges(goal : number) {

    if(this.state.badges == null)
    {
      return {
        color: "#e6e6e6"
      }
    }

    if(goal == 1 && this.state.ratings >= goal) {
      return {
        color: "#4F8EF7"
      }
    }

    if(goal == 5 && this.state.ratings >= goal) {
      return {
        color: "#cc9900"
      }
    }

    if(goal == 25 && this.state.ratings >= goal) {
      return {
        color: "#808080"
      }
    }

    if(goal == 50 && this.state.ratings >= goal) {
      return {
        color: "#ffff00"
      }
    }

    if(goal == 100 && this.state.ratings >= goal) {
      return {
        color: "#4d4d4d"
      }
    }

    if(goal == 250 && this.state.ratings >= goal) {
      return {
        color: "#b9f2ff"
      }
    }

    if(goal == 500 && this.state.ratings >= goal) {
      return {
        color: "#b36b00"
      }
    }

    if(goal == 1000 && this.state.ratings >= goal) {
      return {
        color: "#cc0000"
      }
    }

    else {
      return {
        color: "#e6e6e6"
      }
    }
  }

  fillRecipeBadges(goal : number) {
    
        if(goal == 1 && this.state.recipes >= goal) {
          return {
            color: "#4F8EF7"
          }
        }
    
        if(goal == 5 && this.state.recipes >= goal) {
          return {
            color: "#cc9900"
          }
        }
    
        if(goal == 25 && this.state.recipes >= goal) {
          return {
            color: "#808080"
          }
        }
    
        if(goal == 50 && this.state.recipes >= goal) {
          return {
            color: "#ffff00"
          }
        }
    
        if(goal == 100 && this.state.recipes >= goal) {
          return {
            color: "#4d4d4d"
          }
        }
    
        if(goal == 250 && this.state.recipes >= goal) {
          return {
            color: "#b9f2ff"
          }
        }
    
        if(goal == 500 && this.state.recipes >= goal) {
          return {
            color: "#b36b00"
          }
        }
    
        if(goal == 1000 && this.state.recipes >= goal) {
          return {
            color: "#cc0000"
          }
        }
    
        else {
          return {
            color: "#e6e6e6"
          }
        }
      }

      _pressBadge(badgeName: string, badgeLevel: string, target: number) {
        if(badgeName.startsWith("review"))
        {
          var leftToGo = target - this.state.ratings;
          var currentValue = this.state.ratings;
        }
          

        if(badgeName.startsWith("recipe"))
        {
          var leftToGo = target - this.state.recipes;
          var currentValue = this.state.recipes;
        }


        //User has not gotten badge yet
        if(leftToGo > 0)  
        {
          Alert.alert(
            badgeLevel,
            "You have completed " + currentValue + " " + badgeName + ". You need " + leftToGo + " more " + badgeName + " to get this badge!",
            [
              {text: 'Close', style: 'cancel'},
            ],
            { cancelable: true }
          )
        }

        //User has earned this badge
        else
        {
          Alert.alert(
            badgeLevel,
            "You have earned the " + badgeLevel + " badge for having created at least " + target + " " + badgeName + "!",
            [
              {text: 'Close', style: 'cancel'},
            ],
            { cancelable: true }
          )
        }

      }

  getProfRating(sumOfRatings: number, numberOfRatings: number) {
    var result = 0;

    if(numberOfRatings > 0)
    {
      result = sumOfRatings / numberOfRatings;
    }

    return result;
    
  }

  render() {
    if(!this.state.isGuest)
    {
      return (
        <Container style={styles.container}>
          <Header>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
  
            <Title>My Profile</Title>
          </Header>
  
          <Content>
            <Text style={styles.rating}> Profile Rating: {this.state.profRating}</Text>
            <List>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    disabled
                    inlineLabel label="Username"
                    placeholder="user"
                    value={this.state.inputUsername}
                    onChangeText={(inputUsername) => this.setState({ inputUsername })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="First Name"
                    placeholder="John"
                    value={this.state.inputFirstName}
                    onChangeText={(inputFirstName) => this.setState({ inputFirstName })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="Last Name"
                    placeholder="Doe"
                    value={this.state.inputLastName}
                    onChangeText={(inputLastName) => this.setState({ inputLastName })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="Email"
                    placeholder="name@example.com"
                    value={this.state.inputEmail}
                    onChangeText={(inputEmail) => this.setState({ inputEmail })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <View>
                  <Text>{`Badges\n`} </Text>
                  
                  <View style={{flexDirection: 'row'}}>
                    <Text>{`      `}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("review", "First Review", 1)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(1)} />
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Bronze", 5)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(5)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Silver", 25)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(25)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Gold", 50)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(50)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Platinum", 100)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(100)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Diamond", 250)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(250)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Centurion", 500)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(500)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Mixologist", 1000)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(1000)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
                  
                </View>
  
                <Text>{`\n`}</Text>
              
              <View style={{flexDirection: 'row'}}>
                <Text>{`      `}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipe", "First Review", 1)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(1)} />
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Bronze", 5)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(5)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Silver", 25)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(25)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Gold", 50)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(50)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Platinum", 100)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(100)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Diamond", 250)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(250)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Centurion", 500)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(500)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Mixologist", 1000)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(1000)}/>
              </TouchableOpacity>
              </View>
              </View>
              </ListItem>
              <ListItem>
                <Text>Change Password</Text>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="Old password"
                    value={this.state.inputOldPassword}
                    onChangeText={(inputOldPassword) => this.setState({ inputOldPassword })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="New password"
                    value={this.state.inputNewPassword1}
                    onChangeText={(inputNewPassword1) => this.setState({ inputNewPassword1 })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="New password again"
                    value={this.state.inputNewPassword2}
                    onChangeText={(inputNewPassword2) => this.setState({ inputNewPassword2 })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <View>
                  <Button
                    disabled={this.state.isGuest}
                    block
                    style={styles.saveButton}
                    onPress={() => this.onSubmit()}
                  >
                    Save
                  </Button>
                  <Button
                    block
                    danger
                    style={styles.logoutButton}
                    onPress={() => this.onLogout()}
                  >
                    Logout
                  </Button>
                  <Button
                    disabled={this.state.isGuest}
                    block
                    danger
                    style={styles.logoutButton}
                    onPress={() => this.onLock()}
                  >
                    Lock Account
                  </Button>
                </View>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
    else
    {
      return (
        <Container style={styles.container}>
          <Header>
            <Button transparent onPress={this.props.openDrawer}>
              <Icon name="ios-menu" />
            </Button>
  
            <Title>My Profile</Title>
          </Header>
  
          <Content>
            <Text style={styles.rating}> Profile Rating: {this.state.profRating}</Text>
            <List>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    disabled
                    inlineLabel label="Username"
                    placeholder="user"
                    value={this.state.inputUsername}
                    onChangeText={(inputUsername) => this.setState({ inputUsername })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="First Name"
                    placeholder="John"
                    value={this.state.inputFirstName}
                    onChangeText={(inputFirstName) => this.setState({ inputFirstName })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="Last Name"
                    placeholder="Doe"
                    value={this.state.inputLastName}
                    onChangeText={(inputLastName) => this.setState({ inputLastName })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Input
                    inlineLabel label="Email"
                    placeholder="name@example.com"
                    value={this.state.inputEmail}
                    onChangeText={(inputEmail) => this.setState({ inputEmail })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <View>
                  <Text>{`Badges\n`} </Text>
                  
                  <View style={{flexDirection: 'row'}}>
                    <Text>{`      `}</Text>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("review", "First Review", 1)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(1)} />
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Bronze", 5)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(5)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Silver", 25)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(25)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Gold", 50)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(50)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Platinum", 100)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(100)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Diamond", 250)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(250)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Centurion", 500)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(500)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
  
  
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("reviews", "Mixologist", 1000)}}>
                      <MaterialIcons name="border-color" size={25} style={this.fillReviewBadges(1000)}/>
                    </TouchableOpacity>
                    <Text>{`    `}</Text>
                  
                </View>
  
                <Text>{`\n`}</Text>
              
              <View style={{flexDirection: 'row'}}>
                <Text>{`      `}</Text>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipe", "First Review", 1)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(1)} />
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Bronze", 5)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(5)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Silver", 25)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(25)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Gold", 50)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(50)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Platinum", 100)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(100)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Diamond", 250)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(250)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Centurion", 500)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(500)}/>
              </TouchableOpacity>
              <Text>{`    `}</Text>
  
  
              <TouchableOpacity style={styles.buttonContainer} onPress={() => {this._pressBadge("recipes", "Mixologist", 1000)}}>
                <MaterialIcons name="local-drink" size={25} style={this.fillRecipeBadges(1000)}/>
              </TouchableOpacity>
              </View>
              </View>
              </ListItem>
              <ListItem>
                <Text>Change Password</Text>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="Old password"
                    value={this.state.inputOldPassword}
                    onChangeText={(inputOldPassword) => this.setState({ inputOldPassword })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="New password"
                    value={this.state.inputNewPassword1}
                    onChangeText={(inputNewPassword1) => this.setState({ inputNewPassword1 })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup disabled={this.state.isGuest}>
                  <Icon name="ios-unlock" style={styles.icons} />
                  <Input
                    secureTextEntry
                    placeholder="New password again"
                    value={this.state.inputNewPassword2}
                    onChangeText={(inputNewPassword2) => this.setState({ inputNewPassword2 })}
                  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <View>
                  <Button
                    disabled={this.state.isGuest}
                    block
                    style={styles.saveButton}
                    onPress={() => this.onSubmit()}
                  >
                    Save
                  </Button>
                  <Button
                    block
                    danger
                    style={styles.logoutButton}
                    onPress={() => this.onLogout()}
                  >
                    Logout
                  </Button>

                </View>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
    
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation
});

export default connect(mapStateToProps, bindAction)(Account);
