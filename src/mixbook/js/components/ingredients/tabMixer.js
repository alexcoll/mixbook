
import React, { Component } from 'react';

import { Container, Content, Text, View, List, ListItem, Input, InputGroup, Button } from 'native-base';

import styles from './styles';

var mixers = ['Sprite', 'Tonic water'];

export default class TabMixer extends Component { // eslint-disable-line

  constructor(props) {
    super(props);
    this.state = { inputText: '', displayType: 'all' };
  }

  onSubmit() {
    if (this.state.inputText.length > 0) {
      mixers.push(this.state.inputText);
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
            <List dataArray={mixers}
              renderRow={(item) =>
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
              }>
            </List>
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
              placeholder="Add mixer"
              value={this.state.inputText}
              onChangeText={inputText => this.setState({ inputText })}
              onSubmitEditing={() => this.onSubmit()}
              maxLength={35}
            />
          </InputGroup>
          <Button
            style={{ flex: 0.1, marginLeft: 15 }}
            onPress={() => this.onSubmit()}
          > Add </Button>
        </View>
      </Container>
    );
  }
}
