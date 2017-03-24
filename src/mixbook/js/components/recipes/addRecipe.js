import React, { Component } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, List, ListItem, Text, Picker, Thumbnail, Input, InputGroup } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';

const Item = Picker.Item;
const camera = require('../../../img/camera.png');

const {
  replaceAt,
} = actions;

class AddRecipe extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      ingredientList: [{ingredientName:''}],
      inputName: '',
      inputMixers: '',
      inputAlcohol: '',
      inputInstructions: ''
    };
  }

  componentDidMount() {
    store.get('inventory').then((data) => {
      this.setState({ingredientList: data});
    }).catch(error => {
        console.error(error.message);
      });

    store.get('account').then((data) => {
      this.setState({username: data.userInfo.firstName}).catch(error => {
        console.error(error.message);
      });
    });
  }


  replaceAt(route) {
    this.props.replaceAt('addRecipe', { key: route }, this.props.navigation.key);
  }


  onSubmit() {
    if (this.state.inputName == '') {
      alert('Please enter a name for the recipe!');
      return;
    }
    if (this.state.inputAlcohol == '') {
      alert('Please add alcohol to your recipe!');
      return;
    }
    if (this.state.inputInstructions == '') {
      alert('Please enter some instructions for your recipe!');
      return;
    }

    store.get('recipes').then((data) => {
      var list = data;
      var item = {
        name: this.state.inputName,
        alcohol: this.state.inputAlcohol,
        mixers: this.state.inputMixers,
        instructions: this.state.inputInstructions
      };
      list.push(item);
      store.save('recipes', list).then(() => {
        this.replaceAt('recipes');
      });
    });
  }


  replaceAt(route) {
    this.props.replaceAt('addRecipe', { key: route }, this.props.navigation.key);
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.replaceAt('recipes')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Add Recipe</Title>
        </Header>

        <Content>
          <TouchableOpacity>
            <Thumbnail size={80} source={camera} style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }} />
          </TouchableOpacity>
          <List>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Name"
                  placeholder="Screwdriver"
                  value={this.state.inputName}
                  onChangeText={inputName => this.setState({ inputName })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Alcohol"
                placeholder="Vodka, Rum..."
                value={this.state.inputAlcohol}
                onChangeText={inputAlcohol => this.setState({ inputAlcohol })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Mixers"
                  placeholder="Orange Juice, Lemonade..."
                  value={this.state.inputMixers}
                  onChangeText={inputMixers => this.setState({ inputMixers })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Instructions"
                  placeholder="First mix x with y..."
                  value={this.state.inputInstructions}
                  onChangeText={inputInstructions => this.setState({ inputInstructions })}
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

export default connect(mapStateToProps, bindAction)(AddRecipe);
