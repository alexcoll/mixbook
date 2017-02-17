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
      selectedItem: undefined,
      selected1: 'key1',
      results: {
        items: []
      },
      inputBrand: '',
      inputType: 'Vodka',
      inputFlavor: '',
      inputProof: ''
    };
  }


  onValueChange(value: string) {
    this.setState({
      inputType: value
    });
  }


  replaceAt(route) {
    this.props.replaceAt('addAlcohol', { key: route }, this.props.navigation.key);
  }


  onSubmit() {
    store.get('alcohol').then((data) => {
      var list = data;
      var item = {name: this.state.inputBrand, type: this.state.inputType, proof: this.state.inputProof};
      list.push(item);
      store.save('alcohol', list).then(() => {
        this.replaceAt('ingredients');
      }).catch(error => {
        console.error(error.message);
      });
    });
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
              <Text>Type</Text>
              <Picker
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.inputType}
                onValueChange={this.onValueChange.bind(this)} // eslint-disable-line
              >
                <Item label="Vodka" value="vodka" />
                <Item label="Wiskey" value="whiskey" />
                <Item label="White Rum" value="white_rum" />
                <Item label="Gin" value="gin" />
                <Item label="Tequila" value="tequila" />
              </Picker>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Brand"
                  placeholder="McCormicks"
                  value={this.state.inputBrand}
                  onChangeText={inputBrand => this.setState({ inputBrand })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input inlineLabel label="Flavor" placeholder="Green Apple" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Proof"
                  placeholder="80"
                  keyboardType="numeric"
                  value={this.state.inputProof}
                  onChangeText={inputProof => this.setState({ inputProof })}
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

export default connect(mapStateToProps, bindAction)(AddAlcohol);
