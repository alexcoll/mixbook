
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text, View, InputGroup, Input, Button } from 'native-base';

import styles from './styles';

var alcs = ['vodka', 'tequila'];

export default class TabAlcohol extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = { inputText: '', displayType: 'all' };
  }


  addItem() {
    alcs.push(this.state.inputText);
    this.setState({
      inputText: '',
    });
  }

  renderDrinkList() {
    var listItems = alcs.map((name) =>
        <CardItem>
          <Text>
            {name}
          </Text>
        </CardItem>
        );

    return (
      listItems
      );
  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <View>
            <Card>
              {this.renderDrinkList()}
            </Card>
          </View>
        </Content>
        <View
          style={{
            alignSelf: 'flex-end',
            flex: 0,
            padding: 5,
            flexDirection: 'row',
          }}
        >
          <InputGroup
            borderType="underline"
            style={{ flex: 0.9 }}
          >
            <Input
              placeholder="Add drink"
              value={this.state.inputText}
              onChangeText={inputText => this.setState({ inputText })}
              onSubmitEditing={() => this.addItem()}
              maxLength={35}
            />
          </InputGroup>
          <Button
            style={{ flex: 0.1, marginLeft: 15 }}
            onPress={() => this.addItem()}
          > Add </Button>
        </View>
      </Container>
    );
  }
}
