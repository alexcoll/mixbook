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

class AddMixer extends Component {

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
      inputType: '',
      inputName: ''
    };
  }


  onValueChange (value: string) {
    this.setState({
      inputType: value
    });
  }


  replaceAt(route) {
    this.props.replaceAt('addMixer', { key: route }, this.props.navigation.key);
  }


  onSubmit() {
    store.get('mixers').then((data) => {
      var list = data;
      var item = {brand: this.state.inputBrand, name: this.state.inputName, type: this.state.inputType};
      list.push(item);
      store.update('mixers', list).then(() => {
        this.replaceAt('ingredients');
      })
    });
  }


  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Button transparent onPress={() => this.replaceAt('ingredients')}>
            <Icon name="ios-arrow-back" />
          </Button>

          <Title>Add Mixer</Title>
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
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange.bind(this)} // eslint-disable-line
              >
                <Item label="Soda" value="soda" />
                <Item label="Juice" value="juice" />
              </Picker>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Brand"
                  placeholder="Tropicana"
                  value={this.state.inputBrand}
                  onChangeText={inputBrand => this.setState({ inputBrand })}
                />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Input
                  inlineLabel label="Name"
                  placeholder="Orange Juice"
                  value={this.state.inputName}
                  onChangeText={inputName => this.setState({ inputName })}
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

export default connect(mapStateToProps, bindAction)(AddMixer);
