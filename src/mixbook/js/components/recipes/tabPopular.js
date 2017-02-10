
import React, { Component } from 'react';

import { Container, Content, Card, CardItem, Text } from 'native-base';

import styles from './styles';
import store from 'react-native-simple-store';

export default class TabPopular extends Component { // eslint-disable-line

  componentDidMount() {
    store.get('recipes').then((data) => {
      this.setState({theList: data.recipeList});
    });
  }

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <Card>
            <CardItem>
              <Text>
               This will pull from the database and populate with the popular drinks
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
