
import React, { Component } from 'react';

import { Container, Content, Text, View, InputGroup, Input, Button, List, ListItem, Fab, Icon, Footer } from 'native-base';

import styles from './styles';

var alcohols = ['vodka', 'tequila'];

export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = {
      inputText: '',
      displayType: 'all',
      active: 'true'
    };
  }

  onSubmit() {
    if (this.state.inputText.length > 0) {
      alcohols.push(this.state.inputText);
      this.setState({
        inputText: '',
      });
    }
  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <List dataArray={alcohols}
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
