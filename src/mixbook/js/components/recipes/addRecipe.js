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

class AddAlcohol extends Component {

  static propTypes = {
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      results: {
        items: []
      },
      inputName:'',
      inputMixer:'',
      inputAlcohol:''
    };
  }


  onValueChange (value: string) {
    this.setState({
      selected1 : value
    });
  }


  replaceAt(route) {
    this.props.replaceAt('addRecipe', { key: route }, this.props.navigation.key);
  }


  onSubmit() {

    if(this.state.inputName == '')
    {
      alert('Please enter a name for the recipe!');
      return;
    }
    if(this.state.inputAlcohol == '')
    {
      alert('Please add some alcohol you fucking geed');
      return;
    }

    store.get('recipes').then((data) => {
      var list = data.alcoholList;
      list.push(this.state.inputBrand);
      store.update('recipes', {
        alcoholList: list
      }).then(() => {
        this.replaceAt('recipes');
      })
    });


  }


  replaceAt(route) {
    this.props.replaceAt('addRecipe', { key: route }, this.props.navigation.key);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.replaceAt('ingredients')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Add Alcohol</Title>
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
                  onChangeText={inputName => this.setState({ inputName: text })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Alcohol" 
                placeholder="Vodka, Rum..." 
                onChangeText={inputAlcohol => this.setState({ inputAlcohol: text  })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Mixers"
                  placeholder="Orange Juice, Lemonade..."
                  onChangeText={inputMixer => this.setState({ inputMixer: text  })}
                />
              </InputGroup>
            </ListItem>
          </List>
          <Button
            style={{ alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
            onPress={() => this.replaceAt('recipes')}
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

export default connect(mapStateToProps, bindAction)(AddAlcohol);
