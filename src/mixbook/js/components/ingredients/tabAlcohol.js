
import React, { Component } from 'react';

import { Container, Content, Text, View, InputGroup, Input, Button, List, ListItem, Fab, Icon, Footer } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';

export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      displayType: 'all',
      active: 'true',
      theList: ['error']
    };
  }

  componentDidMount() {
    store.get('ingredients').then((data) => {
      this.setState({theList: data.alcoholList});
    });
  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List dataArray={this.state.theList}
              renderRow={(item) =>
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
              }>
            </List>
          </View>
        </Content>
      </Container>
    );
  }
}
